import { useMemo, useState } from 'react'
import { sanitizeDocument, sanitizePhone } from '../utils/patientUtils'

const emptyForm = {
  id: '',
  fullName: '',
  document: '',
  birthDate: '',
  phone: '',
  notes: '',
}

const buildFormData = (patient) =>
  patient
    ? {
        ...patient,
        document: sanitizeDocument(patient.document),
        phone: sanitizePhone(patient.phone),
        notes: patient.notes || '',
      }
    : emptyForm

export default function EditPatient({ onBack, onSubmit, patients }) {
  const [selectedPatientId, setSelectedPatientId] = useState(() => patients[0]?.id ?? '')
  const [drafts, setDrafts] = useState({})
  const [feedback, setFeedback] = useState('')

  const effectiveSelectedPatientId = useMemo(() => {
    if (!patients.length) return ''
    return patients.some((patient) => patient.id === selectedPatientId) ? selectedPatientId : patients[0].id
  }, [patients, selectedPatientId])

  const selectedPatient = useMemo(
    () => patients.find((patient) => patient.id === effectiveSelectedPatientId) ?? null,
    [patients, effectiveSelectedPatientId]
  )

  const hasPatients = Boolean(selectedPatient)

  const selectionOptions = useMemo(
    () =>
      patients.map((patient) => ({
        id: patient.id,
        label: patient.fullName || patient.id,
      })),
    [patients]
  )

  const currentDraft = useMemo(() => {
    if (!selectedPatient) return emptyForm
    return drafts[effectiveSelectedPatientId] ?? buildFormData(selectedPatient)
  }, [drafts, selectedPatient, effectiveSelectedPatientId])

  const handleChange = (event) => {
    if (!hasPatients) return
    const { name } = event.target
    let { value } = event.target

    if (name === 'document') {
      value = sanitizeDocument(value)
    }

    if (name === 'phone') {
      value = sanitizePhone(value)
    }

    setDrafts((prev) => {
      const nextDraft = { ...(prev[effectiveSelectedPatientId] ?? currentDraft), [name]: value }
      return {
        ...prev,
        [effectiveSelectedPatientId]: nextDraft,
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!hasPatients) return
    onSubmit(currentDraft)
    setFeedback('Dados do paciente atualizados (mock).')
    setTimeout(() => setFeedback(''), 4000)
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

      {!hasPatients ? (
        <div className="card card--centered">
          <h3>Nenhum paciente disponível</h3>
          <p>Cadastre um paciente primeiro para liberar a tela de edição.</p>
        </div>
      ) : (
        <div className="card">
          <form className="form form--grid" onSubmit={handleSubmit}>
            <label className="form__group form__group--full">
              <span>Selecione o paciente</span>
              <select value={effectiveSelectedPatientId} onChange={(event) => setSelectedPatientId(event.target.value)}>
                {selectionOptions.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="form__group form__group--full">
              <span>Nome completo</span>
              <input name="fullName" placeholder="Paciente Demo" value={currentDraft.fullName} onChange={handleChange} required />
            </label>

            <label className="form__group">
              <span>Documento</span>
              <input
                name="document"
                placeholder="Somente números"
                value={currentDraft.document}
                onChange={handleChange}
                required
                inputMode="numeric"
                minLength={11}
                maxLength={11}
                pattern="[0-9]{11}"
                title="Digite exatamente 11 números"
              />
            </label>

            <label className="form__group">
              <span>Data de nascimento</span>
              <input type="date" name="birthDate" value={currentDraft.birthDate} onChange={handleChange} required />
            </label>

            <label className="form__group">
              <span>Telefone</span>
              <input
                name="phone"
                placeholder="Somente números"
                value={currentDraft.phone}
                onChange={handleChange}
                required
                inputMode="numeric"
                minLength={11}
                maxLength={11}
                pattern="[0-9]{11}"
                title="Digite exatamente 11 números (DDD + número)"
              />
            </label>

            <label className="form__group form__group--full">
              <span>Observações</span>
              <textarea
                name="notes"
                rows={3}
                placeholder="Alergias, preferências e outras anotações."
                value={currentDraft.notes}
                onChange={handleChange}
              />
            </label>

            {feedback && <p className="form__feedback form__feedback--success">{feedback}</p>}

            <button type="submit" className="button button--primary form__group--full">
              Salvar alterações
            </button>
          </form>
        </div>
      )}
    </>
  )
}
