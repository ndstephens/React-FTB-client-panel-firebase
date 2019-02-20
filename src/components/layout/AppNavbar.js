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
          {/* Client Panel logo/link to home-page */}
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>

          {/* 'hamburger' menu button (only visible on small screens) */}
          {/* displays collapsible nav menue */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleMenuOpen}
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Nav menu that is collapsible on smaller screens */}
          <div
            className={`navbar-collapse ${
              this.state.isMenuClosed ? 'collapse' : ''
            }`}
          >
            {/* Dashboard button */}
            <ul className="navbar-nav mr-auto">
              {auth.uid ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>

            {/* Links only visible when user is logged in */}
            {auth.uid ? (
              <ul className="navbar-nav ml-auto">
                {/* display user's email address */}
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                {/* Settings button */}
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    Settings
                  </Link>
                </li>
                {/* Logout button */}
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
