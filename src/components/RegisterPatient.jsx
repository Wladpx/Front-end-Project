import { useState } from 'react'

const emptyPatient = {
  fullName: '',
  document: '',
  birthDate: '',
  phone: '',
  notes: '',
}

export default function RegisterPatient({ onBack, onSubmit, patients }) {
  const [formData, setFormData] = useState(emptyPatient)
  const [feedback, setFeedback] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
    setFeedback('Paciente cadastrado apenas em memória (mock).')
    setFormData(emptyPatient)
    setTimeout(() => setFeedback(''), 4000)
  }

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Fluxo disponível</p>
          <h2>Cadastrar paciente</h2>
          <p className="page-header__subtitle">Dados ficam salvos somente na memória enquanto o app estiver aberto.</p>
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
            <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </label>

          <label className="form__group">
            <span>Telefone</span>
            <input name="phone" placeholder="(81) 99999-0000" value={formData.phone} onChange={handleChange} required />
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
            Salvar paciente
          </button>
        </form>
      </div>

      <section className="card">
        <header className="card__header">
          <h3>Pacientes em memória ({patients.length})</h3>
          <p className="card__subtitle">Lista é reiniciada sempre que a página é recarregada.</p>
        </header>

        <div className="table">
          <div className="table__row table__row--head">
            <span>Nome</span>
            <span>Documento</span>
            <span>Nascimento</span>
            <span>Contato</span>
          </div>
          {patients.map((patient) => (
            <div className="table__row" key={patient.id}>
              <span>{patient.fullName}</span>
              <span>{patient.document}</span>
              <span>{patient.birthDate}</span>
              <span>{patient.phone}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

