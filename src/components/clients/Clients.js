import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Spinner from '../layout/Spinner'

class Clients extends Component {
  state = {
    totalOwed: null,
  }

  static getDerivedStateFromProps(props, state) {
    const { clients } = props
    if (clients) {
      // Add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString())
      }, 0)
      return { totalOwed: total }
    }
    return null
  }

  render() {
    const { clients } = this.props
    const { totalOwed } = this.state

    if (!clients) {
      return <Spinner />
    }

    return (
      <div>
        {/* HEADER */}
        <div className="row">
          {/* 'Clients' title */}
          <div className="col-md-6">
            <h2>
              <i className="fas fa-users" /> Clients
            </h2>
          </div>
          {/* 'Total Owed: $...' */}
          <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Owed:{' '}
              <span className="text-primary">
                ${parseFloat(totalOwed).toFixed(2)}
              </span>
            </h5>
          </div>
        </div>

        {/* TABLE */}
        <table className="table table-striped">
          {/* TABLE__HEADERS */}
          <thead className="thead-inverse">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th />
            </tr>
          </thead>

          {/* TABLE__BODY */}
          <tbody>
            {clients
              // Sort in alphabetical order by first name
              .sort((a, b) => {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                  return -1
                }
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                  return 1
                }
                return 0
              })
              .map(client => (
                <tr key={client.id}>
                  <td>
                    {client.firstName} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>${parseFloat(client.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array,
}

export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients,
  })),
)(Clients)
