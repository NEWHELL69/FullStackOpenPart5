import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getUser = async (token) => {
  const axiosResponse = await axios.get(`${baseUrl}/singleUser`,
  {
      headers: {
        'authorization': `Bearer ${token}`
      }
  })

  return axiosResponse.data;
}

export default {getUser}