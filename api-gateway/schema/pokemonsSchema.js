const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Pokemon {
    id: ID
    name: String
    types: [Types]
    photoUrl: String
  }

  type Types {
    name: String
    slot: Int
  }

  type Query {
    getPokemons: [Pokemon]
  }
`;

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const resolvers = {
  Query: {
    getPokemons: async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: baseUrl,
        });
        const result = await Promise.all(
          data.results.map(async (e) => {
            const resp = await axios({
              method: "GET",
              url: e.url,
            });
            const types = resp?.data.types.map((e) => {
              return {
                slot: e.slot,
                name: e.type.name,
              };
            });
            return {
              id: resp.data.id,
              name: resp.data.name,
              photoUrl: resp?.data?.sprites.other["official-artwork"]["front_default"],
              types,
            };
          })
        );
        return result;
      } catch (error) {
        return error.response.data;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
