const loginWith = async (page, username, password)  => {
    //await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
  //part of 5.19 answer
  const createBlog = async (page, title, author, url) => {  
    //await page.getByRole('button', { name: 'new note' }).click()  
    //await page.getByRole('textbox').fill(content)  
    //await page.getByRole('button', { name: 'save' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)//'Refactoring Test3') 
    await page.getByTestId('author').fill(author)//'Martin Fowler3') 
    await page.getByTestId('url').fill(url)//'www.martinfref3.com') 
    //await page.getByRole('textbox').fill('a note created by playwright')
    await page.getByRole('button', { name: 'create' }).click()
}

  /*const selectBlog = async(page, title, url) => {

        const otherBlogText = await page.getByText(title)      
        const otherBlogElement = await otherBlogText.locator('..')
        await otherBlogElement.getByRole('button', { name: 'view' }).click()
        await page.waitForTimeout(500)
        //await expect(otherBlogElement.getByText(url)).toBeVisible()
        //await page.waitForTimeout(500)

  }*/
  export { loginWith, createBlog}//, selectBlog }