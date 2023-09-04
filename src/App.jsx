import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getUser } from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   if(user) {
  //     setBlogs(user.blogs);
  //   }
  // }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await getUser({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log(exception);
    }
  }


  if(user) {    
    return (
      <div>
        <h2>blogs</h2>
        {user.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </>
  )  
}

export default App