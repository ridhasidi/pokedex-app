import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
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
      <section className="w-full bg-neutral-700 min-h-screen justify-center">
        <div className="pt-5 pb-3">
          <Link to={"/"} className="text-amber-400  hover:text-amber-500 p-4 m-6 text-4xl font-semibold">
            Pokedex
          </Link>
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
