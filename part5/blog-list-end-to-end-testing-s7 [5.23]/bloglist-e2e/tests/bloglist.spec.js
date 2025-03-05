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
        password: 'Mattipassword' }
      })
    await request.post('/api/users', {
      data: {
        name: 'Dan Abromov',
        username: 'dabromov',
        password: 'DanPassword'
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
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Mattipassword')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
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

//part of 5.19 answer 
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'Mattipassword')
      //await page.getByRole('button', { name: 'log in' }).click()
    //  await page.getByTestId('username').fill('mluukkai')
    //  await page.getByTestId('password').fill('Mattipassword')
    //  await page.getByRole('button', { name: 'login' }).click()
    })

    //5.19 answer
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
      await expect(page.getByText('a new blog Refactoring Test4 by Martin Fowler4 added')).toBeVisible()
    
      const otherBlogText = await page.getByText('Refactoring Test4')      
      const otherBlogElement = await otherBlogText.locator('..')
      await otherBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(otherBlogElement.getByText('www.martinfref4.com')).toBeVisible()

    })

    //5.20 answer 
    test('a blog can be liked', async ({ page }) => {
      //await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
      await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
      await expect(page.getByText('a new blog Refactoring Test4 by Martin Fowler4 added')).toBeVisible()
      await createBlog(page, 'Refactoring Test5', 'Martin Fowler5', 'www.martinfref5.com')
      await expect(page.getByText('a new blog Refactoring Test5 by Martin Fowler5 added')).toBeVisible()
      
      //this is because I changed running the backend fron npm run dev 
      //to npm run start: test and it seemed like it was lagging
      //but logging out helped, hopefully my code is fine 
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'mluukkai', 'Mattipassword')

      const otherBlogText = await page.getByText('Refactoring Test4')      
      const otherBlogElement = await otherBlogText.locator('..')
      await otherBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(otherBlogElement.getByText('www.martinfref4.com')).toBeVisible()
      //await page.getByRole('button', { name: 'view' }).click()
      //await page.getByRole('button', { name: 'like' }).click()
      //await page.getByRole(click).waitFor()
      await otherBlogElement.getByRole('button', { name: 'like' }).click()
      //I think I do have to use waitFor 
      await expect(otherBlogElement.getByText('likes 1')).toBeVisible()
      //await expect(page.getByText('likes 1')).toBeVisible()
      
      //await expect(page.getByText('a new blog Refactoring Test4 by Martin Fowler4 added')).toBeVisible()
    })

    //5.21 answer 
    //some of the extra logging out and in is because of the slower rendering 
    test('user who added the blog can delete the blog', async ({ page }, ) => {
      await loginWith(page, 'mluukkai', 'Mattipassword')

      await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
      await expect(page.getByText('a new blog Refactoring Test4 by Martin Fowler4 added')).toBeVisible()
      await createBlog(page, 'Refactoring Test5', 'Martin Fowler5', 'www.martinfref5.com')
      await expect(page.getByText('a new blog Refactoring Test5 by Martin Fowler5 added')).toBeVisible()
      
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'mluukkai', 'Mattipassword')

      const otherBlogText = await page.getByText('Refactoring Test4')      
      const otherBlogElement = await otherBlogText.locator('..')
      await otherBlogElement.getByRole('button', { name: 'view' }).click()
      //await page.getByRole(click).waitFor()
      await expect(otherBlogElement.getByText('Matti Luukkainen')).toBeVisible()

      //await page.getByRole('button', {name: 'remove'}).waitFor()

      page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`)
        await dialog.accept()
      })
      //await page.getByRole('button', {name: 'Ok'}).click()
     //await page.click('OK')

     //I think page.on is supposed to be before the action that triggers it 
     await otherBlogElement.getByRole('button', { name: 'remove' }).click()
     await page.getByRole('button', {name: 'remove'}).waitFor()
      
 //     await page.getByRole('button', { name: 'logout' }).click()
 //     await loginWith(page, 'mluukkai', 'Mattipassword')

 //     await createBlog(page, 'Refactoring Test6', 'Martin Fowler6', 'www.martinfref6.com')
 //     await expect(page.getByText('a new blog Refactoring Test6 by Martin Fowler6 added')).toBeVisible()
      
      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'mluukkai', 'Mattipassword')
      await expect(page.getByText('Refactoring Test4')).not.toBeVisible()
      await expect(page.getByText('Refactoring Test5')).toBeVisible()
   //   await page.getByRole('button', {name: 'login'}).waitFor()

      //await otherBlogElement.getByRole('button', { name: 'view' }).click()
   //   const otherBlogText2 = await page.getByText('Refactoring Test5')      
   //   const otherBlogElement2 = await otherBlogText.locator('..')
   //   await expect(otherBlogElement2.getByText('Refactoring Test5')).toBeVisible()
   //   await expect(otherBlogElement.getByText('Refactoring Test4')).not.toBeVisible()
      //await page.getByRole('button', {name: }).click()
    })

    //5.22 answer 
    test('only the user who added the blog sees the delete button', async ({ page }, ) => {
      await loginWith(page, 'mluukkai', 'Mattipassword')

      await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
      await expect(page.getByText('a new blog Refactoring Test4 by Martin Fowler4 added')).toBeVisible()
      //await createBlog(page, 'Refactoring Test5', 'Martin Fowler5', 'www.martinfref5.com')
      //await expect(page.getByText('a new blog Refactoring Test5 by Martin Fowler5 added')).toBeVisible()
      
     // await page.getByRole('button', { name: 'logout' }).click()
     // await loginWith(page, 'mluukkai', 'Mattipassword')

     // const otherBlogText = await page.getByText('Refactoring Test4 Martin Fowler4')      
     // const otherBlogElement = await otherBlogText.locator('..')

     // await page.getByRole('button', { name: 'view' }).click()
    // await expect(page.getByText('Refactoring Test4')).toBeVisible()
    //  await expect(page.getByText('Matti Luukkainen')).toBeVisible()
      //await otherBlogElement.getByRole('button', { name: 'remove' }).not.toBeVisible()
    //  await expect(page.getByText('remove')).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'dabromov', 'DanPassword')
      
      await createBlog(page, 'Refactoring Test6', 'Martin Fowler6', 'www.martinfref6.com')
      await expect(page.getByText('a new blog Refactoring Test6 by Martin Fowler6 added')).toBeVisible()
      
      
      //await otherBlogElement.waitFor()
      //await createBlog(page, 'Refactoring Test7', 'Martin Fowler7', 'www.martinfref7.com')
      //await expect(page.getByText('a new blog Refactoring Test7 by Martin Fowler7 added')).toBeVisible()
      //await page.pause()

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'dabromov', 'DanPassword')

  /*    const otherBlogText1 = await page.getByText('Refactoring Test6')      
      const otherBlogElement1 = await otherBlogText1.locator('..')
      await otherBlogElement1.getByRole('button', { name: 'view' }).click()
      await expect(otherBlogElement1.getByText('Refactoring Test6')).toBeVisible()
      await expect(otherBlogElement1.getByText('Dan Abromov')).toBeVisible()
      await otherBlogElement1.getByRole('button', { name: 'remove' }).toBeVisible()
      //await expect(page.getByText('remove')).not.toBeVisible()
*/
      const otherBlogText = await page.getByText('Refactoring Test4')      
      const otherBlogElement = await otherBlogText.locator('..')
      await otherBlogElement.getByRole('button', { name: 'view' }).click()
      await expect(otherBlogElement.getByText('Refactoring Test4')).toBeVisible()
      await expect(otherBlogElement.getByText('Matti Luukkainen')).toBeVisible()
      //await otherBlogElement.getByRole('button', { name: 'remove' }).toBeVisible()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      await expect(page.getByText('remove')).not.toBeVisible()
    //  const otherBlogText = await page.getByText('Refactoring Test4')      
    //  const otherBlogElement = await otherBlogText.locator('..')
      
    //  await otherBlogElement.getByRole('button', { name: 'view' }).click()
      //await expect(otherBlogElement.getByText('www.martinfref4.com')).toBeVisible()
    //  await expect(otherBlogElement.getByText('Matti Luukkainen')).toBeVisible()
    //  await otherBlogElement.getByRole('button', { name: 'remove' }).not.toBeVisible()
      //click()

    })  
    //5.23 
    describe('and several blogs exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Refactoring Test4', 'Martin Fowler4', 'www.martinfref4.com')
        //await page.waitForTimeout(500)
        await createBlog(page, 'Refactoring Test5', 'Martin Fowler5', 'www.martinfref5.com')
        //await page.waitForTimeout(500)
        await createBlog(page, 'Refactoring Test6', 'Martin Fowler6', 'www.martinfref6.com')
        //await page.waitForTimeout(500)
      })

      test('notes are ordered in priority', async ({ page }) => {

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'mluukkai', 'Mattipassword')
        await page.waitForTimeout(500)

       // await selectBlog(page, 'Refactoring Test4', 'www.martinfref4.com')
/*      const otherBlogText = await page.getByText('Refactoring Test4')      
      const otherBlogElement = await otherBlogText.locator('..')
      await otherBlogElement.getByRole('button', { name: 'view' }).click()
      await page.waitForTimeout(500)
      //await expect(otherBlogElement.getByText('www.martinfref4.com')).toBeVisible()
      await page.waitForTimeout(500)
      //await page.getByRole('button', { name: 'view' }).click()
      //await page.getByRole('button', { name: 'like' }).click()
      //await page.getByRole(click).waitFor()
      for (let i = 0; i < 2; i++) {
        //await page.waitForSelector('button[name="like"]', { visible: true, timeout: 5000 })
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(500)
        //await page.getByRole('button', {name: 'like'}).waitFor()
      }
  */
    /*  await otherBlogElement.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', {name: 'like'}).waitFor()
      await otherBlogElement.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', {name: 'like'}).waitFor()*/
      //await page.getByRole('button', { name: 'logout' }).click()
      //await loginWith(page, 'mluukkai', 'Mattipassword')
      //I think I do have to use waitFor 
   //   await expect(otherBlogElement.getByText('likes 2')).toBeVisible()
//      await otherBlogElement.getByRole('button', { name: 'hide' }).click()
      const Refactoring4Before = await page.getByText('Refactoring Test4')   
      const Refactoring5Before = await page.getByText('Refactoring Test5') 
      
      const refactoring4BoxBefore = await Refactoring4Before.boundingBox()
      const refactoring5BoxBefore = await Refactoring5Before.boundingBox()

      await expect(refactoring4BoxBefore.y).toBeLessThan(refactoring5BoxBefore.y)

      const otherBlogText2 = await page.getByText('Refactoring Test5')      
      const otherBlogElement2 = await otherBlogText2.locator('..')
      await otherBlogElement2.getByRole('button', { name: 'view' }).click()
      //await expect(otherBlogElement2.getByText('www.martinfref5.com')).toBeVisible()

      for (let i = 0; i < 1; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await page.waitForTimeout(500)
        //await page.getByRole('button', {name: 'like'}).waitFor()
      }

      await expect(otherBlogElement2.getByText('likes 1')).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, 'mluukkai', 'Mattipassword')
      await page.waitForTimeout(500)

      const Refactoring4 = await page.getByText('Refactoring Test4')   
      const Refactoring5 = await page.getByText('Refactoring Test5')   

      const refactoring4Box = await Refactoring4.boundingBox()
      const refactoring5Box = await Refactoring5.boundingBox()
      
      // Verify that refactoring5Box is above refactoring4Box
      await expect(refactoring5Box.y).toBeLessThan(refactoring4Box.y)
      //await expect(refactoring5Box.y < refactoring4Box.y)

      if (refactoring5Box.y < refactoring4Box.y) {
        console.log('refactoring5Box is above refactoring4Box');
      } else {
        console.log('refactoring5Box is not above refactoring4Box');
      }
      //await page.pause()
      })
    })  
  })  

})