import React, { Component } from 'react'
import './App.css'
import BookTable from './BookTable'

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

  componentDidMount() {
    fetch(BOOKS_ENDPOINT)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            books: result.books
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, books } = this.state
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return <BookTable books={books} />
    }
  }
}

export default App
