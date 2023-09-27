const Blog = ({ blog, userName, incrementLike, removeBlog }) => {
  const blogUlCss = {
    padding: 0,
    margin: 0,
    listStyleType: 'none'
  };

  // Instead of using state to render conditionally I am using HTML implementation of disclosure widget.
  return (
    <div className="blog">
      <details>
        <summary>{blog.title}, {" " + blog.author}</summary>
        <ul style={blogUlCss}>
          <li>{blog.url}</li>
          <li>
            <span class="likeCount">{blog.likes}</span>
            <button class="likeBtn" onClick={() => incrementLike(blog.id)}>Like</button>
            </li>
          <li>{userName}</li>
        </ul>
        <button onClick={() => removeBlog(blog)}>Remove</button>
      </details>
    </div>  
  )
}

export default Blog