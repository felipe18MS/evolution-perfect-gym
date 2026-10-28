import { ref } from 'vue';

export interface NavSection { id: string; label: string }

export const navSections: NavSection[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'planes', label: 'Planes' },
  { id: 'entrenadores', label: 'Entrenadores' },
  { id: 'galeria', label: 'Galería' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'faq', label: 'Preguntas' },
  { id: 'contacto', label: 'Contacto' },
];

/** Desplaza el contenedor de la vista previa (no la página del showroom). */
export function scrollToSection(domId: string): void {
  const el = document.getElementById(domId);
  if (!el) return;
  const root = el.closest<HTMLElement>('[data-scroll-root]');
  if (!root) {
    el.scrollIntoView();
    return;
  }
  const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.scrollTo({ top: Math.max(0, top - 64), behavior: reduce ? 'auto' : 'smooth' });
}

export function useConceptNav(prefix: string) {
  const menuOpen = ref(false);
  function go(id: string): void {
    menuOpen.value = false;
    scrollToSection(`${prefix}-${id}`);
  }
  return { menuOpen, go, sections: navSections };
}
