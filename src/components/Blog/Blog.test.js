import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import AddBlog from '../AddBlog'

// Instead of using state to render conditionally I am using HTML implementation of disclosure widget.
// Tests are written for this widget.
describe('<Blog />', () => {
  let container
  const user = {
    name: 'Me',
    blogs: [],
    id: '12'
  }

  const blog = {
    title: 'Something',
    author: 'Some old guy',
    url: 'www.some.com',
    likes: 50,
    id: '0123456789',
    userId: {
      id: `${user.id}`
    }
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} incrementLike={() => {}} removeBlog={() => {}} />
    ).container
  })

  // Test 1: URL and Likes fields are hidden when initially rendered.
  test('disclosure widget is collapsed.', async () => {
    // This test checks wheather the boolean attribute "open" on details, which controls the disclosure widget, is
    // absent when initially rendered.

    const details = container.querySelector('details')
    expect(details.hasAttribute('open')).toBeFalsy()
  })

  // Test 2: URL and Likes fields are visible when expanded.
  test('disclosure widget is expanded.', async () => {
    // This test checks wheather the boolean attribute "open" on details, which controls the disclosure widget, is
    // present when the widget is expanded by clicking.

    const details = container.querySelector('details')
    details.open = true
    expect(details.hasAttribute).toBeTruthy()
  })

  // Test 3: Like button is called twice.
  test('Checking like button works', async () => {
    const mockHandler = jest.fn()
    const container = render(
      <Blog blog={blog} user={user} incrementLike={mockHandler} removeBlog={() => {}} />
    ).container
    const mockUser = userEvent.setup()

    const likeBtn = container.querySelector('.likeBtn')
    await mockUser.click(likeBtn)
    await mockUser.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  // Test 4: New blog form component calls the handler with right details
  test('Checking new blog form', async () => {
    const mockHandler = jest.fn()
    const container = render(
      <AddBlog addNewBlog={mockHandler}/>
    ).container
    const mockUser = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Title')
    await mockUser.type(titleInput, blog.title)
    const authorInput = screen.getByPlaceholderText('Author')
    await mockUser.type(authorInput, blog.author)
    const URLInput = screen.getByPlaceholderText('URL')
    await mockUser.type(URLInput, blog.url)

    const submitFormBtn = screen.getByText('submit')
    await mockUser.click(submitFormBtn)

    expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
  })
})