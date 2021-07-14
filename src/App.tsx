import "./App.css";
import AddGame from "./components/AddGame";
import GamesList from "./components/GamesList";

function App() {
    return (
        <div className="app">
            <AddGame />
            <GamesList />
        </div>
    );
}

export default App;
