import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { 
    ApolloClient, 
    ApolloProvider,
    InMemoryCache, 
    createHttpLink,
    gql } from '@apollo/client'

import { setContext } from '@apollo/client/link/context'


const authLink = setContext((_, { headers }) => {  
  const token = localStorage.getItem('phonenumbers-user-token')  
  return {    
    headers: {      
      ...headers,      
      authorization: token ? `Bearer ${token}` : null,    
    }  
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  //uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

//still works if don't have the allBooks part in const query = 
const query = gql`
  query {
    allAuthors  {
      name,
      id,
      born,
      bookCount
    }
    allBooks  {
      title,
      published,
      author {
        name
      },
      id,
      genres
  }
  }
`
//author,

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })


ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>
);
