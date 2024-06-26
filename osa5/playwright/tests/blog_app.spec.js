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

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
      })

      test('it can be removed', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept())

        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Remove' }).click()

        await expect(page.getByText(`'${blog.title}' removed succesfully!`)).toBeVisible()
      })

      test('it can be removed only if it\'s own', async ({ page, request }) => {
        await request.post('/api/testing/create')
        await page.reload()

        const blogEntry = page.locator(':text("How to deal with bad luck")')
        const expandViewButton = blogEntry.locator(':text("View")')

        await expect(blogEntry).toBeVisible()
        await expect(expandViewButton).toBeVisible()

        await expandViewButton.click()
        await expect(blogEntry.locator(':text("Remove")')).toBeHidden()
      })

      test('blogs are sorted by likes', async ({ page, request }) => {
        await request.post('/api/testing/createmany')
        await page.reload()

        const lastBlog = page.locator(':text("Test blog 1")').locator('..')
        await lastBlog.locator(':text("View")').click()
        await lastBlog.locator(':text("Likes 0")').waitFor()

        for (let i = 0; i < 3; i++) {
          await lastBlog.locator(':text("Like")').click()

          await lastBlog.locator(`:text("Likes ${i+1}")`).waitFor()
        }

        const middleBlog = page.locator(':text("Test blog 2")').locator('..')
        await middleBlog.locator(':text("View")').click()
        await middleBlog.locator(':text("Likes 0")').waitFor()

        for (let i = 0; i < 2; i++) {
          await middleBlog.locator(':text("Like")').click()
          await middleBlog.locator(`:text("Likes ${i+1}")`).waitFor()
        }

        await page.reload()
        await page.locator(`:text("Test blog 1")`).waitFor()

        const currentOrder = page.locator('.blog')

        await currentOrder.first().locator(':text("View")').click()
        await expect(currentOrder.first().locator(':text("Likes 3")')).toBeVisible()
        await expect(currentOrder.first().locator(':text("Test blog 1")')).toBeVisible()

        await currentOrder.nth(1).locator(':text("View")').click()
        await expect(currentOrder.nth(1).locator(':text("Likes 2")')).toBeVisible()
        await expect(currentOrder.nth(1).locator(':text("Test blog 2")')).toBeVisible()

        await currentOrder.last().locator(':text("View")').click()
        await expect(currentOrder.last().locator(':text("Likes 0")')).toBeVisible()
        await expect(currentOrder.last().locator(':text("Test blog 3")')).toBeVisible()
      })
    })
  })
})
