import { useQuery } from "@apollo/client";
// import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCards";
import { GET_POKEMONS } from "../library/apollo/queries/pokemonQueries";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

export default function HomePage() {
  const { data, error, loading } = useQuery(GET_POKEMONS);
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <div>
      <section className="w-full bg-gray-300 min-h-screen justify-center">
        <div>
          <h1 className="text-neutral-800  hover:neutral-amber-900 p-4 mx-6 text-3xl font-semibold">Pokedex</h1>
        </div>
        <div className="flex w-full flex-wrap justify-center px-3 ">
          {data?.getPokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      </section>
    </div>
  );
}
