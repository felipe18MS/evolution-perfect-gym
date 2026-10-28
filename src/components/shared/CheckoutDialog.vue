<template>
  <q-dialog :model-value="modelValue" :maximized="$q.screen.lt.sm" :persistent="processing" @update:model-value="onToggle">
    <q-card class="co" role="dialog" aria-modal="true" aria-labelledby="co-title">
      <header class="co__head">
        <div>
          <p class="co__demo"><span>DEMO</span> Simulación sin cobros ni pagos reales</p>
          <h2 id="co-title" ref="titleEl" class="co__title" tabindex="-1">{{ titles[step] }}</h2>
        </div>
        <button type="button" class="co__x" aria-label="Cerrar" :disabled="processing" @click="close">
          <q-icon name="close" aria-hidden="true" />
        </button>
      </header>

      <ol class="co__steps" aria-label="Progreso">
        <li v-for="(s, i) in steps" :key="s.id" :class="{ on: i <= stepIndex }" :aria-current="s.id === step ? 'step' : undefined">
          <span class="co__n" aria-hidden="true">{{ i + 1 }}</span>{{ s.label }}
        </li>
      </ol>

      <div class="co__body">
        <section class="co__main">
          <!-- 1. Tipo de usuario -->
          <section v-if="step === 'type'" class="co__type" aria-label="Selecciona tu tipo de usuario">
            <p class="co__hint">Te llevamos por el proceso correcto según tu caso.</p>
            <button type="button" class="co__type-card" :class="{ sel: customerType === 'new' }" @click="customerType = 'new'">
              <span class="co__type-icon"><q-icon name="person_add" size="28px" /></span>
              <span><strong>Soy nuevo y quiero inscribirme</strong><small>Formulario de inscripción, datos de contacto y opción de biometría del dispositivo en móvil.</small></span>
              <q-icon :name="customerType === 'new' ? 'radio_button_checked' : 'radio_button_unchecked'" size="22px" />
            </button>
            <button type="button" class="co__type-card" :class="{ sel: customerType === 'existing' }" @click="customerType = 'existing'">
              <span class="co__type-icon"><q-icon name="autorenew" size="28px" /></span>
              <span><strong>Ya soy afiliado</strong><small>Identifica tu afiliación y continúa para pagar o renovar tu mensualidad.</small></span>
              <q-icon :name="customerType === 'existing' ? 'radio_button_checked' : 'radio_button_unchecked'" size="22px" />
            </button>
            <p class="co__hint">Demostración: la validación de afiliados aún no consulta la base de datos del gimnasio.</p>
          </section>

          <!-- 2. Plan -->
          <fieldset v-else-if="step === 'plan'" class="co__fs">
            <legend class="sr-only">Plan de membresía</legend>
            <label v-for="p in gym.plans" :key="p.id" class="co__plan" :class="{ sel: selectedId === p.id }">
              <input v-model="selectedId" type="radio" name="co-plan" :value="p.id" @change="planError = false" />
              <span class="co__pname"><strong>{{ p.name }}</strong><small>{{ p.durationLabel }}</small></span>
              <PlanPrice :plan="p" class="co__pprice" />
            </label>
            <p v-if="planError" class="co__err" role="alert">Selecciona un plan para continuar.</p>
          </fieldset>

          <!-- 2. Datos -->
          <q-form v-else-if="step === 'details'" ref="formRef" class="co__form" novalidate @submit.prevent="toPayment">
            <p class="co__hint">{{ customerType === 'new' ? 'Formulario de preinscripción. En esta demo los datos no se guardan en el sistema del gimnasio.' : 'Ingresa los datos que el gimnasio usaría para localizar tu afiliación. La consulta real requiere conectar el backend.' }}</p>
            <template v-if="customerType === 'new'">
              <q-input v-model="form.name" outlined label="Nombre y apellidos" autocomplete="name" enterkeyhint="next" lazy-rules :rules="[rules.name]" />
              <div class="co__two-fields">
                <q-select v-model="form.documentType" outlined label="Tipo de documento" :options="documentTypes" emit-value map-options />
                <q-input v-model="form.documentNumber" outlined label="Número de documento" inputmode="numeric" autocomplete="off" lazy-rules :rules="[rules.document]" />
              </div>
              <q-input v-model="form.birthDate" outlined type="date" label="Fecha de nacimiento" :rules="[rules.birthDate]" />
              <q-input v-model="form.email" outlined type="email" inputmode="email" label="Correo electrónico" autocomplete="email" enterkeyhint="next" lazy-rules :rules="[rules.email]" />
              <q-input v-model="form.phone" outlined type="tel" inputmode="tel" label="Celular (10 dígitos)" autocomplete="tel" hint="Ejemplo: 3001234567" enterkeyhint="next" lazy-rules :rules="[rules.phone]" />
              <q-input v-model="form.emergencyContact" outlined label="Contacto de emergencia (opcional)" autocomplete="off" />
              <div class="co__bio">
                <div class="co__bio-icon"><q-icon name="fingerprint" size="30px" /></div>
                <div class="co__bio-copy"><strong>Huella / biometría en el móvil</strong><p>La web puede solicitar una passkey y verificación del dispositivo compatible; nunca recibe la imagen de tu huella.</p><small>{{ biometricRequested ? 'Solicitud de biometría marcada para la demo; no se registró una huella real.' : 'La integración real requiere HTTPS, backend y registro seguro de passkeys.' }}</small></div>
                <button type="button" class="co__bio-btn" @click="markBiometricDemo">{{ biometricRequested ? 'Marcada' : 'Probar demo' }}</button>
              </div>
            </template>
            <template v-else>
              <q-input v-model="form.documentNumber" outlined label="Número de documento" inputmode="numeric" autocomplete="off" lazy-rules :rules="[rules.document]" />
              <q-input v-model="form.phone" outlined type="tel" inputmode="tel" label="Celular registrado (10 dígitos)" autocomplete="tel" hint="Se usaría para verificar tu identidad." lazy-rules :rules="[rules.phone]" />
              <p class="co__hint">En producción, el sistema verificará estos datos contra la base de afiliados antes de permitir el pago.</p>
            </template>
          </q-form>

          <!-- 3. Pago demostrativo -->
          <div v-else-if="step === 'payment'" class="co__pay">
            <div class="co__note" role="note">
              <q-icon name="info" size="22px" aria-hidden="true" />
              <p>Este sitio no tiene pasarela de pago conectada, por lo que no hay métodos de pago habilitados. Aquí no se pide información bancaria.</p>
            </div>
            <fieldset class="co__fs">
              <legend class="co__legend">Resultado a mostrar en la demostración</legend>
              <label v-for="o in outcomes" :key="o.value" class="co__plan" :class="{ sel: outcome === o.value }">
                <input v-model="outcome" type="radio" name="co-outcome" :value="o.value" />
                <span class="co__pname"><strong>{{ o.label }}</strong><small>{{ o.text }}</small></span>
              </label>
            </fieldset>
          </div>

          <!-- 4. Resultado -->
          <div v-else class="co__result" aria-live="polite">
            <q-icon :name="resultIcon" size="52px" :class="`co__ico co__ico--${result?.status}`" aria-hidden="true" />
            <p class="co__rtitle">{{ resultTitle }}</p>
            <p>{{ result?.message }}</p>
            <p class="co__hint">Es una pantalla de ejemplo: no constituye un pago, factura ni recibo.</p>
          </div>
        </section>

        <aside class="co__sum" aria-label="Resumen de la selección">
          <h3 class="co__sumh">Resumen</h3>
          <template v-if="selectedPlan">
            <dl class="co__dl">
              <dt>Plan</dt><dd>{{ selectedPlan.name }}</dd>
              <dt>Duración</dt><dd>{{ selectedPlan.durationLabel }}</dd>
              <dt>Precio</dt><dd><PlanPrice :plan="selectedPlan" /></dd>
              <dt>Descuentos e impuestos</dt><dd>Sin configurar</dd>
            </dl>
            <p class="co__total"><span>Total demostrativo</span><strong>{{ priceText(selectedPlan) }}</strong></p>
            <p class="co__small">Beneficios de referencia, por confirmar:</p>
            <ul class="co__ben"><li v-for="b in selectedPlan.benefits" :key="b">{{ b }}</li></ul>
          </template>
          <p v-else class="co__small">Aún no has elegido un plan.</p>
          <template v-if="form.name || form.email">
            <h3 class="co__sumh co__sumh--2">Datos de contacto</h3>
            <p class="co__small">{{ form.name }}<br />{{ form.email }}<br />{{ form.phone }}</p>
          </template>
          <button v-if="step === 'details' || step === 'payment'" type="button" class="co__link" @click="step = 'plan'">Cambiar de plan</button>
        </aside>
      </div>

      <footer class="co__foot">
        <template v-if="step === 'result'">
          <button type="button" class="co__btn co__btn--primary" @click="goCatalog">Volver al catálogo</button>
          <div class="co__foot-r">
            <button v-if="result?.status === 'rejected'" type="button" class="co__btn" @click="step = 'payment'">Intentar de nuevo</button>
            <button type="button" class="co__btn" @click="restart">Reiniciar demostración</button>
            <button type="button" class="co__btn" @click="close">Cerrar</button>
          </div>
        </template>
        <template v-else>
          <button type="button" class="co__btn" :disabled="processing" @click="step === 'type' ? close() : back()">{{ step === 'type' ? 'Cancelar' : 'Atrás' }}</button>
          <button v-if="step === 'type'" type="button" class="co__btn co__btn--primary" @click="toTypeNext">Continuar</button>
          <button v-else-if="step === 'plan'" type="button" class="co__btn co__btn--primary" @click="toDetails">Continuar</button>
          <button v-else-if="step === 'details'" type="button" class="co__btn co__btn--primary" @click="toPayment">{{ customerType === 'new' ? 'Continuar a pago' : 'Verificar y continuar' }}</button>
          <button v-else type="button" class="co__btn co__btn--primary" :disabled="processing" @click="pay">
            <q-spinner v-if="processing" size="18px" aria-hidden="true" /> {{ processing ? 'Procesando…' : 'Mostrar resultado de ejemplo' }}
          </button>
        </template>
      </footer>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { QForm } from 'quasar';
import gym from 'src/data/gym';
import type { Plan, PlanId } from 'src/types/gym';
import { priceText } from 'src/utils/format';
import { paymentGateway, type CheckoutResult, type SimulatedOutcome } from 'src/services/payment';
import PlanPrice from './PlanPrice.vue';

type Step = 'type' | 'plan' | 'details' | 'payment' | 'result';

const props = defineProps<{ modelValue: boolean; planId: PlanId | null }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
const router = useRouter();

const steps: { id: Step; label: string }[] = [
  { id: 'type', label: 'Tipo de usuario' },
  { id: 'plan', label: 'Plan' },
  { id: 'details', label: 'Inscripción / verificación' },
  { id: 'payment', label: 'Pago' },
  { id: 'result', label: 'Resultado' },
];
const titles: Record<Step, string> = {
  type: '¿Primera vez en Evolution?',
  plan: 'Elige tu membresía',
  details: 'Tus datos de contacto',
  payment: 'Pago (demostración)',
  result: 'Resultado de la demostración',
};
const outcomes: { value: SimulatedOutcome; label: string; text: string }[] = [
  { value: 'approved', label: 'Aprobado', text: 'Muestra cómo se vería una confirmación.' },
  { value: 'pending', label: 'Pendiente', text: 'Muestra un pago en espera de confirmación.' },
  { value: 'rejected', label: 'Rechazado', text: 'Muestra cómo se comunicaría un rechazo.' },
];

const step = ref<Step>('type');
const customerType = ref<'new' | 'existing'>('existing');
const biometricRequested = ref(false);
const selectedId = ref<PlanId | null>(null);
const planError = ref(false);
const form = ref({ name: '', email: '', phone: '', documentType: 'CC', documentNumber: '', birthDate: '', emergencyContact: '' });
const outcome = ref<SimulatedOutcome>('approved');
const processing = ref(false);
const result = ref<CheckoutResult | null>(null);
const formRef = ref<QForm | null>(null);
const titleEl = ref<HTMLElement | null>(null);

const stepIndex = computed(() => steps.findIndex((s) => s.id === step.value));
const selectedPlan = computed<Plan | undefined>(() => gym.plans.find((p) => p.id === selectedId.value));
const resultIcon = computed(() => (result.value?.status === 'approved' ? 'check_circle' : result.value?.status === 'rejected' ? 'cancel' : 'hourglass_top'));
const resultTitle = computed(() => (result.value?.status === 'approved' ? 'Aprobado (ejemplo)' : result.value?.status === 'rejected' ? 'Rechazado (ejemplo)' : 'Pendiente (ejemplo)'));

const documentTypes = [
  { label: 'Cédula de ciudadanía', value: 'CC' },
  { label: 'Tarjeta de identidad', value: 'TI' },
  { label: 'Cédula de extranjería', value: 'CE' },
  { label: 'Pasaporte', value: 'PA' },
];

const rules = {
  document: (v: string): boolean | string => v.trim().length >= 5 || 'Escribe un número de documento válido.',
  birthDate: (v: string): boolean | string => Boolean(v) || 'Selecciona tu fecha de nacimiento.',
  name: (v: string): boolean | string => v.trim().length >= 3 || 'Escribe tu nombre completo.',
  email: (v: string): boolean | string => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Escribe un correo válido, por ejemplo nombre@correo.com.',
  phone: (v: string): boolean | string => /^3\d{9}$/.test(v.replace(/\s/g, '')) || 'Escribe un celular colombiano de 10 dígitos que empiece por 3.',
};

watch(() => props.modelValue, (open) => {
  if (!open) return;
  if (props.planId) selectedId.value = props.planId;
  customerType.value = 'existing';
  biometricRequested.value = false;
  step.value = 'type';
  planError.value = false;
  result.value = null;
  processing.value = false;
});
watch(step, () => { void nextTick(() => titleEl.value?.focus()); });

function onToggle(open: boolean): void { emit('update:modelValue', open); }
function close(): void { emit('update:modelValue', false); }
function back(): void {
  if (step.value === 'payment') step.value = 'details';
  else if (step.value === 'details') step.value = 'plan';
  else if (step.value === 'plan') step.value = 'type';
}

function toTypeNext(): void { step.value = 'plan'; }
function toDetails(): void {
  planError.value = !selectedPlan.value;
  if (selectedPlan.value) step.value = 'details';
}
function markBiometricDemo(): void {
  biometricRequested.value = true;
}
async function toPayment(): Promise<void> {
  const ok = await formRef.value?.validate();
  if (ok) step.value = 'payment';
}
async function pay(): Promise<void> {
  if (!selectedPlan.value) return;
  processing.value = true;
  try {
    result.value = await paymentGateway.createCheckout({
      planId: selectedPlan.value.id,
      customer: { ...form.value },
      outcome: outcome.value,
    });
    step.value = 'result';
  } finally {
    processing.value = false;
  }
}
function restart(): void {
  form.value = { name: '', email: '', phone: '', documentType: 'CC', documentNumber: '', birthDate: '', emergencyContact: '' };
  outcome.value = 'approved';
  selectedId.value = null;
  customerType.value = 'existing';
  biometricRequested.value = false;
  result.value = null;
  step.value = 'type';
}
function goCatalog(): void {
  close();
  void router.push({ name: 'home' });
}
</script>

<style scoped>
.co { display: flex; flex-direction: column; width: min(980px, 96vw); max-width: 96vw; max-height: 92vh; border-radius: 16px; color: #101010; font-family: system-ui, 'Segoe UI', Roboto, Arial, sans-serif; }
.co__head { display: flex; justify-content: space-between; gap: 1rem; padding: 1.25rem 1.5rem .5rem; }
.co__demo { margin: 0 0 .35rem; font-size: .82rem; color: #4a4f45; }
.co__demo span { margin-right: .4rem; padding: .1rem .45rem; border-radius: 4px; background: #101010; color: #a3e635; font-weight: 700; font-size: .72rem; }
.co__title { margin: 0; font-size: 1.5rem; line-height: 1.2; font-weight: 800; }
.co__title:focus { outline: none; }
.co__x { flex: none; width: 44px; height: 44px; border: 0; border-radius: 10px; background: #f0f2ea; cursor: pointer; font-size: 1.2rem; }
.co__steps { display: flex; gap: .5rem; margin: 0; padding: .75rem 1.5rem 0; list-style: none; }
.co__steps li { flex: 1; display: flex; align-items: center; gap: .5rem; padding-bottom: .6rem; border-bottom: 4px solid #e1e3dc; color: #5b6055; font-size: .85rem; }
.co__steps li.on { border-color: #101010; color: #101010; font-weight: 700; }
.co__n { display: grid; place-items: center; flex: none; width: 22px; height: 22px; border-radius: 50%; background: #e1e3dc; font-size: .75rem; font-weight: 700; }
.on .co__n { background: #101010; color: #a3e635; }
.co__body { flex: 1; min-height: 0; overflow-y: auto; display: grid; gap: 1.25rem; grid-template-columns: 1fr; padding: 1.25rem 1.5rem; }
.co__fs { display: grid; gap: .6rem; margin: 0; padding: 0; border: 0; }
.co__type { display: grid; gap: .75rem; }
.co__type-card { display: grid; grid-template-columns: 46px 1fr 24px; align-items: center; gap: .85rem; width: 100%; padding: 1rem; text-align: left; border: 2px solid #d7dad0; border-radius: 14px; background: #fff; color: #101010; cursor: pointer; font: inherit; }
.co__type-card.sel { border-color: #101010; background: #f1f9de; }
.co__type-card > span:nth-child(2) { display: grid; gap: .3rem; }
.co__type-card small { color: #50554a; line-height: 1.4; }
.co__type-icon, .co__bio-icon { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 12px; background: #101010; color: #b6f34b; }
.co__two-fields { display: grid; grid-template-columns: .9fr 1.1fr; gap: .6rem; }
.co__bio { display: grid; grid-template-columns: 46px 1fr auto; align-items: start; gap: .75rem; padding: .9rem; border: 1px solid #cfd5c0; border-radius: 12px; background: #f6f7f1; }
.co__bio-copy { display: grid; gap: .25rem; }
.co__bio-copy p, .co__bio-copy small { margin: 0; color: #50554a; font-size: .83rem; line-height: 1.4; }
.co__bio-btn { min-height: 40px; padding: .4rem .7rem; border: 1px solid #101010; border-radius: 8px; background: #101010; color: white; font: inherit; font-size: .8rem; font-weight: 700; cursor: pointer; }
.co__legend { margin-bottom: .5rem; padding: 0; font-weight: 700; }
.co__plan { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .75rem; min-height: 64px; padding: .75rem 1rem; border: 2px solid #d7dad0; border-radius: 12px; background: #fff; cursor: pointer; transition: border-color .15s ease, background .15s ease; }
.co__plan:hover { border-color: #8d9382; }
.co__plan.sel { border-color: #101010; background: #f1f9de; }
.co__plan:focus-within { outline: 3px solid #101010; outline-offset: 2px; }
.co__plan input { width: 20px; height: 20px; accent-color: #101010; }
.co__pname { display: grid; }
.co__pname small { color: #50554a; }
.co__pprice { font-size: .95rem; text-align: right; }
.co__err { margin: 0; color: #b00020; font-weight: 600; }
.co__form { display: grid; gap: .5rem; }
.co__hint, .co__small { margin: 0; font-size: .88rem; color: #50554a; }
.co__note { display: flex; gap: .75rem; padding: 1rem; margin-bottom: 1rem; border-radius: 12px; background: #eef1e6; border: 1px solid #cfd5c0; }
.co__note p { margin: 0; }
.co__result { display: grid; gap: .6rem; justify-items: center; padding: 1.5rem .5rem; text-align: center; }
.co__ico--approved { color: #2e7d32; } .co__ico--rejected { color: #b00020; } .co__ico--pending { color: #b26a00; }
.co__rtitle { margin: 0; font-size: 1.4rem; font-weight: 800; }
.co__result p { margin: 0; max-width: 46ch; }
.co__sum { align-self: start; padding: 1.1rem; border-radius: 12px; background: #f6f7f1; border: 1px solid #dde0d4; }
.co__sumh { margin: 0 0 .6rem; font-size: 1rem; font-weight: 800; }
.co__sumh--2 { margin-top: 1rem; }
.co__dl { display: grid; grid-template-columns: auto 1fr; gap: .35rem .9rem; margin: 0 0 .75rem; }
.co__dl dt { color: #50554a; } .co__dl dd { margin: 0; font-weight: 600; text-align: right; }
.co__total { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; margin: 0 0 .9rem; padding: .75rem 0; border-block: 2px solid #101010; }
.co__total strong { font-size: 1.25rem; }
.co__ben { margin: .35rem 0 0; padding-left: 1.1rem; font-size: .88rem; color: #3b4036; }
.co__link { margin-top: .9rem; padding: .4rem 0; border: 0; background: none; color: #101010; font: inherit; font-weight: 700; text-decoration: underline; cursor: pointer; min-height: 44px; }
.co__foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .75rem; padding: 1rem 1.5rem; border-top: 1px solid #e1e3dc; background: #fff; border-radius: 0 0 16px 16px; }
.co__foot-r { display: flex; flex-wrap: wrap; gap: .75rem; }
.co__btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 48px; padding: .6rem 1.4rem; border: 2px solid #101010; border-radius: 10px; background: #fff; color: #101010; font: inherit; font-weight: 700; cursor: pointer; transition: background .15s ease; }
.co__btn:hover:not(:disabled) { background: #f1f9de; }
.co__btn--primary { background: #101010; color: #fff; }
.co__btn--primary:hover:not(:disabled) { background: #2b3a0a; }
.co__btn:disabled { opacity: .55; cursor: not-allowed; }
.co__btn:focus-visible, .co__link:focus-visible, .co__x:focus-visible { outline: 3px solid #101010; outline-offset: 2px; }
@media (min-width: 780px) { .co__body { grid-template-columns: 1.5fr 1fr; } }
@media (max-width: 599px) {
  .co { width: 100%; max-width: 100%; max-height: 100%; height: 100%; border-radius: 0; }
  .co__head, .co__steps, .co__body, .co__foot { padding-inline: 1rem; }
  .co__steps li { font-size: 0; gap: 0; justify-content: center; } .co__steps li .co__n { font-size: .75rem; }
  .co__plan { grid-template-columns: auto 1fr; } .co__pprice { grid-column: 2; text-align: left; }
  .co__two-fields { grid-template-columns: 1fr; } .co__bio { grid-template-columns: 42px 1fr; } .co__bio-btn { grid-column: 2; justify-self: start; }
  .co__foot { flex-direction: column-reverse; } .co__foot .co__btn, .co__foot-r { width: 100%; } .co__foot-r .co__btn { flex: 1; }
}
@media (prefers-reduced-motion: reduce) { .co__plan, .co__btn { transition: none; } }
</style>
