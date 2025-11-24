import { useCallback, useMemo, useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import RegisterPatient from './components/RegisterPatient'
import './App.css'

const INITIAL_PATIENTS = [
  {
    id: 'paciente-001',
    fullName: 'Lívia Andrade',
    document: '123.456.789-00',
    birthDate: '1992-05-18',
    phone: '(81) 98888-1111',
    notes: 'Alergia a penicilina.',
  },
  {
    id: 'paciente-002',
    fullName: 'Carlos Souza',
    document: '987.654.321-00',
    birthDate: '1988-10-03',
    phone: '(81) 97777-2222',
    notes: 'Prefere consultas no período da tarde.',
  },
]

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `paciente-${Date.now()}`

function App() {
  const [view, setView] = useState('login')
  const [currentUser, setCurrentUser] = useState(null)
  const [patients, setPatients] = useState(INITIAL_PATIENTS)

  const handleLogin = useCallback((user) => {
    setCurrentUser(user)
    setView('dashboard')
  }, [])

  const handleNavigate = useCallback((nextView) => {
    if (nextView === 'login') {
      setCurrentUser(null)
      setView('login')
      return
    }
    setView(nextView)
  }, [])

  const handleRegisterPatient = useCallback((patientData) => {
    setPatients((prev) => [...prev, { ...patientData, id: generateId() }])
  }, [])

  const content = useMemo(() => {
    if (view === 'login') {
      return <Login onSuccess={handleLogin} />
    }

    if (view === 'registerPatient') {
      return (
        <RegisterPatient
          onBack={() => handleNavigate('dashboard')}
          onSubmit={handleRegisterPatient}
          patients={patients}
        />
      )
    }

    return <Dashboard user={currentUser} onNavigate={handleNavigate} />
  }, [currentUser, handleLogin, handleNavigate, handleRegisterPatient, patients, view])

  return <main className="layout">{content}</main>
}

export default App
