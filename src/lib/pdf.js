import { formatCurrency, formatPercent } from './format.js'
import { formatDate } from '../config/global.js'

// =============================================================================
// EXPORTACIÓN A PDF — informe completo del cálculo.
// Genera el documento desde los datos estructurados (result + business), no
// desde una captura de pantalla: el texto queda seleccionable y maquetado.
// =============================================================================

// Paleta de marca (réplica de src/index.css).
const COLOR = {
  marino: [22, 41, 58],
  terracota: [188, 90, 44],
  naranja: [230, 160, 74],
  salviaDark: [111, 140, 99],
  grisMedio: [95, 103, 114],
  grisClaro: [212, 210, 205],
  blanco: [247, 244, 239],
}

const MARGIN = 48 // pt
const PAGE_W = 595.28 // A4 vertical (pt)
const CONTENT_W = PAGE_W - MARGIN * 2

export async function exportResultPdf(result, business, calculator) {
  // Carga diferida: jsPDF solo se descarga al pulsar "Descargar PDF".
  const { jsPDF } = await import('jspdf')
  const r = result
  const cur = business?.currency || 'EUR'
  const money = (v) => formatCurrency(v, cur)

  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  let y = MARGIN

  // --- Cabecera --------------------------------------------------------------
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...COLOR.marino)
  doc.text(`Cálculo de precio — ${calculator?.label || ''}`, MARGIN, y)
  y += 22

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...COLOR.grisMedio)
  const negocio = business?.negocio || 'Tu negocio'
  doc.text(negocio + (business?.sector ? ` · ${business.sector}` : ''), MARGIN, y)
  y += 15
  const meta = [
    `Moneda: ${cur}`,
    `IVA: ${business?.ivaPct ?? 0}%`,
    business?.fecha ? `Actualizado: ${formatDate(business.fecha)}` : null,
  ].filter(Boolean).join('     ')
  doc.setFontSize(9)
  doc.text(meta, MARGIN, y)
  y += 20

  // --- Precio final destacado ------------------------------------------------
  const boxH = 78
  doc.setFillColor(...COLOR.terracota)
  doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 8, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text('PRECIO FINAL AL CLIENTE (CON IVA)', MARGIN + 18, y + 24)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.text(money(r.precioFinal), MARGIN + 18, y + 54)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`${money(r.precioRecomendado)} sin IVA   ·   IVA ${money(r.ivaEur)}`, MARGIN + 18, y + 70)
  y += boxH + 24

  // --- Bloques ---------------------------------------------------------------
  // Desglose del cálculo (pasos)
  y = section(doc, y, 'Desglose del cálculo')
  for (const s of r.steps) {
    y = row(doc, y, s.label, money(s.value), s.emphasis)
  }
  y += 8

  // Costes
  y = section(doc, y, 'Costes')
  y = row(doc, y, 'Costes directos (A)', money(r.totalDirectos))
  y = row(doc, y, 'Indirectos imputados (B)', money(r.indirectosImputados))
  y = row(doc, y, 'Tiempo no facturable (C)', money(r.costeNoFacturable))
  y = row(doc, y, 'Coste base total', money(r.costeBase), true)
  y += 8

  // Análisis de rentabilidad
  y = section(doc, y, 'Análisis de rentabilidad')
  y = row(doc, y, 'Rentabilidad bruta', formatPercent(r.rentabilidadBruta), false,
    r.rentabilidadBruta >= 0 ? COLOR.salviaDark : COLOR.terracota)
  y = row(doc, y, 'Beneficio neto estimado', money(r.beneficioNeto))
  y = row(doc, y, 'Precio mínimo aceptable', money(r.precioMinimo))
  y = row(doc, y, 'Diferencia vs. precio mínimo', money(r.difVsMinimo), false,
    r.difVsMinimo >= 0 ? COLOR.salviaDark : COLOR.terracota)
  if (r.mediaMercado > 0) {
    y = row(doc, y, 'Diferencia vs. media de mercado', money(r.difVsMercado))
  }

  // --- Pie -------------------------------------------------------------------
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(...COLOR.grisClaro)
  if (calculator?.formula) {
    doc.text(doc.splitTextToSize(ascii(calculator.formula), CONTENT_W), MARGIN, 800)
  }

  const slug = (negocio || 'negocio').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const fecha = (business?.fecha || new Date().toISOString().slice(0, 10))
  doc.save(`precio-${slug || 'negocio'}-${fecha}.pdf`)
}

// Título de sección con línea separadora.
function section(doc, y, title) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...COLOR.marino)
  doc.text(title, MARGIN, y)
  y += 6
  doc.setDrawColor(...COLOR.grisClaro)
  doc.setLineWidth(0.75)
  doc.line(MARGIN, y, MARGIN + CONTENT_W, y)
  return y + 16
}

// Sanea texto para las fuentes estándar de jsPDF (Latin-1): convierte los
// números en círculo ①②③… a "1." y elimina cualquier glifo no soportado.
function ascii(s) {
  return String(s)
    .replace(/[①-⑳]/g, (c) => `${c.charCodeAt(0) - 0x2460 + 1}.`)
    .replace(/−/g, '-') // signo menos matemático → guion
    .replace(/[^\x00-\xFF]/g, '')
    .trim()
}

// Fila etiqueta · valor.
function row(doc, y, label, value, emphasis = false, valueColor = null) {
  doc.setFont('helvetica', emphasis ? 'bold' : 'normal')
  doc.setFontSize(10.5)
  doc.setTextColor(...(emphasis ? COLOR.marino : COLOR.grisMedio))
  doc.text(ascii(label), MARGIN, y)
  doc.setTextColor(...(valueColor || (emphasis ? COLOR.marino : COLOR.grisMedio)))
  doc.text(String(value), MARGIN + CONTENT_W, y, { align: 'right' })
  return y + 18
}
