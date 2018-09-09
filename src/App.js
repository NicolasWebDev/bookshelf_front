import React, { Component, Fragment } from 'react'
import './App.css'
import BookTable from './BookTable'
import BookForm from './BookForm'

const BOOKS_ENDPOINT = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    }
  }

  fetchBooks = () => {
    fetch(BOOKS_ENDPOINT)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            books: result.books
          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.fetchBooks()
  }

  render() {
    const { error, isLoaded, books } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <Fragment>
          <h2>Add a book from Amazon</h2>
          <BookForm callback={this.fetchBooks} />
          <h2>Books</h2>
          <BookTable books={books} />
        </Fragment>
      )
    }
  }
}

export default App
