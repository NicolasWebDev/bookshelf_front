const formatServerError = error =>
  `Error: ${
    error.response
      ? error.response.data.error
      : error.request
        ? 'The server does not respond'
        : 'Other kind of error'
  }`

export { formatServerError }
