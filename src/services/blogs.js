import axios from 'axios'
const baseUrl = '/api/blogs'

const getBlogs = async () => {
  const request = await axios.get( baseUrl )
  return request.data
}

const postBlog = async (blog, token) => {
  const request = await axios.post(
    baseUrl,
    { ...blog },
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
  )

  return request.data
}

const putBlog = async (id, blog, token) => {
  const request = await axios.put(
    `${baseUrl}/${id}`,
    { ...blog },
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
  )

  return request.data
}

const deleteBlog = async (id, token) => {
  await axios.delete(
    `${baseUrl}/${id}`,
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
  )
}

export default { postBlog, putBlog, deleteBlog, getBlogs }