import React, { Component } from 'react'
import Notification from './Notification'
import ButtonAdd from './ButtonAdd'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { formatServerError } from './util.js'

const ADD_BOOK_ENDPOINT = '/api/book'

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

  addBookErrorHandler = error => {
    this.setState({
      loading: false,
      notification: formatServerError(error)
    })
  }

  addBookSuccessHandler = res => {
    this.props.callback()
    this.setState({
      loading: false,
      amazonURL: '',
      notification: 'Book successfully added!'
    })
  }

  addBookFromAmazonURL = amazonURL =>
    axios
      .post(ADD_BOOK_ENDPOINT, { amazonURL })
      .then(this.addBookSuccessHandler)
      .catch(this.addBookErrorHandler)

  handleChange = e => {
    this.setState({ amazonURL: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ loading: true })
    this.addBookFromAmazonURL(this.state.amazonURL)
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
