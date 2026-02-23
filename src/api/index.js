import axios from 'axios'

const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true
})

function login(payload) {
  return api.post('/auth/login', payload)
}

function logout() {
  return api.post('/auth/logout')
}

// Search
async function fetchSearchData(url, searchParams) {
  const { data: searchData } = await api.get(url, { params: searchParams })
  const { data: nextSearchData } = await api.get(searchData.next)

  return {
    ...searchData,
    next: nextSearchData.resultIds.length ? searchData.next : ''
  }
}

async function fetchDogs(resultIds) {
  const { data } = await api.post('/dogs', resultIds)
  return data
}

async function fetchMatchedDogId(payload) {
  const { data } = await api.post('/dogs/match', payload)
  return data.match
}

export {
  login,
  logout,
  fetchSearchData,
  fetchDogs,
  fetchMatchedDogId
}
