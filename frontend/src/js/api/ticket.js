import {NetworkError, HTTPError, ParsingError} from './errors.js'

const API_URL = process.env.API_URL

export async function ticketsOwn(token) {
  let response

  try {
    response = await fetch(`${API_URL}/api/tickets/own`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    throw new NetworkError(error.message)
  }

  if (!response.ok) {
    const errorMessage = response.status + ': ' + response.statusText
    throw new HTTPError(errorMessage)
  }

  let data
  try {
    data = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }
  return data
}

export async function create(token, ticket) {
  let response

  try {
    response = await fetch(`${API_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: {},
    })
  } catch (error) {
    throw new NetworkError(error.message)
  }

  if (!response.ok) {
    const errorMessage = response.status + ': ' + response.statusText
    throw new HTTPError(errorMessage)
  }

  let data
  try {
    data = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }
  return data
}
