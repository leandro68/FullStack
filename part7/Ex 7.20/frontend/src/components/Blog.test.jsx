import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('show title and author but not URL and likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author for test',
    likes: 23,
    url: 'url.com',
    user: { name: 'User Name' }
  }

  render(<Blog blog={blog} />)
  // Debug the initial render
  screen.debug()

  // Check that only title and author are visible initially
  const title = screen.getByText('Component testing is done with react-testing-library, Author for test')
  expect(title).toBeInTheDocument()

  // Check that url and likes are not visible initially
  expect(screen.queryByTestId('blogUrl')).toBeNull()
  expect(screen.queryByTestId('blogLikes')).toBeNull()
})

describe('Blog component', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author for test',
    url: 'http://example.com',
    likes: 0,
    user: {
      name: 'Test User'
    }
  }

  it('shows URL and likes when view button is clicked', () => {
    render(<Blog blog={blog} />)

    // Simulate clicking the "view" button to show the blog details
    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    // Debug the initial render
    screen.debug()

    // Now the URL and likes should be in the DOM
    const url = screen.getByTestId('blogUrl')
    expect(url).toHaveTextContent('http://example.com')

    const likes = screen.getByTestId('blogLikes')
    expect(likes).toHaveTextContent('Likes: 0')
  })

})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author for test',
    url: 'http://example.com',
    likes: 0,
    user: {
      name: 'Test User'
    }
  }
  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateBlogLikes={mockHandler}/>
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const handleAddBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} handleAddBlog={handleAddBlog} blogFormVisible={true} />)

  const titleInput = screen.getByTestId('blogTitle')
  const authorInput = screen.getByTestId('blogAuthor')
  const urlInput = screen.getByTestId('blogUrl')
  const saveButton = screen.getByText('Save')

  await user.type(titleInput, 'Testing Title')
  await user.type(authorInput, 'Testing Author')
  await user.type(urlInput, 'http://testurl.com')
  await user.click(saveButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing Title',
    author: 'Testing Author',
    url: 'http://testurl.com'
  })
})