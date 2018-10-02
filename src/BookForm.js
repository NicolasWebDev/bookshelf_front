import React, { Component } from 'react'
import ButtonAdd from './ButtonAdd'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { formatServerError } from './util.js'
import { NotificationConsumer } from './NotificationProvider'

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
      loading: false
    }
  }

  addBookErrorHandler = error => {
    this.setState({
      loading: false
    })
    this.notify(formatServerError(error))
  }

  addBookSuccessHandler = res => {
    this.props.callback()
    this.setState({
      loading: false,
      amazonURL: ''
    })
    this.notify('Book successfully added!')
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

  render() {
    const { classes } = this.props
    return (
      <NotificationConsumer>
        {notify => {
          this.notify = notify
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
            </form>
          )
        }}
      </NotificationConsumer>
    )
  }
}

export default withStyles(styles)(BookForm)
