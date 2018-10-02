import React, { Component, StrictMode } from 'react'
import './App.css'
import BookTable from './BookTable'
import BookForm from './BookForm'
import axios from 'axios'
import { formatServerError } from './util.js'
import { NotificationProvider } from './withNotification'

const readBooksPath = '/api/books'

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
      .get(readBooksPath)
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
        <StrictMode>
          <NotificationProvider>
            <h2>Add a book from Amazon</h2>
            <BookForm callback={this.fetchBooks} />
            <h2>Books</h2>
            <BookTable books={books} />
          </NotificationProvider>
        </StrictMode>
      )
    }
  }
}

export default App
