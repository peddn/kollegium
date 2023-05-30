import {NetworkError, HTTPError, ParsingError} from './errors.js'

const API_URL = process.env.API_URL

export async function userLogin(identifier, password) {
  let response

  // get the jwt und user data form the auth process
  let data
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
  try {
    data = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }

  // fetch the user and populate with extra data
  let user
  try {
    response = await fetch(`${API_URL}/api/users/me?populate[0]=role,avatar`, {
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
  try {
    user = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }

  // overwrite the old user with the updated user
  data.user = user

  return data
}
