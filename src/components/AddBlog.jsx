import { useState } from 'react'

const AddBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault();
    (props.addNewBlog)({ title, author, url })
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return (
    <>
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            placeholder="URL"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  )
}

export default AddBlog
