import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import GameDetail from "../components/GameDetail";
import { gamesCollection } from "../firebase/firebase";
import { GameSnapshot } from "../model/game-snapshot";
import queryString from "query-string";

export default function GamePage() {
    const { id } = useParams<{ id: string }>();
    const [snapshot, setSnapshot] = useState<GameSnapshot>();
    const [player, setPlayer] = useState<string>();

    useEffect(() => {
        const fetchGame = async () => {
            const data = await (await gamesCollection.doc(id).get()).data();
            if (data) {
                setSnapshot({
                    id,
                    data,
                });
            }
        };

        fetchGame();
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
            {snapshot ? (
                <GameDetail snapshot={snapshot} playerName={player} />
            ) : (
                "No such game"
            )}
        </Grid>
    );
}
