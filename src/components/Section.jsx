import { useState } from 'react'
import Field from './Field.jsx'
import CollaboratorsField from './CollaboratorsField.jsx'

// Sección colapsable de campos.
export default function Section({ section, values, onChange, currency }) {
  const [open, setOpen] = useState(true)

  return (
    <section className="rounded-xl border border-gris-claro bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
      >
        <span className="font-semibold text-marino">{section.title}</span>
        <span className="text-gris-medio">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="border-t border-gris-claro/60 px-5 pb-4">
          {section.help ? <p className="pt-3 text-xs text-gris-medio">{section.help}</p> : null}
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {section.fields.map((f) => (
              <div key={f.id} className={f.full ? 'sm:col-span-2' : ''}>
                {f.kind === 'collaborators' ? (
                  <CollaboratorsField field={f} value={values[f.id]} onChange={onChange} currency={currency} />
                ) : (
                  <Field field={f} value={values[f.id]} onChange={onChange} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
