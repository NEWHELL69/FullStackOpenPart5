const Blog = ({ blog, user, incrementLike, removeBlog }) => {
  const blogUlCss = {
    padding: 0,
    margin: 0,
    listStyleType: 'none'
  }

  // Instead of using state to render conditionally I am using HTML implementation of disclosure widget.
  return (
    <div className="blog">
      <details>
        <summary>{blog.title}, {' ' + blog.author}</summary>
        <ul style={blogUlCss}>
          <li>{blog.url}</li>
          <li>
            <span className="likeCount">{blog.likes}</span>
            <button className="likeBtn" onClick={() => incrementLike(blog.id)}>Like</button>
          </li>
          <li>{user.name}</li>
        </ul>
        {(blog.userId.id ? blog.userId.id : blog.userId) === user.id ? <button className='removeBtn' onClick={() => removeBlog(blog)}>Remove</button> : <></>}
      </details>
    </div>
  )
}

export default Blog