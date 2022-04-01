export default function TypeBox({ name }) {
  if (name === "fire") {
    return (
      <div className=" mr-2 rounded-lg px-2 py-1 bg-rose-600">
        <p className="text-sm text-rose-100">{name}</p>
      </div>
    );
  }
  if (name === "flying") {
    return (
      <div className=" mr-2 rounded-lg px-2 py-1 bg-violet-600 ">
        <p className="text-sm text-violet-100">{name}</p>
      </div>
    );
  }
  if (name === "water") {
    return (
      <div className=" mr-2 rounded-lg px-2 py-1 bg-blue-600 ">
        <p className="text-sm text-blue-100">{name}</p>
      </div>
    );
  }
  if (name === "grass") {
    return (
      <div className=" mr-2 rounded-lg px-2 py-1 bg-green-600 ">
        <p className="text-sm text-green-100">{name}</p>
      </div>
    );
  }
  if (name === "poison") {
    return (
      <div className=" mr-2 rounded-lg px-2 py-1 bg-fuchsia-600 ">
        <p className="text-sm text-fuchsia-100">{name}</p>
      </div>
    );
  }
  if (name === "bug") {
    return (
      <div className=" mr-2 rounded-lg px-2 py-1 bg-lime-500 ">
        <p className="text-sm text-lime-100">{name}</p>
      </div>
    );
  }
  return (
    <div className=" mr-2 rounded-lg px-2 py-1 bg-gray-400">
      <p className="text-sm text-neutral-100">{name}</p>
    </div>
  );
}
