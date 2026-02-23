import axios from 'axios'

const baseURL = 'https://frontend-take-home-service.fetch.com'
const config = { withCredentials: true }

function login (payload) {
  return axios.post(`${baseURL}/auth/login`, payload, config)
}

function logout () {
  return axios.post(`${baseURL}/auth/logout`, {}, config)
} 

async function fetchSearchData (url, searchParams) { 
  const { data: searchData } = await axios.get(`${baseURL}${url}`, { ...config, params: searchParams })
  const { data: nextSearchData } = await axios.get(`${baseURL}${searchData.next}`, config)
  
  return {
    ...searchData,
    next: nextSearchData.resultIds.length ? searchData.next : ''
  }
}

async function fetchDogs (resultIds) {
  const { data } = await axios.post(`${baseURL}/dogs`, resultIds, config)
  return data
}

async function fetchMatchedDogId (payload) {
  const { data: { match: matchedDogId } } = await axios.post(`${baseURL}/dogs/match`, payload, config)
  return matchedDogId
}

export {
  login,
  logout,
  fetchSearchData,
  fetchDogs,
  fetchMatchedDogId
}
