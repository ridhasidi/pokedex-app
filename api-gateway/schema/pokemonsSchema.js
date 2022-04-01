const { gql } = require("apollo-server");
const axios = require("axios");
const { redis } = require("../config/redis");

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
        const cachePokemons = await redis.get("pokemons");
        if (cachePokemons) {
          return JSON.parse(cachePokemons);
        }
        const resp = await axios({
          method: "GET",
          url: baseUrl,
        });
        const result = await Promise.all(
          resp?.data.results.map(async (e) => {
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

        if (resp.status === 200) {
          await redis.set("pokemons", JSON.stringify(result));
        }
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
