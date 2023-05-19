class NetworkError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NetworkError'
  }
}

class HTTPError extends Error {
  constructor(message) {
    super(message)
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
