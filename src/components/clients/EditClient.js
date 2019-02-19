import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { formatPhone } from '../../helpers'

import Spinner from '../layout/Spinner'

//* STUPID USE OF REFS IN THIS PART OF THE COURSE, BUT LEAVING FOR A REFERENCE

class EditClient extends Component {
  constructor(props) {
    super(props)
    // Create refs
    this.firstNameInput = React.createRef()
    this.lastNameInput = React.createRef()
    this.emailInput = React.createRef()
    this.phoneInput = React.createRef()
    this.balanceInput = React.createRef()
  }

  onSubmit = e => {
    e.preventDefault()
    const { client, firestore, history } = this.props

    // Update Client
    const updatedClient = {
      firstName: this.firstNameInput.current.value.trim(),
      lastName: this.lastNameInput.current.value.trim(),
      email: this.emailInput.current.value.trim(),
      phone: formatPhone(this.phoneInput.current.value),
      balance: Math.round((this.balanceInput.current.value || 0) * 100),
      //* Convert to whole cents
    }

    //* Update client in Firestore
    firestore
      .update({ collection: 'clients', doc: client.id }, updatedClient)
      .then(history.push('/'))
  }

  render() {
    const { client } = this.props

    if (!client) {
      return <Spinner />
    }

    return (
      <div>
        {/* 'Back To Dashboard' BUTTON */}
        <div className="row mb-3">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        {/* Edit Client FORM */}
        <div className="card">
          <div className="card-header">Edit Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  name="firstName"
                  id="firstName"
                  required
                  ref={this.firstNameInput}
                  defaultValue={client.firstName}
                />
              </div>
              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  required
                  ref={this.lastNameInput}
                  defaultValue={client.lastName}
                />
              </div>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  required
                  ref={this.emailInput}
                  defaultValue={client.email}
                />
              </div>
              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  id="phone"
                  required
                  minLength="12"
                  placeholder="XXX-XXX-XXXX"
                  ref={this.phoneInput}
                  defaultValue={client.phone}
                />
              </div>
              {/* Balance */}
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="balance"
                  id="balance"
                  placeholder="Please include a balance"
                  ref={this.balanceInput}
                  defaultValue={(client.balance / 100).toFixed(2)}
                />
              </div>

              {/* Form Submit Button */}
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object,
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }) => ({
    client: ordered.client && ordered.client[0],
  })),
)(EditClient)
