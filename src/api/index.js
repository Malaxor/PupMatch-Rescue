import { api } from './client'

function handleError (error, message) {
  if (error.response) {
    // Server responded with a status code outside 2xx
    throw new Error(`${message}: ${error.response.data?.message || error.response.status}`)
  } else if (error.request) {
    // Request was made but no response received
    throw new Error(`${message}: No response from server`)
  } else {
    // Something else happened
    throw new Error(`${message}: ${error.message}`)
  }
}

async function login (payload) {
  try {
    return await api.post('/auth/login', payload)
  } catch (error) {
    handleError(error, 'Login failed')
  }
}

async function logout () {
  try {
    return await api.post ('/auth/logout')
  } catch (error) {
    handleError(error, 'Logout failed')
  }
}

async function fetchSearchData (url, searchParams) {
  try {
    const { data: searchData } = await api.get(url, { params: searchParams })
    const { data: nextSearchData } = await api.get(searchData.next)

    return {
      ...searchData,
      next: nextSearchData.resultIds.length ? searchData.next : ''
    }
  } catch (error) {
    handleError(error, 'Fetching search data failed')
  }
}

async function fetchDogs (resultIds) {
  try {
    const { data } = await api.post('/dogs', resultIds)
    return data
  } catch (error) {
    handleError(error, 'Fetching dogs failed')
  }
}

async function fetchMatchedDogId (payload) {
  try {
    const { data } = await api.post('/dogs/match', payload)
    return data.match
  } catch (error) {
    handleError(error, 'Fetching matched dog ID failed')
  }
}

export {
  login,
  logout,
  fetchSearchData,
  fetchDogs,
  fetchMatchedDogId
}
