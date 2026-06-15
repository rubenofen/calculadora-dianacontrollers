import { formatCurrency, formatPercent } from '../lib/format.js'
import { formatDate } from '../config/global.js'

// Panel de resultado fijo. Recalcula en vivo con cada cambio del formulario.
export default function ResultPanel({ result, business, onEditBusiness }) {
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
        {r.participantes > 1 && (
          <p className="mt-2 text-sm text-white/85">{money(r.precioPorUnidad)} por participante / unidad</p>
        )}
      </div>

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
