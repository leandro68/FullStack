const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add Blog' }).click()
  await page.getByTestId('blogTitle').fill(title)
  await page.getByTestId('blogAuthor').fill(author)
  await page.getByTestId('blogUrl').fill(url)
  await page.getByRole('button', { name: 'save' }).click()
}

export { loginWith, createBlog }