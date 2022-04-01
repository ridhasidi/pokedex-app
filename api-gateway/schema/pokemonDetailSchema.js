const { gql } = require("apollo-server");
const axios = require("axios");
const { redis } = require("../config/redis");

const typeDefs = gql`
  type PokemonDetail {
    id: ID
    baseExp: Int
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
        const cachePokeDetail = await redis.get("pokemonDetail");
        const pokeDetail = JSON.parse(cachePokeDetail);
        if (cachePokeDetail && +pokeDetail.id === +id) {
          return pokeDetail;
        }
        const resp = await axios({
          method: "GET",
          url: baseUrl + `/${id}`,
        });
        const abilities = resp?.data.abilities.map((e) => {
          return {
            name: e.ability.name,
            isHidden: e["is_hidden"],
          };
        });
        const stats = resp?.data.stats.map((e) => {
          return {
            name: e.stat.name,
            base_stat: e.base_stat,
          };
        });
        const types = resp?.data.types.map((e) => {
          return {
            slot: e.slot,
            name: e.type.name,
          };
        });
        const moves = resp?.data.moves.map((e) => {
          return {
            name: e.move.name,
          };
        });
        const photoUrl = resp?.data?.sprites.other["official-artwork"]["front_default"];
        const result = {
          id: resp?.data.id,
          baseExp: resp?.data["base_experience"],
          name: resp?.data.name,
          height: resp?.data.height,
          weight: resp?.data.weight,
          photoUrl,
          abilities,
          stats,
          types,
          moves,
        };
        if (resp.status === 200) {
          await redis.set("pokemonDetail", JSON.stringify(result));
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
