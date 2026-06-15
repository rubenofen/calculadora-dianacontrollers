import { formatCurrency, formatPercent } from '../lib/format.js'

function Row({ label, value, emphasis }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-1.5 ${emphasis ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
      <span className="text-sm">{label}</span>
      <span className="tabular-nums text-sm">{formatCurrency(value)}</span>
    </div>
  )
}

// Panel de resultado fijo. Recalcula en vivo con cada cambio del formulario.
export default function ResultPanel({ result }) {
  const r = result
  const rentColor = r.rentabilidadBruta >= 0 ? 'text-emerald-600' : 'text-rose-600'
  const difMinColor = r.difVsMinimo >= 0 ? 'text-emerald-600' : 'text-rose-600'

  return (
    <div className="flex flex-col gap-4">
      {/* Precio final destacado */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-lg">
        <p className="text-xs uppercase tracking-wide text-indigo-100">Precio final al cliente (con IVA)</p>
        <p className="mt-1 text-4xl font-bold tabular-nums">{formatCurrency(r.precioFinal)}</p>
        <p className="mt-1 text-sm text-indigo-100">
          {formatCurrency(r.precioRecomendado)} sin IVA · IVA {formatCurrency(r.ivaEur)}
        </p>
        {r.participantes > 1 && (
          <p className="mt-2 text-sm text-indigo-100">
            {formatCurrency(r.precioPorUnidad)} por participante / unidad
          </p>
        )}
      </div>

      {/* Desglose del cálculo */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-800">Desglose del cálculo</h3>
        {r.steps.map((s) => (
          <Row key={s.label} label={s.label} value={s.value} emphasis={s.emphasis} />
        ))}
      </div>

      {/* Bloques de coste */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-800">Costes</h3>
        <Row label="Costes directos (A)" value={r.totalDirectos} />
        <Row label="Indirectos imputados (B)" value={r.indirectosImputados} />
        <Row label="Tiempo no facturable (C)" value={r.costeNoFacturable} />
        <div className="mt-1 border-t border-slate-100 pt-1">
          <Row label="Coste base total" value={r.costeBase} emphasis />
        </div>
      </div>

      {/* Análisis de rentabilidad */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-800">Análisis</h3>
        <div className="flex items-baseline justify-between py-1.5 text-slate-600">
          <span className="text-sm">Rentabilidad bruta</span>
          <span className={`tabular-nums text-sm font-semibold ${rentColor}`}>{formatPercent(r.rentabilidadBruta)}</span>
        </div>
        <Row label="Beneficio neto estimado" value={r.beneficioNeto} />
        <Row label="Precio mínimo aceptable" value={r.precioMinimo} />
        <div className="flex items-baseline justify-between py-1.5 text-slate-600">
          <span className="text-sm">Diferencia vs. precio mínimo</span>
          <span className={`tabular-nums text-sm font-semibold ${difMinColor}`}>{formatCurrency(r.difVsMinimo)}</span>
        </div>
        {r.mediaMercado > 0 && <Row label="Diferencia vs. media de mercado" value={r.difVsMercado} />}
      </div>
    </div>
  )
}
