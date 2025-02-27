const { test, describe, expect, beforeEach } = require('@playwright/test')
const {loginWith, createBlog}  = require('./helper')
describe('BlogList', () => {
//part of 5.18 answer 
//there are also changes in the backend
//controllers folder in the testing.js file
//and in the backend app.js file 
  beforeEach(async ({ page, request }) => {  
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'Mattipassword'
      }
    })

    await page.goto('/')  
  })
//5.17 answer 
  test('Login form is shown', async ({ page }) => {
    //await page.goto('http://localhost:5173')

    //const locator = await page.getByText('Notes')
    const locator = await page.getByText('log in to application')

    await expect(locator).toBeVisible()
    await page.getByTestId('username').fill('mluukkai')
    await expect(page.getByTestId('username')).toBeVisible()
    await page.getByTestId('password').fill('Mattipassword')
    await expect(page.getByTestId('password')).toBeVisible()
    //await page.getByRole('button', { name: 'login' }).click()
    //await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2023')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()

  })
//part of 5.18 answer 
  describe('Login', () => {
    test.only('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Mattipassword')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test.only('fails with wrong credentials', async ({ page }) => {
      //await page.getByTestId('username').fill('mluukkai')
      //await page.getByTestId('password').fill('wrong')
      //await page.getByRole('button', { name: 'login' }).click()
      await loginWith(page, 'mluukkai', 'wrong')
      const errorDiv = await page.locator('.error')  
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')    
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
    })
  })
//repeat of 5.18 
  test('user can log in', async ({ page }) => {
    //await page.goto('http://localhost:5173')
    await loginWith(page, 'mluukkai', 'Mattipassword')
    //await page.getByRole('button', { name: 'login' }).click()
  //  const textboxes = await page.getByRole('textbox').all()

  //  await page.getByTestId('username').fill('mluukkai')    
  //  await page.getByTestId('password').fill('Mattipassword')
    //await textboxes[0].fill('mluukkai')    
    //await textboxes[1].fill('Mattipassword')

    //await page.getByRole('textbox').first().fill('mluukkai')
    //await page.getByRole('textbox').last().fill('Mattipassword')    
  //  await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
  })
//repeat of 5.18 
  test('login fails with wrong password', async ({ page }) => {
    //await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()

    const errorDiv = await page.locator('.error')  
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')    
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
    //await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Mattipassword')
      //await page.getByRole('button', { name: 'log in' }).click()
    //  await page.getByTestId('username').fill('mluukkai')
    //  await page.getByTestId('password').fill('Mattipassword')
    //  await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
      await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
      await expect(page.getByText('a new blog Refactoring Test4 by Martin Fowler4 added')).toBeVisible()
    })
  })  


})