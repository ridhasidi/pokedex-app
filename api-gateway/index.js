if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("apollo-server");

const pokemon = require("./schema/pokemonsSchema");
const pokemonDetail = require("./schema/pokemonDetailSchema");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: [pokemon.typeDefs, pokemonDetail.typeDefs],
  resolvers: [pokemon.resolvers, pokemonDetail.resolvers],
});

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
