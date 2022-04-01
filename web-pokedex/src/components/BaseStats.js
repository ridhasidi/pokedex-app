import { useLocation } from "react-router-dom";
import StatComponent from "./StatComponent";

export default function BaseStats() {
  const { state } = useLocation();
  // console.log(state);
  return (
    <div>
      <div className="flex w-full flex-wrap justify-center ">
        {state.stats.map((e) => {
          return <StatComponent key={e.name} stats={e} />;
        })}
      </div>
    </div>
  );
}
