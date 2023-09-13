import { useState, useEffect } from 'react';
import usersService from '../services/users'
import Blog from './Blog';
import AddBlog from './AddBlog';
import blogService from '../services/blogs.js'

const Dashboard = ({token, handleMessage, clearToken}) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState(null);

    const addNewBlog = (blog) => {
        blogService.postBlog(blog, token)
        .then((blog) => {
            setBlogs(blogs => [blog, ...blogs])
            handleMessage(`Added new blog, blog title${blog.title}, blog author${blog.author}, 200`);
        })
        .catch((e) => {
            handleMessage("Blog could not be added, 500")
            console.log(e)
        })
    }

    const handleLogout = () => {
        setUser(null)
        clearToken()
        handleMessage(`User logged out, 200`)
    }

    useEffect(() => {
        usersService.getUser(token).then((user) => {
            setUser(user);
            setBlogs(user.blogs)
            handleMessage("You are logged in, 200");
        }).catch((e) => {
            setUser(null)
            clearToken();
            handleMessage("Something wrong with the token, 400");
            console.log(e);
        })
    }, [token]) 

    const Jsx =  () => {
        return (
            <>
                <h2>blogs</h2>
                <button onClick={handleLogout}>Logout</button>
    
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
    
                <h3>Add blog</h3>
                <AddBlog addNewBlog={addNewBlog}/>
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

export default Dashboard;