import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="pokemons/:id" element={<PokemonDetail />} />
      </Routes>
    </div>
  );
}

export default App;
