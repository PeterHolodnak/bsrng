import firebase from "firebase";
import { useState } from "react";
import { gamesCollection } from "../firebase/firebase";
import "../css/game-add.scss";

export default function AddGame() {
    const [gameName, setGameName] = useState("");

    const addGame = () => {
        gamesCollection.add({
            name: gameName,
            date: firebase.firestore.Timestamp.now(),
            draws: [],
        });
        setGameName("");
    };

    return (
        <div className="game__add">
            <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Insert new game name"
            />
            <button type="button" onClick={addGame}>
                Add game
            </button>
        </div>
    );
}
