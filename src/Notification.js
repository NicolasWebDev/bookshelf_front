import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const handleClose = (event, reason, closeCallback) => {
  if (reason === 'clickaway') {
    return
  }

  closeCallback()
}

const Notification = ({ message, closeCallback }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}
    open={!!message}
    autoHideDuration={6000}
    onClose={(e, reason) => handleClose(e, reason, closeCallback)}
    ContentProps={{
      'aria-describedby': 'message-id'
    }}
    message={message}
  />
)

export default Notification
