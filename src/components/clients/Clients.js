import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

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

    if (clients) {
      return (
        <div>
          {/* HEADER */}
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Owed:{' '}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          {/* BODY / TABLE */}
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {clients
                // Sort in alphabetical order first by first name
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
                        className="btn btn-secondary btn-sm">
                        <i className="fas fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <Spinner />
    }
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
