const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)

  await page.getByRole('button').click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.getByTestId('blog-title').waitFor('visible')

  await page.getByTestId('blog-title').fill(blog.title)
  await page.getByTestId('blog-author').fill(blog.author)
  await page.getByTestId('blog-url').fill(blog.url)

  await page.waitForTimeout(250)
  await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createBlog }
