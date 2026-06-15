// Configuración global — equivale a la pestaña "🏠 Portada" del Excel.
// El Excel (docs/Calculadora_Precios servicios-productos.xlsx) es el documento
// funcional: si cambia, esta configuración y la lógica deben actualizarse.
export const CURRENCY_LOCALE = 'es-ES'

// Monedas disponibles (código ISO para Intl.NumberFormat).
export const CURRENCIES = [
  { code: 'EUR', label: 'Euro (€)' },
  { code: 'USD', label: 'Dólar (US$)' },
  { code: 'GBP', label: 'Libra (£)' },
  { code: 'MXN', label: 'Peso mexicano (MX$)' },
  { code: 'COP', label: 'Peso colombiano (COL$)' },
  { code: 'ARS', label: 'Peso argentino (AR$)' },
  { code: 'CLP', label: 'Peso chileno (CLP$)' },
]

// Datos del negocio por defecto (Portada → "DATOS DE TU NEGOCIO").
export function defaultBusiness() {
  return {
    negocio: '',
    sector: '',
    currency: 'EUR',
    ivaPct: 21, // IVA general aplicable (%) — Portada!C10
    fecha: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
  }
}

// Formatea una fecha ISO (YYYY-MM-DD) a dd/mm/aaaa.
export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}
