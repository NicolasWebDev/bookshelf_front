import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const columns = [
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
    width: 100,
    style: { 'text-align': 'center' }
  },
  {
    Header: 'Number of Reviews',
    accessor: 'nbReviews',
    width: 200,
    style: { 'text-align': 'center' }
  },
  {
    Header: 'Stars',
    accessor: 'stars',
    width: 100,
    style: { 'text-align': 'center' }
  },
  {
    Header: 'Tags',
    accessor: 'tags',
    width: 200
  }
]

export default ({ books }) => (
  <ReactTable data={books} columns={columns} className="-striped -highlight" />
)
