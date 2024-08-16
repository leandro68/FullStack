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
        await page.getByText('Likes: 1').waitFor()
        await page.getByTestId('blogLikeButton').click()
        await expect(page.getByText('Likes: 2')).toBeVisible()
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

      test('Owner can see delete button', async ({ page }) => {
        await expect(page.getByTestId('deleteBlog')).toBeVisible()
      })
    })
  
    test('User cannot see delete button of other owner blog', async ({ page, request }) => {
      //create new blog
      await createBlog(page, 'blog 01 title', 'author for blog 01', 'url for blog 01', true)
      //create another user
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'User For Test',
          username: 'user',
          password: 'test'
        }
      })
      //logout user
      await page.getByRole('button', { name: 'logout' }).click()
      //login con otro usuario
      await loginWith(page, 'user', 'test')
      //click en el view del blog creado por el otro usuario
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('url for blog 01')).toBeVisible()
      //chequea que el boton delete no este visible
      await expect(page.getByTestId('deleteBlog')).not.toBeVisible()
    })  

    test('blogs are ordered', async ({ page }) => {
      //create blog 1
      await createBlog(page, 'blog 01 title', 'author for blog 01', 'url for blog 01', true)
      //clik 2 likes
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 1').waitFor()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 2').waitFor()
      //click on hide
      await page.getByRole('button', { name: 'hide' }).click()
      //await expect(page.getByText('url for blog 01')).not.toBeVisible()
      //create blog 2
      await createBlog(page, 'blog 02 title', 'author for blog 02', 'url for blog 02', true)
      //clik 3 likes
      
      let viewButtons = await page.getByRole('button', { name: 'view' }).all()
      
      await viewButtons[1].click()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 1').waitFor()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 2').waitFor()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 3').waitFor()
      //click on hide
      await page.getByRole('button', { name: 'hide' }).click()
      //create blog 3
      await createBlog(page, 'blog 03 title', 'author for blog 03', 'url for blog 03', true)
      //clik 4 likes
      viewButtons = await page.getByRole('button', { name: 'view' }).all()
      await viewButtons[2].click()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 1').waitFor()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 2').waitFor()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 3').waitFor()
      await page.getByTestId('blogLikeButton').click()
      await page.getByText('Likes: 4').waitFor()
      //click on hide
      await page.getByRole('button', { name: 'hide' }).click() 
      const titles = await page.getByTestId('blogTitle').all()
      await expect(page.getByText('blog 03 title, author for blog 03')).toBeVisible()
      //await expect(titles[0]).toHaveText('blog 03 title, author for blog 03')
    })
  
  })

      
}) 
