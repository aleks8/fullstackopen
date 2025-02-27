const loginWith = async (page, username, password)  => {
    //await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
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
  export { loginWith, createBlog }