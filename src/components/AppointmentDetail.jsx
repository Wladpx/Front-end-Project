import { useState } from 'react'

const formatDateBR = (isoDate) => {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${day}/${month}/${year}`
}

export default function AppointmentDetail({ appointment, onBack, onUpdate, onDelete }) {
  const [formData, setFormData] = useState(appointment)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (event) => {
    event.preventDefault()
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(appointment.id)
  }

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Consulta do paciente</p>
          <h2>{appointment.patientName}</h2>
          <p className="page-header__subtitle">
            Revise os dados da consulta selecionada. Você pode ajustar data, horário, motivo ou remover o registro.
          </p>
          <p className="page-header__subtitle">
            Data da consulta: {formatDateBR(appointment.date)} às {appointment.time}
          </p>
        </div>
        <button className="button" onClick={onBack}>
          Voltar para lista
        </button>
      </header>

      <div className="card">
        <form className="form form--grid" onSubmit={handleSave}>
          <label className="form__group">
            <span>Data</span>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </label>

          <label className="form__group">
            <span>Hora</span>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
          </label>

          <label className="form__group form__group--full">
            <span>Motivo / Observações</span>
            <textarea
              name="reason"
              rows={3}
              value={formData.reason}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label className="form__group form__group--full">
            <span>Status</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Agendada">Agendada</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </label>

          <div className="form__group form__group--full" style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="button"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? 'Cancelar edição' : 'Editar consulta'}
            </button>

            <button
              type="submit"
              className="button button--primary"
              disabled={!isEditing}
            >
              Salvar alterações
            </button>

            <button
              type="button"
              className="button"
              onClick={handleDelete}
            >
              Excluir consulta
            </button>
          </div>
        </form>
      </div>
    </>
  )
}


