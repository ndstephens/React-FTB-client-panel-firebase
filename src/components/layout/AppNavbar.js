import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AppNavbar extends Component {
  state = { isMenuClosed: true }

  toggleOpen = () => {
    this.setState(({ isMenuClosed }) => ({ isMenuClosed: !isMenuClosed }))
  }

  render() {
    const { isMenuClosed } = this.state

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
            onClick={this.toggleOpen}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`navbar-collapse ${isMenuClosed ? 'collapse' : ''}`}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default AppNavbar
