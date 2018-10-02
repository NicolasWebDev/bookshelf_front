import React, { Component } from 'react'
import { NotificationConsumer } from './NotificationProvider'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import axios from 'axios'
import { formatServerError } from './util.js'

const updateBookPath = bookId => `/api/books/${bookId}`

const sortUndefinedAfterText = (a, b) => {
  if (a && b) return a < b ? 1 : -1
  if (!a && !b) return 0
  if (a && !b) return 1
  if (!a && b) return -1
}

export default class BookTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amazonURL: '',
      loading: false
    }
  }

  renderPriority = (data, cellInfo) => (
    <div
      style={{ backgroundColor: '#fafafa' }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        this.updateBookPriority(cellInfo.row._id, e.target.innerHTML)
      }}
    >
      {data[cellInfo.index][cellInfo.column.id]}
    </div>
  )

  updateBookPriority = (bookId, priority) => {
    axios
      .put(updateBookPath(bookId), { priority })
      .then(() => {
        this.notify('Priority successfully changed!')
      })
      .catch(error => {
        this.notify(formatServerError(error))
      })
  }

  render() {
    const { books } = this.props
    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        width: 50
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Author',
        accessor: 'author',
        width: 200
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        width: 80,
        style: { textAlign: 'center' },
        sortMethod: sortUndefinedAfterText,
        Cell: this.renderPriority.bind(null, books)
      },
      {
        Header: 'Number of Reviews',
        accessor: 'nbReviews',
        width: 200,
        style: { textAlign: 'center' }
      },
      {
        Header: 'Stars',
        accessor: 'stars',
        width: 100,
        style: { textAlign: 'center' }
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        width: 200
      }
    ]

    return (
      <NotificationConsumer>
        {notify => {
          this.notify = notify
          return (
            <ReactTable
              data={books}
              columns={columns}
              className="-striped -highlight"
              defaultSorted={[{ id: 'priority', desc: true }]}
              defaultPageSize={books.length}
              showPagination={false}
            />
          )
        }}
      </NotificationConsumer>
    )
  }
}
