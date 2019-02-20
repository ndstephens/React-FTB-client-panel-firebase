import {
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
} from '../actions/types'

// const initialState = {
//   allowRegistration: false,
//   disableBalanceOnAdd: true,
//   disableBalanceOnEdit: false,
// }

export default (state = {}, action) => {
  switch (action.type) {
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload,
      }
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload,
      }
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload,
      }
    default:
      return state
  }
}
