import { useMemo, useState } from 'react'

const formatDateBR = (isoDate) => {
  if (!isoDate) return ''
  const [year, month, day] = isoDate.split('-')
  if (!year || !month || !day) return isoDate
  return `${day}/${month}/${year}`
}

const emptyAppointment = {
  patientId: '',
  date: '',
  time: '',
  reason: '',
}

export default function Appointments({
  onBack,
  onSubmit,
  patients,
  appointments,
  mode = 'create',
  onSelect,
}) {
  const [formData, setFormData] = useState(emptyAppointment)

  const selectedPatient = useMemo(
    () => patients.find((p) => p.id === formData.patientId),
    [formData.patientId, patients]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!selectedPatient) return

    onSubmit({
      patientId: formData.patientId,
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      patientName: selectedPatient.fullName,
    })

    setFormData(emptyAppointment)
  }

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Agenda</p>
          {mode === 'create' ? (
            <>
              <h2>Cadastrar nova consulta</h2>
              <p className="page-header__subtitle">
                Registre uma nova consulta vinculando um paciente já cadastrado. Tudo fica salvo apenas em memória.
              </p>
            </>
          ) : (
            <>
              <h2>Lista de consultas</h2>
              <p className="page-header__subtitle">
                Visualize todas as consultas agendadas e abra o detalhe de cada paciente para editar ou excluir.
              </p>
            </>
          )}
        </div>
        <button className="button" onClick={onBack}>
          Voltar
        </button>
      </header>

      {mode === 'create' && (
        <div className="card">
          <form className="form form--grid" onSubmit={handleSubmit}>
            <label className="form__group form__group--full">
              <span>Paciente</span>
              <select name="patientId" value={formData.patientId} onChange={handleChange} required>
                <option value="">Selecione um paciente</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.fullName} ({patient.document})
                  </option>
                ))}
              </select>
            </label>

            <label className="form__group">
              <span>Data</span>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>

            <label className="form__group">
              <span>Hora</span>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </label>

            <label className="form__group form__group--full">
              <span>Motivo / Observações</span>
              <textarea
                name="reason"
                rows={3}
                placeholder="Rotina, retorno, sintomas principais..."
                value={formData.reason}
                onChange={handleChange}
              />
            </label>

            <button
              type="submit"
              className="button button--primary form__group--full"
              disabled={!formData.patientId || !formData.date || !formData.time}
            >
              Agendar consulta
            </button>
          </form>
        </div>
      )}

      <section className="card">
        <header className="card__header">
          <h3>{mode === 'create' ? 'Consultas em memória' : 'Todas as consultas cadastradas'}</h3>
          <p className="card__subtitle">
            Lista não é persistida em banco — é reiniciada ao recarregar a página.
          </p>
        </header>

        {appointments.length === 0 ? (
          <p className="card__subtitle">Nenhuma consulta cadastrada ainda.</p>
        ) : (
          <div className="table">
            <div className="table__row table__row--head">
              <span>Paciente</span>
              <span>Data</span>
              <span>Hora</span>
              <span>Status</span>
              {mode === 'list' && <span>Ações</span>}
            </div>
            {appointments.map((appointment) => (
              <div className="table__row" key={appointment.id}>
                <span>{appointment.patientName}</span>
                <span>{formatDateBR(appointment.date)}</span>
                <span>{appointment.time}</span>
                <span>{appointment.status}</span>
                {mode === 'list' && (
                  <span>
                    <button
                      type="button"
                      className="button button--primary"
                      onClick={() => onSelect && onSelect(appointment)}
                    >
                      Ver
                    </button>
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
