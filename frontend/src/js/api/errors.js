class NetworkError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NetworkError'
  }
}

class HTTPError extends Error {
  constructor(error) {
    super(error.name + ': ' + error.message)
    // TODO: status evtuell auch als eigenschaft des Errors?
    this.name = 'HTTPError'
  }
}

class ParsingError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ParsingError'
  }
}

export {NetworkError, HTTPError, ParsingError}
