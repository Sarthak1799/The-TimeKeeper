import axios from 'axios'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const login = async credentials => {
    const request = await axios.post('/api/login',credentials)
    return request.data
}

const signup = async body => {
  const savedUser = await axios.post('/api/users/signup',body)
  return savedUser.data
}

const getAll = async ({ username }) => {
  const header = {
    headers: { Authorization: token }
  }
  const response = await axios.get(`/api/users/${username}/zones`,header)
  return response.data
}

const createZone = async ({username},zone) => {
  const header = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`/api/users/${username}/zones`, zone, header)
  return response.data
}

const removeZone = async ({username},zone) => {
  const header  = {
    headers: { Authorization: token }
  }
  await axios.delete(`/api/users/${username}/zones/${zone.id}`,header)
}

export default {setToken, login, signup, getAll, createZone,removeZone}

