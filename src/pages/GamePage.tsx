import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GameDetail from "../components/GameDetail";
import { gamesCollection } from "../firebase/firebase";
import { GameSnapshot } from "../model/game-snapshot";
import queryString from "query-string";
import { Game } from "../firebase/model/game";

export default function GamePage() {
    const { id } = useParams<{ id: string }>();
    const [gameSnapshot, setGameSnapshot] = useState<GameSnapshot>();
    const [player, setPlayer] = useState<string>();

    useEffect(() => {
        let unsubscribe: () => void = () => {};

        const setData = (data?: Game) => {
            if (data) {
                setGameSnapshot({
                    id,
                    data,
                });
            }
        };

        const fetchGame = async () => {
            const doc = gamesCollection.doc(id);

            unsubscribe = doc.onSnapshot((snapshot) => {
                setData(snapshot.data());
            });

            const data = await (await doc.get()).data();
            setData(data);
        };

        fetchGame();

        return () => unsubscribe();
    }, [id]);

    const { search } = useLocation();
    useEffect(() => {
        const { player } = queryString.parse(search);
        if (typeof player === "string") {
            setPlayer(player);
        }
    }, [search]);

    return (
        <Grid container justifyContent="center">
            {gameSnapshot ? (
                <GameDetail snapshot={gameSnapshot} playerName={player} />
            ) : (
                "No such game"
            )}
        </Grid>
    );
}
