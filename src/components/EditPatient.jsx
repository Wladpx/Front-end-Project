import { useState, useEffect } from "react"

export default function EditPatient({ onBack, onSubmit, patient }) {
  const [formData, setFormData] = useState(patient)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    setFormData(patient)
  }, [patient])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
    setFeedback("Dados do paciente atualizados (mock).")
    setTimeout(() => setFeedback(""), 4000)
  }

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Fluxo disponível</p>
          <h2>Editar paciente</h2>
          <p className="page-header__subtitle">
            Atualize informações já cadastradas. Os dados permanecem em memória temporária.
          </p>
        </div>
        <button className="button" onClick={onBack}>
          Voltar
        </button>
      </header>

      <div className="card">
        <form className="form form--grid" onSubmit={handleSubmit}>
          <label className="form__group form__group--full">
            <span>Nome completo</span>
            <input
              name="fullName"
              placeholder="Paciente Demo"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__group">
            <span>Documento</span>
            <input
              name="document"
              placeholder="000.000.000-00"
              value={formData.document}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__group">
            <span>Data de nascimento</span>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__group">
            <span>Telefone</span>
            <input
              name="phone"
              placeholder="(81) 99999-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form__group form__group--full">
            <span>Observações</span>
            <textarea
              name="notes"
              rows={3}
              placeholder="Alergias, preferências e outras anotações."
              value={formData.notes}
              onChange={handleChange}
            />
          </label>

          {feedback && <p className="form__feedback form__feedback--success">{feedback}</p>}

          <button type="submit" className="button button--primary form__group--full">
            Salvar alterações
          </button>
        </form>
      </div>
    </>
  )
}
