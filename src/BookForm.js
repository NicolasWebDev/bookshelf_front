import React, { Component } from 'react'
import Notification from './Notification'
import ButtonAdd from './ButtonAdd'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const ADD_BOOK_ENDPOINT = 'http://localhost:3001/book'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: '80%'
  }
})

class BookForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amazonURL: '',
      loading: false,
      notification: ''
    }
  }

  addBookFromAmazonURL = amazonURL =>
    fetch(ADD_BOOK_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ amazonURL }),
      headers: { 'Content-Type': 'application/json' }
    })

  handleChange = e => {
    this.setState({ amazonURL: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    this.addBookFromAmazonURL(this.state.amazonURL).then(() => {
      this.props.callback()
      this.setState({
        loading: false,
        amazonURL: '',
        notification: 'Book successfully added!'
      })
    })
  }

  clearNotification = () => {
    this.setState({ notification: '' })
  }

  render() {
    const { classes } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="amazonURL"
          label="Amazon URL"
          className={classes.textField}
          value={this.state.amazonURL}
          onChange={this.handleChange}
        />
        <ButtonAdd
          loading={this.state.loading}
          handleClick={this.handleSubmit}
        />
        <Notification
          closeCallback={this.clearNotification}
          message={this.state.notification}
        />
      </form>
    )
  }
}

export default withStyles(styles)(BookForm)
