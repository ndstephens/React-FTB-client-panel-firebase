import {
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
} from './types'

export const toggleAllowRegistration = () => ({
  type: ALLOW_REGISTRATION,
  payload: toggleValueInLocalStorage('allowRegistration'),
})

export const toggleDisableBalanceOnAdd = () => ({
  type: DISABLE_BALANCE_ON_ADD,
  payload: toggleValueInLocalStorage('disableBalanceOnAdd'),
})

export const toggleDisableBalanceOnEdit = () => ({
  type: DISABLE_BALANCE_ON_EDIT,
  payload: toggleValueInLocalStorage('disableBalanceOnEdit'),
})

//* toggle the current value in Local Storage, return the boolean value to be used as the action payload to update the same property in state
const toggleValueInLocalStorage = setting => {
  const settings = JSON.parse(localStorage.getItem('settings'))
  settings[setting] = !settings[setting]
  localStorage.setItem('settings', JSON.stringify(settings))
  return settings[setting]
}
