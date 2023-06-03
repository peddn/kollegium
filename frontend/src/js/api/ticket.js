import {NetworkError, HTTPError, ParsingError} from './errors.js'
import {delay} from '../utils.js'

const API_URL = process.env.API_URL

export async function ticketsOwn(token) {
  console.log('api call own')
  // TODO put pagination and order in here
  let response

  try {
    response = await fetch(
      `${API_URL}/api/tickets/own?sort[0]=createdAt:desc`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
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

  await delay(250)

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

  // post the ticket data to the create endpoint
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

  // if we get a HTTP error
  if (!response.ok) {
    let err
    try {
      err = await response.json()
    } catch (error) {
      throw new ParsingError(error.message)
    }
    // TODO: es gibt ein array von Errors. für jeden einen Fehler werfen!
    throw new HTTPError(err.error)
  }

  // if the creation was successful, we get our new ticket back
  let ticket
  try {
    ticket = await response.json()
  } catch (error) {
    throw new ParsingError(error.message)
  }
  console.log(ticket)
  return ticket
}
