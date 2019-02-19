import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { formatMoney } from '../../helpers'

import Spinner from '../layout/Spinner'

class ClientDetails extends Component {
  state = {
    showBalanceUpdateInput: false,
    balanceUpdateAmount: 0,
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  toggleBalanceUpdateInput = () => {
    this.setState(prevState => ({
      showBalanceUpdateInput: !prevState.showBalanceUpdateInput,
      balanceUpdateAmount: (this.props.client.balance / 100).toFixed(2),
    }))
  }

  onBalanceUpdateSubmit = e => {
    e.preventDefault()

    const { client, firestore } = this.props
    const { balanceUpdateAmount } = this.state

    const clientUpdate = {
      balance: Math.round((balanceUpdateAmount || 0) * 100),
      //* Convert to whole cents
    }

    //* Update in Firestore (second param object 'clientUpdate' only needs to include values that are updating (in this case 'balance'))
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)

    // Hide input
    this.setState(prevState => ({
      showBalanceUpdateInput: !prevState.showBalanceUpdateInput,
    }))
  }

  onDeleteClick = () => {
    const { client, firestore, history } = this.props

    firestore
      .delete({ collection: 'clients', doc: client.id })
      .then(history.push('/'))
  }

  render() {
    const { client } = this.props
    const { showBalanceUpdateInput, balanceUpdateAmount } = this.state

    if (!client) {
      return <Spinner />
    }

    return (
      <div>
        {/* HEADER */}
        <div className="row mb-3">
          {/* 'Back to Dashboard' BUTTON */}
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
          {/* EDIT AND DELETE BUTTONS */}
          <div className="col-md-6">
            <div className="btn-group float-right">
              <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                Edit
              </Link>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>

        <hr />

        {/* BODY */}
        <div className="card">
          {/* CLIENT NAME */}
          <h3 className="card-header">
            {client.firstName} {client.lastName}
          </h3>

          <div className="card-body">
            <div className="row">
              {/* CLIENT ID */}
              <div className="col-md-8 col-sm-6">
                <h4>
                  Client ID: <span className="text-secondary">{client.id}</span>
                </h4>
              </div>

              {/* BALANCE */}
              <div className="col-md-4 col-sm-6">
                <h3 className="pull-right">
                  Balance:{' '}
                  <span
                    className={
                      client.balance > 0 ? 'text-danger' : 'text-success'
                    }
                  >
                    {formatMoney(client.balance)}
                  </span>{' '}
                  {/*//* EDIT BALANCE BUTTON */}
                  {/* clicking pencil icon toggles boolean value of 'showBalanceUpdateInput' in local state, which controls display of input form for editing balance (seen below)*/}
                  <small
                    onClick={this.toggleBalanceUpdateInput}
                    style={{ color: 'var(--primary)', cursor: 'pointer' }}
                  >
                    <i className="fas fa-pencil-alt" />
                  </small>
                </h3>

                {/*//* BALANCE EDIT FORM (initially hidden) */}
                {/* only display input form if 'showBalanceUpdateInput' is toggled to 'true' from clicking pencil icon */}
                {showBalanceUpdateInput ? (
                  <form onSubmit={this.onBalanceUpdateSubmit}>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        name="balanceUpdateAmount"
                        placeholder="Add New Balance"
                        onChange={this.onChange}
                        value={balanceUpdateAmount}
                      />
                      <div className="input-group-append">
                        <input
                          type="submit"
                          value="Update"
                          className="btn btn-outline-dark"
                        />
                      </div>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>

            <hr />

            {/* EMAIL AND PHONE */}
            <ul className="list-group">
              <li className="list-group-item">Contact Email: {client.email}</li>
              <li className="list-group-item">Contact Phone: {client.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object,
}

export default compose(
  firestoreConnect(props => [
    //* pass in 'props' so we can get client id from the URL
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
    //* 'storeAs' adds a new property w/ the key 'client' to state in Redux where the returned item will be stored
  ]),
  connect(({ firestore: { ordered } }) => ({
    client: ordered.client && ordered.client[0],
    //* if 'ordered.client' exists then grab first (and only) value in array
  })),
)(ClientDetails)

//? "{ firestore: {ordered} }" is simply destructuring out 'ordered' property from 'firestore' property in state (state.firestore.ordered)
