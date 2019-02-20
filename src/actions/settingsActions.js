import {
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
} from './types'

export const toggleDisableBalanceOnAdd = () => ({
  type: DISABLE_BALANCE_ON_ADD,
})

export const toggleDisableBalanceOnEdit = () => ({
  type: DISABLE_BALANCE_ON_EDIT,
})

export const toggleAllowRegistration = () => ({
  type: ALLOW_REGISTRATION,
})
