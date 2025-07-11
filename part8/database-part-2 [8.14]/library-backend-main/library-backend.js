const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
}
type Book {
    title: String! 
    published: String!
    author: Author!
    id: ID!
    genres: [String!]
}
type Query {
    authorCount: Int!
    bookCount: Int! 
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
}
`

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: () => books.length,
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) {
        query['author.name'] = args.author
      }
      if(args.genre) {
        query['genres'] = args.genre
      }
      return Book.find(query)
      
/*
      if(args.genre) {
        const genre = args.genre
        const checkUniqueBook = Book(genres).find({genre})
        return checkUniqueBook
      }

      if(args.author) {
        const author = args.author
        const checkUniqueAuthor = Book(author).find({author})
        return checkUniqueAuthor
      }
      if(!args.author && !args.genre) {
        //let books = await 
        return Book.find({})
      }
      */
/*      let BooksReturn = books
      if(args.author) {
        BooksReturn = BooksReturn.filter(p => p.author === args.author)
        //BooksReturn = BookAuthor
      }
      if(args.genre) {
        BooksReturn = BooksReturn.filter(book => book.genres.includes(args.genre))
        //console.log('BookGenre', BooksReturn)
        //BooksReturn = BookGenre
      }
      //console.log('BookAuthor', BookAuthor)
      return BooksReturn
*/
    },
    allAuthors: async (root, args) => {
      /*if(!args.born) {
        return {...authors, "born": null}
      }*/
      //if(!args.born) {
      return Author.find({})
      //}
      //return Author.find({ born: { $exists: args.born === 'YES' } })
  
    }
    //dummy: () => 0
  },
  //part of 8.3 answer
  Author: {
    name: (root) => root.name,
    born: (root) => root.born || null, 
    bookCount: (root) => {
      const bookList = books.filter(book => book.author === root.name)
      if (!bookList) {
        return 0
      }
      //console.log('bookList', bookList)
      //console.log('bookList.length', bookList.length)
      const bookListLength = bookList.length
      if(!bookListLength) {
        return 0 
      }
      return bookListLength
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log('Reached addBook mutation')
      try {
        const checkUniqueBook = await Book.findOne({title: args.title, published: args.published}) //author: args.author,
        console.log('checkUniqueBook', checkUniqueBook)
        if(checkUniqueBook) {
          throw new GraphQLError('Book must be unique', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name
            }
          })
        }
      } catch (error) {
        console.error('Error in addBook resolver:', error)
        throw error
      }
  /*    if (books.find(book=> (book.title === args.title) && 
      (book.author == args.author) && (book.published == args.published)
      )) {
        throw new GraphQLError('Book must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
  */
      console.log('Reached updatingAuthors section')
      //const book = { ...args, id: uuid() }
      //books = books.concat(book)
      //if(books.find(books => book.author = args.author)) {
      //doesauthorexist = authors.find(a => a.name === args.author)
      //console.log('doesauthorexist', doesauthorexist)
      let updatingAuthors = await Author.findOne({name: args.author}) 
  //    let updatingauthors = authors.find(a => a.name === args.author) 
      //console.log('authorhere01', updatingauthors)
      if(!updatingAuthors) {
          //updatingAuthors = 
          //console.log('authorhere', updatingauthors)
          updatingAuthors = new Author({name: args.author,  born: null, bookCount: 1 } ) //id: uuid(),
          try {        
            await updatingAuthors.save()      
          } catch (error) {        
            console.log('saving author error', error)
            throw new GraphQLError('Saving author failed', {          
              extensions: {            
                code: 'BAD_USER_INPUT',            
                invalidArgs: args.title,            
                error          
              }        
            })      
          }
          //updatingAuthors.save()
      //    authors = authors.concat(updatingauthors)
      } //else {
          //updatingauthors.bookCount += 1
       // }
      //console.log('authorhere2', updatingauthors)
      //  }   
      console.log('updatingAuthors', updatingAuthors)
      const book = new Book({ ...args, author: updatingAuthors._id })//, id: uuid()
      console.log('book', book)
      try {        
        await book.save()      
      } catch (error) {        
        throw new GraphQLError('Saving book failed', {          
          extensions: {            
            code: 'BAD_USER_INPUT',            
            invalidArgs: args.name,            
            error          
          }        
        })      
      }
      return book
    },
    editAuthor: async (root, args) => {
      const editingAuthor = await Author.findOne({ name: args.name })
      //const editingauthor = authors.find(a => a.name === args.name)
      //console.log('editingauthor', editingauthor)
      if (!editingAuthor) {
        return null
      }
      editingAuthor.born = args.setBornTo

      try {        
        await editingAuthor.save()     
      } catch (error) {        
        throw new GraphQLError('Saving born failed', {          
          extensions: {            
            code: 'BAD_USER_INPUT',            
            invalidArgs: args.name,            
            error          
          }        
        })      
      }

      return editingAuthor
      //const updatedAuthor = {...editingauthor, born: args.setBornTo}
      //authors = authors.map(a => a.name === args.name ? updatedAuthor : a )
      //return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
