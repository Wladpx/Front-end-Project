import { useState } from 'react'

const adminCredentials = {
  email: 'admin@clinica.com',
  password: '123456',
}

export default function Login({ onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValid =
      formData.email === adminCredentials.email &&
      formData.password === adminCredentials.password

    if (!isValid) {
      setError('Credenciais inválidas. Utilize admin@clinica.com / 123456')
      return
    }

    setError('')
    onSuccess({ name: 'Administrador', email: adminCredentials.email })
  }

  return (
    <div className="card card--centered">
      <header className="card__header">
        <p className="card__badge">Clínica Vida+</p>
        <h1>Acesse o painel</h1>
        <p className="card__subtitle">
          Use as credenciais padrão para testar o fluxo sem backend.
        </p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__group">
          <span>Email corporativo</span>
          <input
            type="email"
            name="email"
            placeholder="admin@clinica.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="form__group">
          <span>Senha</span>
          <input
            type="password"
            name="password"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="form__feedback form__feedback--error">{error}</p>}

        <button type="submit" className="button button--primary">
          Entrar
        </button>
      </form>
    </div>
  )
}

