import { useQuery } from "@apollo/client";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import TypeBox from "../components/TypeBox";
import { capitalize } from "../helpers/capitalize";
import { createId } from "../helpers/idCreator";
import { GET_POKEMON_DETAIL } from "../library/apollo/queries/pokemonQueries";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

export default function PokemonDetail() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { data, error, loading } = useQuery(GET_POKEMON_DETAIL, {
    variables: { getOnePokemonId: id },
  });
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <section className=" flex w-full bg-neutral-700 min-h-screen justify-center p-5">
      <div className=" flex flex-col bg-gray-200 min-h-fit rounded-2xl drop-shadow-xl md:w-1/2 xl:w-1/3">
        <div className="mx-3 my-2">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-semibold">{capitalize(data?.getOnePokemon.name)}</h1>
            <p className="font-bold text-gray-400">{createId(data?.getOnePokemon.id)}</p>
          </div>

          <div className="flex">
            {data?.getOnePokemon.types.map((e) => {
              return <TypeBox key={e.name} name={e.name} />;
            })}
          </div>
          <div className="flex justify-center">
            <img className="w-2/3" src={data?.getOnePokemon.photoUrl} alt={data?.getOnePokemon.name} />
          </div>
        </div>
        <div className="bg-gray-100 grow overflow-hidden rounded-2xl">
          <div className="flex my-2 mx-4 justify-around">
            <Link to={`/pokemons/${id}`}>About</Link>
            <Link
              to={`/pokemons/${id}/stats`}
              state={{
                stats: data?.getOnePokemon.stats,
              }}
            >
              Base Stats
            </Link>
            <Link
              to={`/pokemons/${id}/moves`}
              state={{
                stats: data?.getOnePokemon.moves,
              }}
            >
              Moves
            </Link>
          </div>
          <hr />
          <div className="mx-4 my-2">
            {pathname === `/pokemons/${id}` ? (
              <div>
                <div className="flex justify-around">
                  <div className="bg-gray-300 m-1.5 p-1.5 rounded-md grow">
                    <p className="text-sm font-semibold text-gray-700 mb-1 text-center">Abilities</p>
                    <div className="flex bg-gray-50 rounded-md justify-around">
                      {data?.getOnePokemon.abilities.map((e) => {
                        return (
                          <div key={e.name}>
                            {" "}
                            <p className="text-center text-gray-700 my-0.5">{capitalize(e.name)}</p>{" "}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div className="bg-gray-300 m-1.5 p-1.5 rounded-md grow">
                    <p className="text-sm font-semibold text-gray-700 mb-1 text-center">Height</p>
                    <div className="bg-gray-50 rounded-md">
                      <p className="text-center text-gray-700">{+data?.getOnePokemon.height / 10}m</p>
                    </div>
                  </div>
                  <div className="bg-gray-300 m-1.5 p-1.5 rounded-md grow">
                    <p className="text-sm font-semibold text-gray-700 mb-1 text-center">Weight</p>
                    <div className="bg-gray-50 rounded-md">
                      <p className="text-center text-gray-700">{+data?.getOnePokemon.weight / 10}kg</p>
                    </div>
                  </div>
                  {/* <div>
                    <p>Weight: {+data?.getOnePokemon.weight / 10}kg</p>
                  </div> */}
                </div>
                <div className="flex justify-center">
                  <div className="bg-gray-300 m-1.5 p-1.5 rounded-md w-1/2">
                    <p className="text-sm font-semibold text-gray-700 mb-1 text-center">Base Experience</p>
                    <div className="bg-gray-50 rounded-md">
                      <p className="text-center text-gray-700">{+data?.getOnePokemon.baseExp}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
          {/* <div>
            
          </div> */}
        </div>
      </div>
    </section>
  );
}
