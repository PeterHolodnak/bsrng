import "./css/App.css";
import AddGame from "./components/AddGame";
import GamesList from "./components/GamesList";

function App() {
    return (
        <div className="app">
            <h1>BS RNG</h1>
            <AddGame />
            <GamesList />
        </div>
    );
}

export default App;
