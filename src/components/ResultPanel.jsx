import { formatCurrency, formatPercent } from '../lib/format.js'
import { formatDate } from '../config/global.js'
import { exportResultPdf } from '../lib/pdf.js'

// Panel de resultado fijo. Recalcula en vivo con cada cambio del formulario.
export default function ResultPanel({ result, business, calculator, onEditBusiness }) {
  const r = result
  const cur = business?.currency || 'EUR'
  const money = (v) => formatCurrency(v, cur)
  const rentColor = r.rentabilidadBruta >= 0 ? 'text-salvia-dark' : 'text-terracota'
  const difMinColor = r.difVsMinimo >= 0 ? 'text-salvia-dark' : 'text-terracota'

  const Row = ({ label, value, emphasis }) => (
    <div className={`flex items-baseline justify-between gap-3 py-1.5 ${emphasis ? 'font-semibold text-marino' : 'text-gris-medio'}`}>
      <span className="text-sm">{label}</span>
      <span className="tabular-nums text-sm">{money(value)}</span>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Datos del negocio (reflejados desde el paso anterior) */}
      <div className="rounded-xl border border-gris-claro bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold text-marino">{business?.negocio || 'Tu negocio'}</p>
            {business?.sector && <p className="text-xs text-gris-medio">{business.sector}</p>}
          </div>
          <button
            type="button"
            onClick={onEditBusiness}
            className="shrink-0 rounded-md border border-gris-claro px-2 py-1 text-xs text-gris-medio hover:bg-gris-claro/40"
          >
            Editar datos
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gris-medio">
          <span>Moneda: <span className="font-medium text-marino">{cur}</span></span>
          <span>IVA: <span className="font-medium text-marino">{business?.ivaPct || 0}%</span></span>
          {business?.fecha && <span>Actualizado: <span className="font-medium text-marino">{formatDate(business.fecha)}</span></span>}
        </div>
      </div>

      {/* Precio final destacado */}
      <div className="rounded-2xl bg-gradient-to-br from-terracota to-naranja p-5 text-white shadow-lg">
        <p className="text-xs uppercase tracking-wide text-white/80">Precio final al cliente (con IVA)</p>
        <p className="mt-1 text-4xl font-bold tabular-nums">{money(r.precioFinal)}</p>
        <p className="mt-1 text-sm text-white/85">
          {money(r.precioRecomendado)} sin IVA · IVA {money(r.ivaEur)}
        </p>
      </div>

      {/* Descargar informe en PDF */}
      <button
        type="button"
        onClick={() => exportResultPdf(result, business, calculator)}
        className="flex items-center justify-center gap-2 rounded-xl border border-gris-claro bg-white px-4 py-2.5 text-sm font-semibold text-marino shadow-sm transition hover:bg-gris-claro/40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5a.75.75 0 0 1 .75.75v8.69l2.22-2.22a.75.75 0 1 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 1 1 1.06-1.06l2.22 2.22V2.25A.75.75 0 0 1 10 1.5Z" />
          <path d="M3.5 13a.75.75 0 0 1 .75.75v2.5c0 .14.11.25.25.25h11a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 15.5 18h-11A1.75 1.75 0 0 1 2.75 16.25v-2.5A.75.75 0 0 1 3.5 13Z" />
        </svg>
        Descargar informe en PDF
      </button>

      {/* Desglose del cálculo */}
      <div className="rounded-xl border border-gris-claro bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-marino">Desglose del cálculo</h3>
        {r.steps.map((s) => (
          <Row key={s.label} label={s.label} value={s.value} emphasis={s.emphasis} />
        ))}
      </div>

      {/* Bloques de coste */}
      <div className="rounded-xl border border-gris-claro bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-marino">Costes</h3>
        <Row label="Costes directos (A)" value={r.totalDirectos} />
        <Row label="Indirectos imputados (B)" value={r.indirectosImputados} />
        <Row label="Tiempo no facturable (C)" value={r.costeNoFacturable} />
        <div className="mt-1 border-t border-gris-claro/60 pt-1">
          <Row label="Coste base total" value={r.costeBase} emphasis />
        </div>
      </div>

      {/* Análisis de rentabilidad */}
      <div className="rounded-xl border border-gris-claro bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-marino">Análisis</h3>
        <div className="flex items-baseline justify-between py-1.5 text-gris-medio">
          <span className="text-sm">Rentabilidad bruta</span>
          <span className={`tabular-nums text-sm font-semibold ${rentColor}`}>{formatPercent(r.rentabilidadBruta)}</span>
        </div>
        <Row label="Beneficio neto estimado" value={r.beneficioNeto} />
        <Row label="Precio mínimo aceptable" value={r.precioMinimo} />
        <div className="flex items-baseline justify-between py-1.5 text-gris-medio">
          <span className="text-sm">Diferencia vs. precio mínimo</span>
          <span className={`tabular-nums text-sm font-semibold ${difMinColor}`}>{money(r.difVsMinimo)}</span>
        </div>
        {r.mediaMercado > 0 && <Row label="Diferencia vs. media de mercado" value={r.difVsMercado} />}
      </div>
    </div>
  )
}
