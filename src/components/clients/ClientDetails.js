import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

class ClientDetails extends Component {
  state = {
    showBalanceUpdateInput: false,
    balanceUpdateAmount: '',
  }

  toggleBalanceUpdateInput = () => {
    this.setState({
      showBalanceUpdateInput: !this.state.showBalanceUpdateInput,
      balanceUpdateAmount: parseFloat(this.props.client.balance).toFixed(2),
    })
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onBalanceUpdateSubmit = e => {
    e.preventDefault()

    const { client, firestore } = this.props
    const { balanceUpdateAmount } = this.state

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount),
    }

    // Update in firestore
    firestore.update({ collection: 'clients', doc: client.id }, clientUpdate)
    // Hide input
    this.setState({
      showBalanceUpdateInput: !this.state.showBalanceUpdateInput,
    })
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
    } else {
      return (
        <div>
          {/* HEADER */}
          <div className="row mb-3">
            {/* RETURN TO DASHBOARD */}
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
                    Client ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>

                {/* BALANCE */}
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{' '}
                    <span
                      className={
                        parseFloat(client.balance) > 0
                          ? 'text-danger'
                          : 'text-success'
                      }
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{' '}
                    {/* clicking pencil icon toggles boolean value of 'showBalanceUpdateInput', which controls display of input form for editing balance (seen below)*/}
                    <small>
                      <a href="#!" onClick={this.toggleBalanceUpdateInput}>
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>

                  {/* only display input form if 'showBalanceUpdateInput' is toggled to 'true' from clicking pencil icon */}
                  {showBalanceUpdateInput ? (
                    <form onSubmit={this.onBalanceUpdateSubmit}>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name="balanceUpdateAmount"
                          placeholder="Add New Balance"
                          value={balanceUpdateAmount}
                          onChange={this.onChange}
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
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
}

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0],
  })),
)(ClientDetails)
