import {
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
} from '../actions/types'

const initialState = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: !state.disableBalanceOnAdd,
      }
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: !state.disableBalanceOnEdit,
      }
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: !state.allowRegistration,
      }
    default:
      return state
  }
}
