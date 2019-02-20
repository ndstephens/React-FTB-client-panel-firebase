import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  toggleAllowRegistration,
  toggleDisableBalanceOnAdd,
  toggleDisableBalanceOnEdit,
} from '../../actions/settingsActions'

const Settings = props => {
  const {
    toggleAllowRegistration,
    toggleDisableBalanceOnAdd,
    toggleDisableBalanceOnEdit,
    settings: { allowRegistration, disableBalanceOnAdd, disableBalanceOnEdit },
  } = props

  return (
    <Fragment>
      {/* Back To Dashboard BUTTON */}
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left" /> Back To Dashboard
          </Link>
        </div>
      </div>

      {/* Edit Settings FORM */}
      <div className="card">
        <div className="card-header">Edit Settings</div>
        <div className="card-body">
          <form>
            {/* Allow Registration */}
            <div className="form-group">
              <label htmlFor="allowRegistration">Allow Registration</label>{' '}
              <input
                type="checkbox"
                name="allowRegistration"
                id="allowRegistration"
                checked={allowRegistration}
                onChange={toggleAllowRegistration}
              />
            </div>

            {/* Disable Balance On Add */}
            <div className="form-group">
              <label htmlFor="disableBalanceOnAdd">
                Disable Balance On Add
              </label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                id="disableBalanceOnAdd"
                checked={disableBalanceOnAdd}
                onChange={toggleDisableBalanceOnAdd}
              />
            </div>

            {/* Disable Balance On Edit */}
            <div className="form-group">
              <label htmlFor="disableBalanceOnEdit">
                Disable Balance On Edit
              </label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                id="disableBalanceOnEdit"
                checked={disableBalanceOnEdit}
                onChange={toggleDisableBalanceOnEdit}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  toggleAllowRegistration: PropTypes.func.isRequired,
  toggleDisableBalanceOnAdd: PropTypes.func.isRequired,
  toggleDisableBalanceOnEdit: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    auth: state.firebase.auth,
    settings: state.settings,
  }),
  {
    toggleAllowRegistration,
    toggleDisableBalanceOnAdd,
    toggleDisableBalanceOnEdit,
  },
)(Settings)
