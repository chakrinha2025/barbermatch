// Ícones SVG para as partículas de barbearia

export const BARBER_ICONS = {
  scissor: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="6" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  `,
  razor: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 3h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V3z"/>
      <path d="M18 3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2"/>
      <path d="M6 14h12"/>
      <path d="M6 10h12"/>
      <path d="M6 6h12"/>
    </svg>
  `,
  comb: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h16v6H4z"/>
      <path d="M5 10v10"/>
      <path d="M7 10v10"/>
      <path d="M9 10v10"/>
      <path d="M11 10v10"/>
      <path d="M13 10v10"/>
      <path d="M15 10v10"/>
      <path d="M17 10v10"/>
      <path d="M19 10v10"/>
    </svg>
  `,
  brush: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
      <path d="M10 20a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4Z"/>
      <path d="M14 6v2"/>
      <path d="M10 6v2"/>
      <path d="M12 6v2"/>
    </svg>
  `,
  barberPole: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M7 8l10 8"/>
      <path d="M7 12l8 8"/>
      <path d="M7 16l4 4"/>
      <path d="M16 8L8 0"/>
      <path d="M16 4L4 16"/>
      <path d="M16 12L12 8"/>
    </svg>
  `,
  beard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a9 9 0 0 1 9 9v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5V11a9 9 0 0 1 9-9Z"/>
      <path d="M8 14v2"/>
      <path d="M12 14v2"/>
      <path d="M16 14v2"/>
    </svg>
  `,
  dryer: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 10a4 4 0 0 1 4-4h12"/>
      <path d="M4 14a4 4 0 0 0 4 4h12"/>
      <path d="M14 4v6"/>
      <path d="M14 14v6"/>
      <path d="M20 16V8"/>
    </svg>
  `,
  star: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  `
};

// Função para converter SVG para URI base64 para uso em texturas
export function svgToDataURI(svg: string): string {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
    
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}

export default BARBER_ICONS; 