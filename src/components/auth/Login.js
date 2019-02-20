import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import Alert from '../layout/Alert'

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    const { firebase } = this.props
    const { email, password } = this.state

    firebase
      .login({
        email,
        password,
      })
      .catch(err => console.log('Login Error: ', err))
  }

  render() {
    const { authError } = this.props

    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {/* Login Error/Success Message */}
              {authError ? (
                <Alert message={authError.message} messageType="error" />
              ) : null}
              {/* Login Header */}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>
              {/* Form Body */}
              <form onSubmit={this.onSubmit}>
                {/* Email Input */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    autoFocus
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                {/* Password Input */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                {/* Login submit Button */}
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect(state => ({
    authError: state.firebase.authError,
  })),
)(Login)
