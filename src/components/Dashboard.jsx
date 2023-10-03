import { useState, useEffect, useRef } from 'react'
import usersService from '../services/users'
import Blog from './Blog/Blog'
import AddBlog from './AddBlog'
import blogService from '../services/blogs.js'
import Togglable from './togglable'
import PropTypes from 'prop-types'

const Dashboard = ({ token, handleMessage, clearToken }) => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState(null)
  const addBlogRef = useRef()

  const sortFunc = (a, b) => a.likes > b.likes ? -1 : 1

  const addNewBlog = (blog) => {
    blogService.postBlog(blog, token)
      .then((blog) => {
        addBlogRef.current.toggleVisibility()
        setBlogs(blogs => [blog, ...blogs].sort(sortFunc))
        handleMessage(`Added new blog, blog title ${blog.title}, blog author ${blog.author}, 200`)
      })
      .catch((e) => {
        handleMessage('Blog could not be added, 500')
        console.log(e)
      })
  }

  const incrementLike = (id) => {
    blogService.putBlog(id, { $inc: { 'likes': 1 } }, token).then((updatedBlog) => {
      setBlogs(blogs => {
        return blogs.map((blog) => {
          if(blog.id === updatedBlog.id){
            return updatedBlog
          }

          return blog
        }).sort(sortFunc)
      })

      handleMessage('Blog liked, 200')
    }).catch((e) => {
      handleMessage('Some problem encountered in incrementing the likes, 200')
      console.log(e)
    })
  }

  const removeBlog = (blog) => {
    if(!window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      return
    }

    blogService.deleteBlog(blog.id, token).then(() => {
      const index = blogs.map(blog => blog.id).indexOf(blog.id)
      setBlogs(blogs => {
        const updatesBlogs = [...blogs]
        if (index > -1) {
          updatesBlogs.splice(index, 1)
        }
        return updatesBlogs
      })
      handleMessage('Operation successful, 204')
    }).catch((e) => {
      console.log(e)
      handleMessage('Operation unsuccessful, 204')
    })
  }

  const handleLogout = () => {
    setUser(null)
    clearToken()
    handleMessage('User logged out, 200')
  }

  useEffect(() => {
    usersService.getUser(token).then((user) => {
      setUser(user)
      handleMessage('You are logged in, 200')
    }).catch((e) => {
      setUser(null)
      clearToken()
      handleMessage('Something wrong with the token, 400')
      console.log(e)
    })

    blogService.getBlogs().then((blogs) => {
      setBlogs(blogs.sort(sortFunc))
    }).catch((e) => {
      setBlogs(null)
      handleMessage('Something wrong with getting the blogs')
    })
  }, [token])

  const Jsx =  () => {
    return (
      <>
        <h2>blogs</h2>
        <button onClick={handleLogout}>Logout</button>

        <div id='blogList'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} incrementLike={incrementLike} removeBlog={removeBlog}/>
          )}
        </div>

        <h3>Add blog</h3>
        <Togglable buttonLabel='Show' ref={addBlogRef}>
          <AddBlog addNewBlog={addNewBlog}/>
        </Togglable>
      </>

    )
  }

  return (
    <>
      {!user && <p>Loading...</p>}
      {user && <Jsx/>}
    </>
  )
}

Dashboard.propTypes = {
  token: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
  clearToken: PropTypes.func.isRequired,
}

export default Dashboard