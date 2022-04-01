import { useNavigate } from "react-router-dom";
import { capitalize } from "../helpers/capitalize";
import TypeBox from "./TypeBox";

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  // console.log(pokemon);
  const clickCard = () => {
    navigate(`pokemons/${pokemon.id}`);
  };
  return (
    <div className="md:w-1/5 lg:w-1/6 bg-gray-50 mr-6 mb-5 ml-6 mt-5 rounded-xl cursor-pointer drop-shadow-md hover:drop-shadow-xl hover:scale-105 delay-200" onClick={clickCard}>
      <div className="mb-2">
        <div className="mx-4 mt-2 mr-2">
          <p className="font-medium text-xl">{capitalize(pokemon.name)}</p>
        </div>
        <div className="flex mx-4">
          {pokemon.types.map((e) => {
            return <TypeBox key={e.name} name={e.name} />;
          })}
        </div>
      </div>
      <div>
        <img src={pokemon.photoUrl} alt={`${pokemon.name}`} />
      </div>
    </div>
  );
}
