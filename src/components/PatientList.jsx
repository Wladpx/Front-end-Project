import { useMemo, useState } from 'react'

const QUICK_FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'withNotes', label: 'Com anotações' },
  { key: 'missingContact', label: 'Contato pendente' },
  { key: 'upcomingBirthdays', label: 'Aniversários (30 dias)' },
]

const calculateAge = (dateString) => {
  if (!dateString) return null
  const birth = new Date(dateString)
  if (Number.isNaN(birth.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  const dayDiff = today.getDate() - birth.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1
  }

  return age >= 0 ? age : null
}

const isUpcomingBirthday = (dateString, windowInDays = 30) => {
  if (!dateString) return false
  const birth = new Date(dateString)
  if (Number.isNaN(birth.getTime())) return false

  const today = new Date()
  const currentYearBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  const nextBirthday = currentYearBirthday < today ? new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate()) : currentYearBirthday

  const diffInMs = nextBirthday - today
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  return diffInDays <= windowInDays
}

const formatBirthDate = (dateString) => {
  if (!dateString) return '—'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

const filterHandlers = {
  all: () => true,
  withNotes: (patient) => patient.hasNotes,
  missingContact: (patient) => !patient.hasPhone,
  upcomingBirthdays: (patient) => patient.upcomingBirthday,
}

const PatientList = ({ onBack, patients = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const normalizedPatients = useMemo(
    () =>
      patients.map((patient) => {
        const age = calculateAge(patient.birthDate)
        return {
          ...patient,
          age,
          birthDateLabel: formatBirthDate(patient.birthDate),
          hasNotes: Boolean(patient.notes?.trim()),
          hasPhone: Boolean(patient.phone?.trim()),
          upcomingBirthday: isUpcomingBirthday(patient.birthDate),
        }
      }),
    [patients]
  )

  const overview = useMemo(
    () => ({
      total: normalizedPatients.length,
      withNotes: normalizedPatients.filter((patient) => patient.hasNotes).length,
      missingContact: normalizedPatients.filter((patient) => !patient.hasPhone).length,
      upcomingBirthdays: normalizedPatients.filter((patient) => patient.upcomingBirthday).length,
    }),
    [normalizedPatients]
  )

  const filteredPatients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return normalizedPatients
      .filter((patient) => {
        if (!term) return true
        const haystack = [patient.fullName, patient.document, patient.phone].filter(Boolean).map((value) => value.toLowerCase())
        return haystack.some((value) => value.includes(term))
      })
      .filter(filterHandlers[activeFilter] || filterHandlers.all)
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
  }, [normalizedPatients, searchTerm, activeFilter])

  const filterCountMap = {
    all: overview.total,
    withNotes: overview.withNotes,
    missingContact: overview.missingContact,
    upcomingBirthdays: overview.upcomingBirthdays,
  }

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Visão geral</p>
          <h2>Lista de pacientes</h2>
          <p className="page-header__subtitle">Monitore rapidamente contatos, observações e aniversários com filtros em um clique.</p>
        </div>
        <button className="button" onClick={onBack}>
          Voltar
        </button>
      </header>

      <section className="overview-grid">
        {[
          { label: 'Pacientes totais', value: overview.total },
          { label: 'Com anotações', value: overview.withNotes },
          { label: 'Contato pendente', value: overview.missingContact },
          { label: 'Aniversários (30d)', value: overview.upcomingBirthdays },
        ].map(({ label, value }) => (
          <article key={label} className="card overview-card">
            <span className="overview-card__label">{label}</span>
            <strong className="overview-card__value">{value}</strong>
          </article>
        ))}
      </section>

      <section className="card filters-card">
        <div className="filters-card__row">
          <label className="filters__search">
            <span>Buscar paciente</span>
            <input
              type="search"
              placeholder="Nome, documento ou telefone"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <p className="filters__count">
            Exibindo {filteredPatients.length} de {overview.total} pacientes
          </p>
        </div>

        <div className="filters__chips">
          {QUICK_FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`chip ${activeFilter === key ? 'chip--active' : ''}`}
              onClick={() => setActiveFilter(key)}
            >
              <span>{label}</span>
              <span className="chip__count">{filterCountMap[key]}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <header className="card__header">
          <h3>Pacientes filtrados ({filteredPatients.length})</h3>
          <p className="card__subtitle">Dados fictícios, armazenados apenas enquanto o app estiver aberto.</p>
        </header>

        <div className="table table--patients">
          <div className="table__row table__row--head table__row--patients">
            <span>Paciente</span>
            <span>Nascimento</span>
            <span>Contato</span>
            <span>Observações</span>
            <span>Insights</span>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="table__row table__row--patients table__row--empty">
              <span>Nenhum paciente encontrado com os filtros atuais.</span>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div className="table__row table__row--patients" key={patient.id}>
                <span>
                  <strong>{patient.fullName}</strong>
                  <span className="table__muted">{patient.document || 'Documento não informado'}</span>
                </span>
                <span>
                  {patient.birthDateLabel}
                  <span className="table__muted">{patient.age ? `${patient.age} anos` : 'Idade não calculada'}</span>
                </span>
                <span>
                  {patient.phone || 'Sem contato'}
                  <span className="table__muted">{patient.email || '—'}</span>
                </span>
                <span className="table__note">{patient.notes || 'Sem observações registradas.'}</span>
                <span className="status-tags">
                  {patient.hasNotes && <span className="status-tag status-tag--info">Notas</span>}
                  {!patient.hasPhone && <span className="status-tag status-tag--warning">Contato pendente</span>}
                  {patient.upcomingBirthday && <span className="status-tag status-tag--success">Aniversário em breve</span>}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}

export default PatientList
