import type { Plan } from 'src/types/gym';

export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function priceText(plan: Plan): string {
  return plan.priceCOP === null ? 'Precio por confirmar' : formatCOP(plan.priceCOP);
}

export function pricePerMonthText(plan: Plan): string {
  return plan.priceCOP === null ? 'Por confirmar' : formatCOP(Math.round(plan.priceCOP / plan.months));
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Resuelve una ruta de public/ respetando la base de publicación. URLs absolutas se respetan. */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.ASSET_BASE ?? '/';
  return base + path.replace(/^\/+/, '');
}
