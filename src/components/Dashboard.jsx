const quickActions = [
  { key: 'registerPatient', title: 'Cadastrar Paciente', description: 'Crie fichas com poucos cliques.' },
  { key: 'patientList', title: 'Lista de Pacientes', description: 'Visão geral com filtros rápidos.' },
  { key: 'editPatient', title: 'Editar Paciente', description: 'Atualize contatos e histórico.' },
  { key: 'scheduleVisit', title: 'Cadastrar Consulta', description: 'Organize agendas médicas.' },
  { key: 'visitList', title: 'Lista de Consultas', description: 'Acompanhe consultas futuras.' },
  { key: 'editAppointments', title: 'Editar Consultas', description: 'Edite ou exclua consultas específicas.' },
]

export default function Dashboard({ user, onNavigate }) {
  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Bem-vindo(a)</p>
          <h2>{user?.name || 'Administrador'}</h2>
          <p className="page-header__subtitle">
            Central da clínica para ações rápidas. Cadastro de pacientes e consultas funcionando em memória.
          </p>
        </div>
        <button className="button" onClick={() => onNavigate('login')}>
          Sair
        </button>
      </header>

      <section className="grid">
        {quickActions.map(({ key, title, description, disabled }) => (
          <article
            key={key}
            className={`card card--action ${disabled ? 'card--disabled' : ''}`}
            onClick={() => {
              if (disabled) return
              if (key === 'registerPatient') onNavigate('registerPatient')
              if (key === 'patientList') onNavigate('patientList')
              if (key === 'scheduleVisit') onNavigate('appointmentsCreate')
              if (key === 'visitList' || key === 'editAppointments') onNavigate('appointmentsList')
              if (key === 'editPatient') onNavigate('editPatient')
            }}
          >
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="card__tag">{disabled ? 'Em breve' : 'Disponível'}</span>
          </article>
        ))}
      </section>
    </>
  )
}
