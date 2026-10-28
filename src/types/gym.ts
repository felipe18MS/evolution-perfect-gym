export type PlanId = 'monthly' | 'quarterly' | 'semester' | 'annual';
export type PriceStatus = 'demo' | 'pending' | 'confirmed';
export type ConceptId = 'performance' | 'elite' | 'energy' | 'essential' | 'local' | 'studio' | 'motion' | 'forge' | 'zenith' | 'pulse';

export interface Plan {
  id: PlanId;
  name: string;
  durationLabel: string;
  months: number;
  /** Precio en COP. null = pendiente de configuración. */
  priceCOP: number | null;
  priceStatus: PriceStatus;
  benefits: string[];
  conditions: string[];
  highlight: boolean;
  enrollLabel: string;
}

export interface ComparisonRow {
  id: string;
  label: string;
  values: Record<PlanId, boolean | string>;
}

export interface ServiceItem { id: string; title: string; description: string; icon: string }
export interface BenefitItem { id: string; title: string; text: string }
export interface Trainer { id: string; name: string; role: string; bio: string; photo: string }
export interface GroupClass { id: string; name: string; description: string; scheduleNote: string }
export interface Challenge { id: string; title: string; text: string }
export interface Testimonial { id: string; author: string; text: string; isFictional: boolean }
export interface FaqItem { id: string; question: string; answer: string }
export interface GalleryItem { id: string; title: string; alt: string; src: string }

export type SocialNetwork = 'instagram' | 'facebook' | 'tiktok';
export interface SocialLink { id: SocialNetwork; label: string; url: string; icon: string }

export interface ScheduleItem { label: string; hours: string }

export interface ContactInfo {
  whatsappNumber: string;
  whatsappIsDemo: boolean;
  whatsappMessage: string;
  address: string;
  hours: string;
  schedule: ScheduleItem[];
  email: string;
  mapsUrl: string;
}

export interface ConceptMeta {
  id: ConceptId;
  /** Número visible en el catálogo (1 = primera propuesta). */
  number: number;
  letter: string;
  /** Colores y tipografía de la portada del catálogo (representan la identidad de la propuesta). */
  cover: { bg: string; fg: string; accent: string; fontFamily: string; photo: string };
  label: string;
  tagline: string;
  description: string;
  typography: string;
  hero: string;
  plansLayout: string;
  bestFor: string;
}

export type Device = 'desktop' | 'tablet' | 'mobile';
