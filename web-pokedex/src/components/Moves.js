import { useLocation } from "react-router-dom";
import { capitalize } from "../helpers/capitalize";

export default function Moves() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="bg-gray-300 m-1.5 p-1.5 rounded-md">
      <p className="text-sm font-semibold text-gray-700 mb-1 text-center">Moves</p>
      <div className="flex w-full flex-wrap justify-center bg-gray-50 rounded-md">
        {state.stats.slice(0, 20).map((e) => {
          return (
            <div className="border-2 border-gray-300 rounded-md px-1 m-1" key={e.name}>
              <p className="text-gray-700 text-sm">{capitalize(e.name)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
