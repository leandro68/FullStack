const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Home page is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'log in' }).click()
    const locator = await page.getByText('Login to Blogapp')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Add Blog' }).click()
      await page.getByTestId('blogTitle').fill('blog 01 title')
      await page.getByTestId('blogAuthor').fill('author for blog 01')
      await page.getByTestId('blogUrl').fill('url for blog 01')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('blog 01 title, author for blog 01')).toBeVisible()
    })

    describe('a new blog can be edited', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Add Blog' }).click()
        await page.getByTestId('blogTitle').fill('blog 01 title')
        await page.getByTestId('blogAuthor').fill('author for blog 01')
        await page.getByTestId('blogUrl').fill('url for blog 01')
        await page.getByRole('button', { name: 'save' }).click()
        await page.getByRole('button', { name: 'view' }).click()
      })
  
      test('can update Likes', async ({ page }) => {
        const blogText = await page.getByText('blog 01 title, author for blog 01')
        await page.getByTestId('blogLikeButton').click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })
    }) 
  }) 
  
  
})