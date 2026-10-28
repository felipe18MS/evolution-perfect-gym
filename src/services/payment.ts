import type { PlanId } from 'src/types/gym';

export type PaymentStatus = 'pending' | 'approved' | 'rejected';
export type SimulatedOutcome = PaymentStatus;

export interface CheckoutRequest {
  planId: PlanId;
  customer: { name: string; email: string; phone: string };
  /** Solo la demostración usa este campo; una pasarela real lo ignora. */
  outcome: SimulatedOutcome;
}

export interface CheckoutResult {
  status: PaymentStatus;
  message: string;
  isDemo: boolean;
}

/**
 * Contrato que debe cumplir cualquier pasarela.
 * Un adaptador real (Wompi, Mercado Pago u otra compatible con Colombia, sujeta a verificación
 * de requisitos) debe llamar a un backend propio que guarde las credenciales, cree la transacción
 * y confirme el estado del lado del servidor (webhooks). Nunca coloque llaves privadas aquí.
 */
export interface PaymentGateway {
  readonly id: string;
  readonly label: string;
  readonly isDemo: boolean;
  createCheckout(request: CheckoutRequest): Promise<CheckoutResult>;
}

const messages: Record<PaymentStatus, string> = {
  approved: 'Resultado de ejemplo: aprobado. No se realizó ningún cobro.',
  rejected: 'Resultado de ejemplo: rechazado. No se realizó ningún cobro.',
  pending: 'Resultado de ejemplo: pendiente. No se realizó ningún cobro.',
};

export class DemoGateway implements PaymentGateway {
  readonly id = 'demo';
  readonly label = 'Simulación local (DEMO)';
  readonly isDemo = true;

  async createCheckout(request: CheckoutRequest): Promise<CheckoutResult> {
    await new Promise<void>((resolve) => setTimeout(resolve, 900));
    return { status: request.outcome, message: messages[request.outcome], isDemo: true };
  }
}

/** Punto único de sustitución: reemplace por el adaptador real cuando exista backend. */
export const paymentGateway: PaymentGateway = new DemoGateway();
