import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('show title and author but not URL and likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author for test',
    likes: 23,
    url: 'url.com',
    user: { name: 'User Name' }
  }

  const updateBlogLikes = () => {}
  const removeBlog = () => {}

  render(<Blog blog={blog} updateBlogLikes={updateBlogLikes} removeBlog={removeBlog} />)

  // Check that only title and author are visible initially
  const title = screen.getByText('Component testing is done with react-testing-library, Author for test')
  expect(title).toBeInTheDocument()

  // Check that url and likes are not visible initially
  expect(screen.queryByTestId('blogUrl')).toBeNull()
  expect(screen.queryByTestId('blogLikes')).toBeNull()
})

