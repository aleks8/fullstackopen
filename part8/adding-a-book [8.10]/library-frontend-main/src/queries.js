import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query  {
  allAuthors  {
    name,
    id,
    born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query  {
  allBooks  {
    title,
    published,
    author,
    id,
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: String!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title,
    published,
    author,
    genres
  }
}
`