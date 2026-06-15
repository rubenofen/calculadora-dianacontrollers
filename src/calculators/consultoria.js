import { num } from '../lib/format.js'

// =============================================================================
// CALCULADORA: CONSULTORÍA
// Traducción fiel de la pestaña "🤝 Consultoría" del Excel funcional.
// Estructura idéntica a Formaciones e Ingeniería (cambian solo etiquetas de
// "otros costes directos"), por lo que esta config sirve de patrón.
// =============================================================================

export const sections = [
  {
    id: 'A',
    title: 'A · Costes directos',
    help: 'Personal propio, colaboradores externos y otros costes imputables al proyecto.',
    fields: [
      { id: 'horasPropias', label: 'Horas de trabajo propias', default: 10, unit: 'h' },
      { id: 'tarifaPropia', label: 'Tarifa hora propia (referencia)', default: 50, unit: '€/h' },
      { id: 'colabHoras1', label: 'Colaborador 1 — horas', default: 0, unit: 'h' },
      { id: 'colabTarifa1', label: 'Colaborador 1 — tarifa/hora', default: 0, unit: '€/h' },
      { id: 'colabHoras2', label: 'Colaborador 2 — horas', default: 0, unit: 'h' },
      { id: 'colabTarifa2', label: 'Colaborador 2 — tarifa/hora', default: 0, unit: '€/h' },
      { id: 'colabHoras3', label: 'Colaborador 3 — horas', default: 0, unit: 'h' },
      { id: 'colabTarifa3', label: 'Colaborador 3 — tarifa/hora', default: 0, unit: '€/h' },
      { id: 'colabHoras4', label: 'Colaborador 4 — horas', default: 0, unit: 'h' },
      { id: 'colabTarifa4', label: 'Colaborador 4 — tarifa/hora', default: 0, unit: '€/h' },
      { id: 'colabHoras5', label: 'Colaborador 5 — horas', default: 0, unit: 'h' },
      { id: 'colabTarifa5', label: 'Colaborador 5 — tarifa/hora', default: 0, unit: '€/h' },
      { id: 'herramientas', label: 'Herramientas y software', default: 0, unit: '€' },
      { id: 'materiales', label: 'Materiales / entregables', default: 0, unit: '€' },
      { id: 'desplazamientos', label: 'Desplazamientos y dietas', default: 0, unit: '€' },
      { id: 'informes', label: 'Informes y documentación especializada', default: 0, unit: '€' },
      { id: 'softwareBI', label: 'Software de análisis / BI', default: 0, unit: '€' },
    ],
  },
  {
    id: 'B',
    title: 'B · Costes indirectos',
    help: 'Estructura mensual prorrateada según las horas facturables del equipo (pestaña Equipo).',
    fields: [
      { id: 'nominas', label: 'Nóminas y personal fijo (desde Equipo)', default: 0, unit: '€/mes' },
      { id: 'alquiler', label: 'Alquiler y suministros', default: 0, unit: '€/mes' },
      { id: 'seguros', label: 'Seguros', default: 0, unit: '€/mes' },
      { id: 'autonomos', label: 'Cuota autónomos / costes societarios', default: 0, unit: '€/mes' },
      { id: 'contabilidad', label: 'Contabilidad y asesoría', default: 0, unit: '€/mes' },
      { id: 'marketing', label: 'Marketing y publicidad', default: 0, unit: '€/mes' },
      { id: 'formacion', label: 'Formación y desarrollo profesional', default: 0, unit: '€/mes' },
      { id: 'herramientasGestion', label: 'Herramientas de gestión', default: 0, unit: '€/mes' },
      { id: 'horasFacturablesTotales', label: 'Horas facturables totales/mes (desde Equipo)', default: 960, unit: 'h/mes' },
      { id: 'horasProyecto', label: 'Horas totales dedicadas a este proyecto', default: 10, unit: 'h' },
    ],
  },
  {
    id: 'C',
    title: 'C · Tiempo no facturable',
    help: 'Coste de oportunidad. Se valora a la tarifa hora propia.',
    fields: [
      { id: 'prep', label: 'Preparación', default: 0, unit: 'h' },
      { id: 'reuniones', label: 'Reuniones comerciales', default: 0, unit: 'h' },
      { id: 'admin', label: 'Administración', default: 0, unit: 'h' },
      { id: 'seguimiento', label: 'Seguimiento post-entrega', default: 0, unit: 'h' },
      { id: 'atencion', label: 'Atención al cliente', default: 0, unit: 'h' },
      { id: 'procesos', label: 'Diseño y mejora de procesos', default: 0, unit: 'h' },
    ],
  },
  {
    id: 'D',
    title: 'D · Margen de beneficio',
    fields: [
      { id: 'margenMinimo', label: 'Margen mínimo', default: 15, unit: '%' },
      { id: 'margenObjetivo', label: 'Margen objetivo', default: 30, unit: '%' },
      { id: 'reserva', label: 'Reserva para reinversión', default: 5, unit: '%' },
    ],
  },
  {
    id: 'E',
    title: 'E · Valor aportado al cliente',
    help: 'Del 1 (bajo) al 5 (muy alto). Ajusta el precio según el impacto generado.',
    fields: [
      { id: 'problema', label: 'Problema crítico que resuelve', default: 3, kind: 'score' },
      { id: 'impacto', label: 'Impacto económico generado', default: 3, kind: 'score' },
      { id: 'ahorro', label: 'Ahorro de tiempo del cliente', default: 3, kind: 'score' },
      { id: 'riesgoRed', label: 'Reducción de riesgos', default: 3, kind: 'score' },
      { id: 'transformacion', label: 'Transformación / resultado obtenido', default: 3, kind: 'score' },
      { id: 'especializacion', label: 'Nivel de especialización requerido', default: 3, kind: 'score' },
    ],
  },
  {
    id: 'F',
    title: 'F · Posicionamiento de marca',
    fields: [
      { id: 'posicionamiento', label: 'Posicionamiento', default: 2, kind: 'score', min: 1, max: 3, scaleLabels: ['Accesible', 'Intermedio', 'Premium'] },
    ],
  },
  {
    id: 'G',
    title: 'G · Mercado y competencia',
    help: 'Solo referencia: se compara con el precio recomendado, no lo modifica.',
    fields: [
      { id: 'comp1', label: 'Precio referencia competidor 1', default: 0, unit: '€' },
      { id: 'comp2', label: 'Precio referencia competidor 2', default: 0, unit: '€' },
      { id: 'comp3', label: 'Precio referencia competidor 3', default: 0, unit: '€' },
      { id: 'disposicion', label: 'Disposición a pagar del cliente ideal', default: 0, unit: '€' },
    ],
  },
  {
    id: 'H',
    title: 'H · Riesgo y complejidad',
    help: 'Del 1 al 5. Genera una prima de riesgo de 0% a 20%.',
    fields: [
      { id: 'personalizacion', label: 'Grado de personalización', default: 3, kind: 'score' },
      { id: 'responsabilidad', label: 'Responsabilidad asumida', default: 3, kind: 'score' },
      { id: 'urgencia', label: 'Urgencia', default: 3, kind: 'score' },
      { id: 'incertidumbre', label: 'Incertidumbre del proyecto', default: 3, kind: 'score' },
    ],
  },
  {
    id: 'I',
    title: 'I · Formato de prestación',
    fields: [
      { id: 'formato', label: 'Formato', default: 3, kind: 'score', min: 1, max: 5, scaleLabels: ['Hora', 'Sesión', 'Proyecto', 'Retainer', 'Grupal'] },
      { id: 'participantes', label: 'Nº de participantes / unidades', default: 1, unit: 'uds' },
    ],
  },
]

// Defaults derivados de la config (para inicializar el estado del formulario).
export function defaultValues() {
  const out = {}
  for (const s of sections) for (const f of s.fields) out[f.id] = f.default
  return out
}

const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0)

// =============================================================================
// MOTOR DE CÁLCULO — réplica de las fórmulas del Excel (columna E del resumen).
// =============================================================================
export function compute(raw, global) {
  const v = {}
  for (const s of sections) for (const f of s.fields) v[f.id] = num(raw[f.id], 0)

  const ivaPct = num(global?.ivaPct, 21) / 100 // E108

  // A · Costes directos
  const subtotalPropio = v.horasPropias * v.tarifaPropia // E8
  const subtotalColab =
    v.colabHoras1 * v.colabTarifa1 +
    v.colabHoras2 * v.colabTarifa2 +
    v.colabHoras3 * v.colabTarifa3 +
    v.colabHoras4 * v.colabTarifa4 +
    v.colabHoras5 * v.colabTarifa5 // E25
  const otrosDirectos = v.herramientas + v.materiales + v.desplazamientos + v.informes + v.softwareBI
  const totalDirectos = subtotalPropio + subtotalColab + otrosDirectos // E32

  // B · Costes indirectos prorrateados
  const indirectosSinNominas =
    v.alquiler + v.seguros + v.autonomos + v.contabilidad + v.marketing + v.formacion + v.herramientasGestion // E43
  const indirectosConNominas = indirectosSinNominas + v.nominas // E44
  const indirectosImputados =
    v.horasFacturablesTotales === 0 ? 0 : (indirectosConNominas / v.horasFacturablesTotales) * v.horasProyecto // E47

  // C · Tiempo no facturable
  const horasNoFacturables = v.prep + v.reuniones + v.admin + v.seguimiento + v.atencion + v.procesos // E56
  const costeNoFacturable = horasNoFacturables * v.tarifaPropia // E57

  const costeBase = totalDirectos + indirectosImputados + costeNoFacturable // E59

  // D · Margen
  const margenMinimo = v.margenMinimo / 100
  const margenObjetivo = v.margenObjetivo / 100
  const reserva = v.reserva / 100
  const margenTotal = margenObjetivo + reserva // E65
  const precioConMargen = 1 - margenTotal === 0 ? 0 : costeBase / (1 - margenTotal) // E66

  // E · Factor de valor (1.00 – 1.50)
  const mediaValor = avg([v.problema, v.impacto, v.ahorro, v.riesgoRed, v.transformacion, v.especializacion]) // E76
  const factorValor = 1 + ((mediaValor - 1) * 0.5) / 4 // E77

  // F · Factor de posicionamiento (0.85 – 1.20)
  const factorPosicion = 0.85 + (v.posicionamiento - 1) * 0.175 // E81

  // G · Mercado (referencia)
  const compis = [v.comp1, v.comp2, v.comp3].filter((x) => x > 0)
  const mediaMercado = compis.length ? avg(compis) : 0 // E88

  // H · Prima de riesgo (0% – 20%)
  const mediaRiesgo = avg([v.personalizacion, v.responsabilidad, v.urgencia, v.incertidumbre]) // E95
  const primaRiesgoPct = (mediaRiesgo - 1) * 0.05 // E96

  // Resumen de cálculo
  const paso1 = precioConMargen // E103
  const paso2 = paso1 * factorValor // E104
  const paso3 = paso2 * factorPosicion // E105
  const primaRiesgoEur = paso3 * primaRiesgoPct // E106
  const precioRecomendado = paso3 + primaRiesgoEur // E107 (sin IVA)
  const ivaEur = precioRecomendado * ivaPct // E109
  const precioFinal = precioRecomendado + ivaEur // E110 (con IVA)
  const precioPorUnidad = v.participantes > 1 ? precioFinal / v.participantes : precioFinal // E112
  const denomMin = 1 - margenMinimo - reserva
  const precioMinimo = denomMin === 0 ? 0 : (costeBase / denomMin) * (1 + ivaPct) // E113

  // Análisis de rentabilidad
  const rentabilidadBruta = precioFinal === 0 ? 0 : (precioFinal - costeBase * (1 + ivaPct)) / precioFinal // E116
  const beneficioNeto = precioRecomendado - costeBase // E117
  const difVsMinimo = precioFinal - precioMinimo // E118
  const difVsMercado = mediaMercado === 0 ? 0 : precioFinal - mediaMercado // E119

  return {
    // bloques de coste
    totalDirectos,
    indirectosImputados,
    costeNoFacturable,
    costeBase,
    // factores
    margenTotal,
    factorValor,
    factorPosicion,
    primaRiesgoPct,
    mediaMercado,
    // resumen (pasos)
    steps: [
      { label: '① Precio base (coste + margen)', value: paso1 },
      { label: '② Ajuste por valor aportado', value: paso2 },
      { label: '③ Ajuste por posicionamiento', value: paso3 },
      { label: '④ Prima de riesgo', value: primaRiesgoEur },
      { label: '⑤ Precio recomendado (sin IVA)', value: precioRecomendado, emphasis: true },
      { label: `⑥ IVA (${num(global?.ivaPct, 21)}%)`, value: ivaEur },
    ],
    precioRecomendado,
    ivaEur,
    precioFinal,
    precioPorUnidad,
    participantes: v.participantes,
    precioMinimo,
    // análisis
    rentabilidadBruta,
    beneficioNeto,
    difVsMinimo,
    difVsMercado,
  }
}

export default {
  id: 'consultoria',
  label: 'Consultoría',
  icon: '🤝',
  tagline: 'Proyectos de consultoría estratégica y asesoramiento.',
  formula: 'Precio = (Coste Base ÷ (1−Margen)) × Factor Valor × Factor Posicionamiento + Prima Riesgo + IVA',
  sections,
  defaultValues,
  compute,
}
