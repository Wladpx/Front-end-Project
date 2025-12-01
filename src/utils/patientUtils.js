const sanitizeNumeric = (value = '', maxLength = 11) => value.replace(/\D/g, '').slice(0, maxLength)

export const sanitizeDocument = (value = '') => sanitizeNumeric(value, 11)

export const sanitizePhone = (value = '') => sanitizeNumeric(value, 11)

export const isValidDocument = (value = '') => sanitizeDocument(value).length === 11

export const calculateAgeFromBirthDate = (dateString) => {
  if (!dateString) return null

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  const dayDiff = today.getDate() - date.getDate()

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1
  }

  return age >= 0 ? age : null
}

