const Blog = ({ blog, userName, incrementLike, removeBlog }) => {
  const ulCss = {
    padding: 0,
    margin: 0,
    listStyleType: 'none'
  };

  return (
    <div>
      <details>
        <summary>{blog.title}, {" " + blog.author}</summary>
        <ul style={ulCss}>
          <li>{blog.url}</li>
          <li>
            {blog.likes}
            <button onClick={() => incrementLike(blog.id)}>Like</button>
            </li>
          <li>{userName}</li>
        </ul>
        <button onClick={() => removeBlog(blog)}>Remove</button>
      </details>
    </div>  
  )
}

export default Blog