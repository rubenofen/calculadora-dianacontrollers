import { emptyCollaborator } from '../calculators/consultoria.js'
import { formatCurrency } from '../lib/format.js'

// Lista dinámica de colaboradores: añadir/quitar a voluntad.
// El valor es un array de { nombre, horas, tarifa }.
export default function CollaboratorsField({ field, value, onChange, currency = 'EUR' }) {
  const list = Array.isArray(value) ? value : []

  const update = (next) => onChange(field.id, next)
  const add = () => update([...list, emptyCollaborator()])
  const remove = (i) => update(list.filter((_, idx) => idx !== i))
  const setItem = (i, key, v) => update(list.map((c, idx) => (idx === i ? { ...c, [key]: v } : c)))

  const total = list.reduce((acc, c) => acc + (parseFloat(c.horas) || 0) * (parseFloat(c.tarifa) || 0), 0)

  const cell =
    'rounded-md border border-gris-claro bg-white px-2 py-1.5 text-sm text-marino outline-none focus:border-terracota focus:ring-2 focus:ring-terracota/20'

  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gris-medio">{field.label}</span>
        {list.length > 0 && (
          <span className="text-xs text-gris-medio">
            Subtotal: <span className="font-medium text-marino">{formatCurrency(total, currency)}</span>
          </span>
        )}
      </div>

      {list.length === 0 ? (
        <p className="mt-1 text-xs text-gris-medio">Sin colaboradores. Añade los que necesites.</p>
      ) : (
        <div className="mt-2 flex flex-col gap-2">
          {list.map((c, i) => (
            <div key={i} className="flex items-end gap-2 rounded-lg border border-gris-claro/70 bg-blanco/60 p-2">
              <label className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-[11px] text-gris-medio">Nombre / rol</span>
                <input
                  className={cell}
                  value={c.nombre ?? ''}
                  placeholder={`Colaborador ${i + 1}`}
                  onChange={(e) => setItem(i, 'nombre', e.target.value)}
                />
              </label>
              <label className="flex w-20 flex-col gap-1">
                <span className="text-[11px] text-gris-medio">Horas</span>
                <input
                  type="number"
                  inputMode="decimal"
                  className={`${cell} tabular-nums`}
                  value={c.horas ?? ''}
                  placeholder="0"
                  onChange={(e) => setItem(i, 'horas', e.target.value)}
                />
              </label>
              <label className="flex w-24 flex-col gap-1">
                <span className="text-[11px] text-gris-medio">€/hora</span>
                <input
                  type="number"
                  inputMode="decimal"
                  className={`${cell} tabular-nums`}
                  value={c.tarifa ?? ''}
                  placeholder="0"
                  onChange={(e) => setItem(i, 'tarifa', e.target.value)}
                />
              </label>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Quitar colaborador"
                className="mb-0.5 rounded-md border border-gris-claro px-2 py-1.5 text-sm text-gris-medio hover:border-terracota hover:text-terracota"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={add}
        className="mt-2 rounded-lg border border-dashed border-terracota px-3 py-1.5 text-sm font-medium text-terracota hover:bg-terracota/10"
      >
        + Añadir colaborador
      </button>
    </div>
  )
}
