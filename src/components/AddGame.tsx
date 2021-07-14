import firebase from "firebase";
import { useState } from "react";
import { gamesCollection } from "../firebase/firebase";

export default function AddGame() {
    const [gameName, setGameName] = useState("");

    const addGame = () => {
        gamesCollection.add({
            name: gameName,
            date: firebase.firestore.Timestamp.now(),
        });
        setGameName("");
    };

    return (
        <div>
            <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Insert new game name"
            />
            <button type="button" onClick={addGame}>
                AddGame
            </button>
        </div>
    );
}
