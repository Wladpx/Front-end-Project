import { useCallback, useMemo, useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import RegisterPatient from './components/RegisterPatient'
import Appointments from './components/AppointList'
import AppointmentDetail from './components/AppointmentDetail'
import PatientList from './components/PatientList'
import EditPatient from './components/EditPatient'
import './App.css'
import { calculateAgeFromBirthDate, sanitizeDocument, sanitizePhone } from './utils/patientUtils'

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
].map((patient) => ({
  ...patient,
  document: sanitizeDocument(patient.document),
  phone: sanitizePhone(patient.phone),
  age: calculateAgeFromBirthDate(patient.birthDate),
}))

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `registro-${Date.now()}`

function App() {
  const [view, setView] = useState('login')
  const [currentUser, setCurrentUser] = useState(null)
  const [patients, setPatients] = useState(INITIAL_PATIENTS)
  const [appointments, setAppointments] = useState([])
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)

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
    setPatients((prev) => [
      ...prev,
      {
        ...patientData,
        document: sanitizeDocument(patientData.document),
        phone: sanitizePhone(patientData.phone),
        age: calculateAgeFromBirthDate(patientData.birthDate),
        id: generateId(),
      },
    ])
  }, [])

  const handleUpdatePatient = useCallback((updatedPatient) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === updatedPatient.id
          ? {
              ...patient,
              ...updatedPatient,
              document: sanitizeDocument(updatedPatient.document),
              phone: sanitizePhone(updatedPatient.phone),
              age: calculateAgeFromBirthDate(updatedPatient.birthDate),
            }
          : patient
      )
    )
  }, [])

  const handleRegisterAppointment = useCallback((appointmentData) => {
    setAppointments((prev) => [
      ...prev,
      {
        ...appointmentData,
        id: generateId(),
        status: 'Agendada',
      },
    ])
  }, [])

  const handleSelectAppointment = useCallback((appointment) => {
    setSelectedAppointmentId(appointment.id)
    setView('appointmentDetail')
  }, [])

  const handleUpdateAppointment = useCallback((updatedAppointment) => {
    setAppointments((prev) => prev.map((appt) => (appt.id === updatedAppointment.id ? { ...appt, ...updatedAppointment } : appt)))
  }, [])

  const handleDeleteAppointment = useCallback((appointmentId) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId))
    setSelectedAppointmentId(null)
  }, [])

  const selectedAppointment = useMemo(
    () => appointments.find((appt) => appt.id === selectedAppointmentId) || null,
    [appointments, selectedAppointmentId]
  )

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

    if (view === 'appointmentsCreate') {
      return (
        <Appointments
          mode="create"
          onBack={() => handleNavigate('dashboard')}
          onSubmit={handleRegisterAppointment}
          patients={patients}
          appointments={appointments}
        />
      )
    }

    if (view === 'appointmentsList') {
      return (
        <Appointments
          mode="list"
          onBack={() => handleNavigate('dashboard')}
          onSubmit={handleRegisterAppointment}
          patients={patients}
          appointments={appointments}
          onSelect={handleSelectAppointment}
        />
      )
    }

    if (view === 'patientList') {
      return <PatientList onBack={() => handleNavigate('dashboard')} patients={patients} />
    }

    if (view === 'editPatient') {
      return (
        <EditPatient
          onBack={() => handleNavigate('dashboard')}
          onSubmit={handleUpdatePatient}
          patients={patients}
        />
      )
    }

    if (view === 'appointmentDetail' && selectedAppointment) {
      return (
        <AppointmentDetail
          appointment={selectedAppointment}
          onBack={() => handleNavigate('appointmentsList')}
          onUpdate={handleUpdateAppointment}
          onDelete={(id) => {
            handleDeleteAppointment(id)
            handleNavigate('appointmentsList')
          }}
        />
      )
    }

    return <Dashboard user={currentUser} onNavigate={handleNavigate} />
  }, [
    appointments,
    currentUser,
    handleLogin,
    handleNavigate,
    handleRegisterAppointment,
    handleDeleteAppointment,
    handleSelectAppointment,
    handleUpdateAppointment,
    handleRegisterPatient,
    handleUpdatePatient,
    patients,
    selectedAppointment,
    view,
  ])

  return <main className="layout">{content}</main>
}

export default App
