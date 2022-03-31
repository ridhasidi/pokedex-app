const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type PokemonDetail {
    id: ID
    name: String
    height: Int
    weight: Int
    photoUrl: String
    abilities: [Ability]
    stats: [BaseStat]
    types: [Types]
    moves: [Moves]
    message: String
  }

  type Moves {
    name: String
  }

  type BaseStat {
    base_stat: Int
    name: String
  }

  type Ability {
    name: String
    isHidden: Boolean
  }
  extend type Query {
    getOnePokemon(id: ID): PokemonDetail
  }
`;

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const resolvers = {
  Query: {
    getOnePokemon: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "GET",
          url: baseUrl + `/${id}`,
        });
        const abilities = data.abilities.map((e) => {
          return {
            name: e.ability.name,
            isHidden: e["is_hidden"],
          };
        });
        const stats = data.stats.map((e) => {
          return {
            name: e.stat.name,
            base_stat: e.base_stat,
          };
        });
        const types = data.types.map((e) => {
          return {
            slot: e.slot,
            name: e.type.name,
          };
        });
        const moves = data.moves.map((e) => {
          return {
            name: e.move.name,
          };
        });
        const photoUrl = data?.sprites.other["official-artwork"]["front_default"];
        const result = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          photoUrl,
          abilities,
          stats,
          types,
          moves,
        };
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
