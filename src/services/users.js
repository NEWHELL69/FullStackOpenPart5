import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (token) => {
  const axiosResponse = await axios.get(`${baseUrl}/singleUser`,
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })

  return axiosResponse.data
}

export default { getUser }