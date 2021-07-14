import { useEffect, useState } from "react";
import { gamesCollection } from "../firebase/firebase";
import { Game } from "../firebase/model/game";

export default function GamesList() {
    const [error, setError] = useState<string>();
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        // Call .onSnapshot() to listen to changes
        const unsubscribe = gamesCollection.onSnapshot(
            (snapshot) => {
                // Access .docs property of snapshot
                setGames(snapshot.docs.map((doc) => doc.data()));
            },
            (err) => setError(err.message)
        );

        // Call unsubscribe in the cleanup of the hook
        return () => unsubscribe();
    }, []);

    const formatDate = (date: Date) => {
        const enFormat = new Intl.DateTimeFormat("cs", {
            year: "numeric",
            month: "numeric",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
        return enFormat.format(date);
    };

    return (
        <div>
            {games.map((game, i) => (
                <div className="game" key={i}>
                    <div className="game__name">{game.name}</div>
                    <div className="game__date">
                        {formatDate(game.date.toDate())}
                    </div>
                </div>
            ))}
            {error}
        </div>
    );
}
