import axios from 'axios'
import { getToken } from './login.js';
const baseUrl = 'http://localhost:3003/api/users'

export const getUser = async (credentials) => {
    const token = await getToken(credentials);

    const request = await axios.get(`${baseUrl}/singleUser`,
    {
        headers: {
          'authorization': `Bearer ${token}`
        }
    })

    return request.data;
}