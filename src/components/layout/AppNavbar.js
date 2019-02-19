import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class AppNavbar extends Component {
  state = {
    isMenuClosed: true,
  }

  toggleMenuOpen = () => {
    this.setState(({ isMenuClosed }) => ({ isMenuClosed: !isMenuClosed }))
  }

  onLogoutClick = () => {
    const { firebase } = this.props
    firebase.logout()
  }

  render() {
    const { auth } = this.props

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>

          {/* 'hamburger' menu button for narrow screens */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleMenuOpen}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`navbar-collapse ${
              this.state.isMenuClosed ? 'collapse' : ''
            }`}
          >
            <ul className="navbar-nav mr-auto">
              {auth.uid ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {auth.uid ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={this.onLogoutClick}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    )
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect(state => ({
    auth: state.firebase.auth,
  })),
)(AppNavbar)
