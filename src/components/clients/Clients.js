import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { formatMoney } from '../../helpers'

import Spinner from '../layout/Spinner'

class Clients extends Component {
  render() {
    const { clients } = this.props

    if (!clients) {
      return <Spinner />
    }

    const totalOwed = clients.reduce(
      (total, client) => total + client.balance,
      0,
    )

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
              <span className="text-primary">{formatMoney(totalOwed)}</span>
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
            {clients.map(client => (
              <tr key={client.id}>
                <td>
                  {client.firstName} {client.lastName}
                </td>
                <td>{client.email}</td>
                <td>{formatMoney(client.balance)}</td>
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
  firestoreConnect([{ collection: 'clients', orderBy: 'firstName' }]),
  connect(state => ({
    clients: state.firestore.ordered.clients,
  })),
)(Clients)
