import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const sortUndefinedAfterText = (a, b) => {
  if (a && b) return a < b ? 1 : -1
  if (!a && !b) return 0
  if (a && !b) return 1
  if (!a && b) return -1
}

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
    sortMethod: sortUndefinedAfterText
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

export default ({ books }) => (
  <ReactTable
    data={books}
    columns={columns}
    className="-striped -highlight"
    defaultSorted={[{ id: 'priority', desc: true }]}
    defaultPageSize={books.length}
    showPagination={false}
  />
)
