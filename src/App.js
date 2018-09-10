import React, { Component, Fragment } from 'react'
import './App.css'
import BookTable from './BookTable'
import BookForm from './BookForm'
import axios from 'axios'
import { formatServerError } from './util.js'

const BOOKS_ENDPOINT = 'http://localhost:3001/books'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: '',
      isLoaded: false,
      books: []
    }
  }

  fetchBooks = () => {
    axios
      .get(BOOKS_ENDPOINT)
      .then(({ data }) => {
        this.setState({
          isLoaded: true,
          books: data.books
        })
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          errorMessage: formatServerError(error)
        })
      })
  }

  componentDidMount() {
    this.fetchBooks()
  }

  render() {
    const { errorMessage, isLoaded, books } = this.state
    if (errorMessage) {
      return <div>{errorMessage}</div>
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
