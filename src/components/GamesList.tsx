import { useEffect, useState } from "react";
import { gamesCollection } from "../firebase/firebase";
import "../css/game.scss";
import GameDetail from "./GameDetail";
import { GameSnapshot } from "../model/game-snapshot";
import { Grid } from "@material-ui/core";

export default function GamesList() {
    const [error, setError] = useState<string>();
    const [games, setGames] = useState<GameSnapshot[]>([]);

    useEffect(() => {
        // Call .onSnapshot() to listen to changes
        const unsubscribe = gamesCollection.onSnapshot(
            (snapshot) => {
                setGames(
                    snapshot.docs
                        .map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                        .sort(
                            (a, b) =>
                                b.data.date.toDate().getTime() -
                                a.data.date.toDate().getTime()
                        )
                );
            },
            (err) => setError(err.message)
        );

        // Call unsubscribe in the cleanup of the hook
        return () => unsubscribe();
    }, []);

    return (
        <Grid container spacing={6}>
            {games.map((game, gameIndex) => (
                <GameDetail key={gameIndex} snapshot={game} />
            ))}
            {error}
        </Grid>
    );
}
