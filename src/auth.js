import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
// import createHistory from 'history/createBrowserHistory'
import Spinner from './components/layout/Spinner' // change it to your custom component

const locationHelper = locationHelperBuilder({})
// const history = createHistory()

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: Spinner,
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  authenticatingSelector: ({ firebase: { auth, profile, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  // redirectAction: newLoc => dispatch => {
  //   browserHistory.replace(newLoc) // or routerActions.replace
  //   dispatch({ type: 'UNAUTHED_REDIRECT' })
  // },
})

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  AuthenticatingComponent: Spinner,
  allowRedirectBack: false,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && auth.isEmpty,
  // redirectAction: newLoc => dispatch => {
  //   browserHistory.replace(newLoc) // or routerActions.replace
  //   dispatch({ type: 'UNAUTHED_REDIRECT' })
  // },
})
