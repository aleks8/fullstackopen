const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

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
    author: String!
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
}
`

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if(!args.author && !args.genre) {
        return books
      }
      let BooksReturn = books
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
    },
    allAuthors: (root, args) => {
      /*if(!args.born) {
        return {...authors, "born": null}
      }*/
      return authors
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
    addBook: (root, args) => {
      if (books.find(book=> (book.title === args.title) && 
      (book.author == args.author) && (book.published == args.published)
      )) {
        throw new GraphQLError('Book must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      //if(books.find(books => book.author = args.author)) {
 //     doesauthorexist = authors.find(a => a.name === args.author)
 //     console.log('doesauthorexist', doesauthorexist)
      let updatingauthors = authors.find(a => a.name === args.author) 
      //console.log('authorhere01', updatingauthors)
      if(!updatingauthors) {
          updatingauthors = {name: args.author, id: uuid(), born: null, bookCount: 1 } 
          //console.log('authorhere', updatingauthors)
          authors = authors.concat(updatingauthors)
      } //else {
          //updatingauthors.bookCount += 1
       // }
      //console.log('authorhere2', updatingauthors)
      //  }   
      return book
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
