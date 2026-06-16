// Campo individual. Soporta input numérico y "score" (1-5 / 1-3) con slider.
export default function Field({ field, value, onChange }) {
  const isScore = field.kind === 'score'
  const min = field.min ?? 1
  const max = field.max ?? 5
  const scaleLabel = field.scaleLabels?.[Math.round(Number(value)) - min]

  return (
    <label className="flex h-full flex-col gap-1 py-2">
      <span className="text-sm text-gris-medio">{field.label}</span>

      {isScore ? (
        <div className="mt-auto flex items-center gap-3">
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={value === '' ? min : value}
            onChange={(e) => onChange(field.id, Number(e.target.value))}
            className="flex-1 accent-terracota"
          />
          <span className="w-28 shrink-0 text-right text-sm font-medium tabular-nums text-marino">
            {value}
            {scaleLabel ? <span className="ml-1 text-xs font-normal text-gris-medio">{scaleLabel}</span> : null}
          </span>
        </div>
      ) : (
        <div className="mt-auto flex items-stretch overflow-hidden rounded-lg border border-gris-claro focus-within:border-terracota focus-within:ring-2 focus-within:ring-terracota/20">
          <input
            type="number"
            inputMode="decimal"
            value={value}
            placeholder="0"
            onChange={(e) => onChange(field.id, e.target.value)}
            className="w-full bg-white px-3 py-2 text-sm tabular-nums text-marino outline-none"
          />
          {field.unit ? (
            <span className="flex items-center bg-blanco px-3 text-xs text-gris-medio">{field.unit}</span>
          ) : null}
        </div>
      )}
    </label>
  )
}
