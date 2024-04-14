const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

const blog = {
  title: 'Mergehelvetistä Itään',
  author: 'M. Luukkainen',
  url: 'https://example.com'
}

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
      await loginWith(page, 'mluukkai', 'salainen')

      expect(page.getByText('Logged in as \'mluukkai\'').toBeVisible)
      await page.getByTestId('modal-body').waitFor('hidden')

    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog)

      const modalText = `A new blog '${blog.title}' by '${blog.author}' added!`
      const modal = page.getByText(modalText)

      await expect(modal).toBeVisible()
      await modal.waitFor('hidden')
      await expect(modal).toBeHidden()
      await expect(page.getByText(blog.title)).toBeVisible()
    })

    describe('and a blog entry exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, blog)

        await page.waitForTimeout(200)
        await page.reload()
        await expect(page.getByText(blog.title)).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
      })

      test('a blog can be removed', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(page.getByText(`'${blog.title}' removed succesfully!`)).toBeVisible()
      })
    })
  })
})
