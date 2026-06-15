import { useState } from 'react'
import Field from './Field.jsx'

// Sección colapsable de campos.
export default function Section({ section, values, onChange }) {
  const [open, setOpen] = useState(true)

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
      >
        <span className="font-semibold text-slate-800">{section.title}</span>
        <span className="text-slate-400">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 pb-4">
          {section.help ? <p className="pt-3 text-xs text-slate-500">{section.help}</p> : null}
          <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {section.fields.map((f) => (
              <Field key={f.id} field={f} value={values[f.id]} onChange={onChange} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
