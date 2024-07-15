const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'mluukkai', 'salainen')
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
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog 01 title', 'author for blog 01', 'url for blog 01', true)
      await expect(page.getByText('blog 01 title, author for blog 01')).toBeVisible()
    })

    describe('a new blog can be edited', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'blog 01 title', 'author for blog 01', 'url for blog 01', true)
        await page.getByRole('button', { name: 'view' }).click()
      })
  
      test('can update Likes', async ({ page }) => {
        const blogText = await page.getByText('blog 01 title, author for blog 01')
        await page.getByTestId('blogLikeButton').click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('can delete blog', async ({ page }) => {
        const blogText = await page.getByText('blog 01 title, author for blog 01')
        await expect(page.getByText('blog 01 title, author for blog 01')).toBeVisible()
        await page.getByTestId('deleteBlog').click()
        // Interceptar el diálogo de confirmación
        page.on('dialog', async dialog => {
          if (dialog.type() === 'confirm') {
            await dialog.accept(); // Aceptar el diálogo
          }
        })
        await expect(page.getByText('blog 01 title, author for blog 01')).not.toBeVisible()
      })
    }) 
  }) 
  
  
})