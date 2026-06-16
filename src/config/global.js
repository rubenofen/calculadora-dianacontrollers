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

// Campos de costes indirectos (estructura mensual del negocio). Son comunes a
// todas las calculadoras, por eso viven en los datos del negocio y no en cada
// calculadora. Se prorratean entre las horas facturables del equipo.
export const BUSINESS_INDIRECT_FIELDS = [
  { id: 'nominas', label: 'Nóminas y personal fijo (desde Equipo)', unit: '€/mes' },
  { id: 'alquiler', label: 'Alquiler y suministros', unit: '€/mes' },
  { id: 'seguros', label: 'Seguros', unit: '€/mes' },
  { id: 'autonomos', label: 'Cuota autónomos / costes societarios', unit: '€/mes' },
  { id: 'contabilidad', label: 'Contabilidad y asesoría', unit: '€/mes' },
  { id: 'marketing', label: 'Marketing y publicidad', unit: '€/mes' },
  { id: 'formacion', label: 'Formación y desarrollo profesional', unit: '€/mes' },
  { id: 'herramientasGestion', label: 'Herramientas de gestión', unit: '€/mes' },
  { id: 'horasFacturablesTotales', label: 'Horas facturables totales/mes (desde Equipo)', unit: 'h/mes' },
]

// Datos del negocio por defecto (Portada → "DATOS DE TU NEGOCIO").
export function defaultBusiness() {
  return {
    negocio: '',
    sector: '',
    currency: 'EUR',
    ivaPct: 21, // IVA general aplicable (%) — Portada!C10
    fecha: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    // Costes indirectos (estructura mensual) — compartidos por todas las calculadoras.
    nominas: 0,
    alquiler: 0,
    seguros: 0,
    autonomos: 0,
    contabilidad: 0,
    marketing: 0,
    formacion: 0,
    herramientasGestion: 0,
    horasFacturablesTotales: 960,
  }
}

// Formatea una fecha ISO (YYYY-MM-DD) a dd/mm/aaaa.
export function formatDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}
