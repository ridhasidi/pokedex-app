import { capitalize } from "../helpers/capitalize";

export default function StatComponent({ stats }) {
  return (
    <div className="w-1/3 bg-gray-300 m-1.5 p-1.5 rounded-md grow">
      <p className="text-sm font-semibold text-gray-700 mb-1 text-center">{capitalize(stats.name)}</p>
      <div className="bg-gray-50 rounded-md">
        <p className="text-center text-gray-700">{stats["base_stat"]}</p>
      </div>
    </div>
  );
}
