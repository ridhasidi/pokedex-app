import { Routes, Route } from "react-router-dom";
import "./App.css";
import BaseStats from "./components/BaseStats";
import Moves from "./components/Moves";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pokemons/:id" element={<PokemonDetail />}>
          <Route path="stats" element={<BaseStats />} />
          <Route path="moves" element={<Moves />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
