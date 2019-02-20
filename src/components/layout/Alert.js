import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ message, messageType }) => {
  return (
    <div
      className={`alert
        ${messageType === 'success' && 'alert-success'}
        ${messageType === 'error' && 'alert-danger'}`}
    >
      {message}
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
}

export default Alert
