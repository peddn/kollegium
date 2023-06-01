import {NetworkError, HTTPError, ParsingError} from './errors.js'

const API_URL = process.env.API_URL

export async function ticketsOwn(token) {
  console.log('api call own')
  // TODO put pagination and order in here
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
  console.log('DATA: ', data)
  return data
}

export async function ticketsManage(token) {
  // TODO get all tickets with pagination and order
  console.log('api call manage')
}

export async function ticketsOpen(token) {
  console.log('api call open')
}

export async function ticketsAssigned(token) {
  console.log('api call assigned')
}

export async function ticketsCreate(token, data) {
  console.log('api call create')
  let response

  try {
    response = await fetch(`${API_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
  } catch (error) {
    throw new NetworkError(error.message)
  }

  if (!response.ok) {
    const errorMessage = response.status + ': ' + response.statusText
    throw new HTTPError(errorMessage)
  }

  let ticket
  try {
    ticket = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }
  console.log(ticket)
  return ticket
}
