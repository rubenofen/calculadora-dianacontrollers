import { CALCULATOR_TYPES } from '../calculators/index.js'

// Primera pantalla: ¿qué tipo de servicio o producto vendes?
export default function TypeSelector({ onSelect }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-marino">Calculadora de Precios</h1>
        <p className="mt-2 text-gris-medio">
          ¿Qué tipo de servicio o producto quieres calcular? Elige una categoría para empezar.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CALCULATOR_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            disabled={!t.available}
            onClick={() => t.available && onSelect(t.id)}
            className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition ${
              t.available
                ? 'border-gris-claro bg-white shadow-sm hover:border-terracota hover:shadow-md'
                : 'cursor-not-allowed border-dashed border-gris-claro bg-blanco opacity-70'
            }`}
          >
            <span className="text-3xl">{t.icon}</span>
            <span className="flex-1">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-marino">{t.label}</span>
                {!t.available && (
                  <span className="rounded-full bg-gris-claro px-2 py-0.5 text-[10px] font-medium uppercase text-gris-medio">
                    Próximamente
                  </span>
                )}
              </span>
              <span className="mt-1 block text-sm text-gris-medio">{t.tagline}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
