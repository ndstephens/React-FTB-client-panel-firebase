export const formatMoney = cents => {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const formatPhone = phoneNumber => {
  const removeDashes = phoneNumber.replace(/-/g, '')
  // limit length to 10 numbers
  let formattedPhone = removeDashes.slice(0, 10)

  if (formattedPhone.length >= 6) {
    return `${formattedPhone.slice(0, 3)}-${formattedPhone.slice(
      3,
      6,
    )}-${formattedPhone.slice(6)}`
  }
  if (formattedPhone.length >= 3) {
    return `${formattedPhone.slice(0, 3)}-${formattedPhone.slice(3)}`
  }

  return formattedPhone
}
