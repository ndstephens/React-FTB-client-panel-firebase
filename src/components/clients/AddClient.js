import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { formatPhone } from '../../helpers'

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }

  handlePhone = e =>
    this.setState({ phone: formatPhone(e.target.value.trimLeft()) })

  onChange = e => this.setState({ [e.target.name]: e.target.value.trimLeft() })

  onSubmit = e => {
    e.preventDefault()
    const { firestore, history } = this.props

    const newClient = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email.trim(),
      phone: this.state.phone.trim(),
      balance: Math.round((this.state.balance || 0) * 100),
      //* Convert to whole cents
    }

    //* Add 'newClient' to Firestore and redirect to the home page
    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'))
  }

  render() {
    return (
      <div>
        {/* Back Button */}
        <div className="row mb-3">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        {/* Add Client FORM */}
        <div className="card">
          <div className="card-header">Add Client</div>
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
                  onChange={this.onChange}
                  value={this.state.firstName}
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
                  onChange={this.onChange}
                  value={this.state.lastName}
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
                  onChange={this.onChange}
                  value={this.state.email}
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
                  minLength={12}
                  placeholder="XXX-XXX-XXXX"
                  onChange={this.handlePhone}
                  value={this.state.phone}
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
                  onChange={this.onChange}
                  value={this.state.balance}
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

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
}

export default firestoreConnect()(AddClient)
