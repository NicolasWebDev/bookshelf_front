import React, { Component } from 'react'

const ADD_BOOK_ENDPOINT = 'http://localhost:3001/book'

class BookForm extends Component {
  constructor(props) {
    super(props)
    this.state = { amazonURL: '' }
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
    this.addBookFromAmazonURL(this.state.amazonURL).then(() => {
      this.props.callback()
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Amazon URL:
          <input
            type="text"
            value={this.state.amazonURL}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default BookForm
