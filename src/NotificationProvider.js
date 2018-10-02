import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const NotificationContext = React.createContext()

export class NotificationProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
  }

  notify = message => {
    this.setState({
      message
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({
      message: ''
    })
  }

  render() {
    const { children } = this.props

    return (
      <NotificationContext.Provider value={this.notify}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={!!this.state.message}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={this.state.message}
        />
        {children}
      </NotificationContext.Provider>
    )
  }
}

export const NotificationConsumer = NotificationContext.Consumer
