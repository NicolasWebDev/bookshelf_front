import React from 'react'
import _ from 'lodash'

const columns = ['title', 'author', 'priority', 'nbReviews', 'stars', 'tags']

const BookTable = ({ books }) => (
  <div>
    <h1>My Book Table</h1>
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th>{_.startCase(column)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.title}>
            {columns.map(column => (
              <td>{book[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default BookTable
