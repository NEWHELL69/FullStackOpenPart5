import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

export const getToken = async (credentials) => {
  const request = await axios.post(baseUrl, {
    username: credentials.username,
    password: credentials.password
  })

  return request.data.token;
}
