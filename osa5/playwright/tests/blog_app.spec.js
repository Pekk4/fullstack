const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByText('Blogs')).toBeHidden()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')

      await page.getByRole('button').click()

      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByText('Logged in as \'mluukkai\'')).toBeVisible()
      await expect(page.getByText('Username')).toBeHidden()
      await expect(page.getByText('Password')).toBeHidden()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('karhukopla')
      await page.getByTestId('password').fill('mustakaapu')

      await page.getByRole('button').click()

      await expect(page.getByText('Wrong username or password!')).toBeVisible()
      await expect(page.getByText('Blogs')).toBeHidden()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')

      await page.getByRole('button').click()

      await page.getByTestId('modal-body').waitFor('hidden')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'Mergehelvetistä Itään',
        author: 'M. Luukkainen',
        url: 'https://example.com'
      }

      await page.getByRole('button', { name: 'New blog' }).click()
      await page.getByTestId('blog-title').waitFor('visible')

      await page.getByTestId('blog-title').fill(blog.title)
      await page.getByTestId('blog-author').fill(blog.author)
      await page.getByTestId('blog-url').fill(blog.url)

      await page.waitForTimeout(500)
      await page.getByRole('button', { name: 'Create' }).click()

      const modalText = `A new blog '${blog.title}' by '${blog.author}' added!`
      const modal = page.getByText(modalText)

      await expect(modal).toBeVisible()
      await modal.waitFor('hidden')
      await expect(modal).toBeHidden()
      await expect(page.getByText(blog.title)).toBeVisible()
    })
  })
})
