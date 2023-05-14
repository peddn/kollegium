import { NetworkError, HTTPError, ParsingError } from './errors.js'

const API_URL = process.env.API_URL

export async function userLogin(identifier, password) {
  let response

  try {
    response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: identifier,
        password: password,
      }),
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

  try {
    response = await fetch(`${API_URL}/api/users/me?populate=role`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.jwt,
      },
    })
  } catch (error) {
    throw new NetworkError(error.message)
  }

  if (!response.ok) {
    const errorMessage = response.status + ': ' + response.statusText
    throw new HTTPError(errorMessage)
  }

  let user

  try {
    user = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }

  data.user = user

  return data
}
