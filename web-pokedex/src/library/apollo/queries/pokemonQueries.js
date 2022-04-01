import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons {
    getPokemons {
      name
      id
      photoUrl
      types {
        name
        slot
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GetOnePokemon($getOnePokemonId: ID) {
    getOnePokemon(id: $getOnePokemonId) {
      id
      baseExp
      name
      abilities {
        name
        isHidden
      }
      height
      weight
      stats {
        base_stat
        name
      }
      types {
        name
        slot
      }
      moves {
        name
      }
      photoUrl
    }
  }
`;
