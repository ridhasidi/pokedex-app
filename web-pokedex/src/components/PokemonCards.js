import { useNavigate } from "react-router-dom";
import { capitalize } from "../helpers/capitalize";

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  // console.log(pokemon);
  const clickCard = () => {
    navigate(`pokemons/${pokemon.id}`);
  };
  return (
    <div className="w-1/5 bg-gray-100 mr-6 mb-5 ml-6 mt-5 rounded-xl cursor-pointer drop-shadow-md hover:drop-shadow-xl hover:scale-105 delay-200" onClick={clickCard}>
      <div className="mb-2">
        <div className="mx-4 mt-2 mr-2">
          <p className=" font-medium">{capitalize(pokemon.name)}</p>
        </div>
        <div className="flex mx-2">
          {pokemon.types.map((e) => {
            return (
              <div className=" mx-2 rounded-lg px-2 py-1 bg-gray-200" key={e.name}>
                <p className="text-sm text-neutral-600">{e.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <img src={pokemon.photoUrl} alt={"menu display"} />
      </div>
    </div>
  );
}
