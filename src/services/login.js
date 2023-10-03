import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const getToken = async (credentials) => {
  const axiosResponse = await axios.post(baseUrl, {
    username: credentials.username,
    password: credentials.password
  })

  return axiosResponse.data.token
}

export default { getToken }