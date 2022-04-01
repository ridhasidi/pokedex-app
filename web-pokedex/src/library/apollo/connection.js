import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://pokedex-ridhasidi.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default client;
