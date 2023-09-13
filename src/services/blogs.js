import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const postBlog = async (blog, token) => {
  const request = await axios.post(
    baseUrl, 
    { ...blog },
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
  );

  return request.data;
}

export default { postBlog }