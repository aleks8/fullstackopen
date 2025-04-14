import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { 
    ApolloClient, 
    ApolloProvider,
    InMemoryCache, 
    gql } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
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
      author,
      id,
      genres
  }
  }
`

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
