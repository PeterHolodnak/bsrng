import { useEffect, useState } from "react";
import { gamesCollection } from "../firebase/firebase";
import { Draw, Game } from "../firebase/model/game";
import "../css/game.scss";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    makeStyles,
    TextField,
} from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";

type GameSnapshot = {
    id: string;
    data: Game;
};

export default function GamesList() {
    const classes = useStyles();
    const [error, setError] = useState<string>();
    const [playerNameError, setPlayerNameError] = useState<boolean>();
    const [games, setGames] = useState<GameSnapshot[]>([]);
    const [player, setPlayer] = useState<string>("");

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

    const formatDate = (date: Date) => {
        const enFormat = new Intl.DateTimeFormat("cs", {
            dateStyle: "medium",
            timeStyle: "medium",
        });
        return enFormat.format(date);
    };

    const roll = async (snapshot: GameSnapshot) => {
        if (!player) {
            setPlayerNameError(true);
            return;
        }
        setPlayerNameError(false);

        const score = Math.floor(Math.random() * 6) + 1;

        const draws: Draw[] = [
            ...(snapshot.data.draws ?? []),
            { playerName: player, score },
        ];

        await gamesCollection.doc(snapshot.id).update({
            draws,
        });

        setPlayer("");
    };

    return (
        <Grid container spacing={6}>
            {games.map((game, gameIndex) => (
                <Grid item xs={12} md={6}>
                    <Card key={gameIndex} raised>
                        <CardHeader
                            className={classes.gameHeader}
                            title={game.data.name}
                            subheader={formatDate(game.data.date.toDate())}
                        >
                            <h3>{game.data.name}</h3>
                            {formatDate(game.data.date.toDate())}
                        </CardHeader>
                        <Divider></Divider>
                        <CardContent>
                            {!!game.data.draws?.length && (
                                <div className="game__draws">
                                    <List
                                        subheader={
                                            <ListSubheader
                                                component="div"
                                                id="nested-list-subheader"
                                            >
                                                Results
                                            </ListSubheader>
                                        }
                                    >
                                        {game.data.draws?.map(
                                            (draw, drawIndex) => (
                                                <ListItem key={drawIndex}>
                                                    <ListItemText
                                                        primary={
                                                            draw.playerName
                                                        }
                                                        secondary={draw.score}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </div>
                            )}
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <TextField
                                value={player}
                                onChange={(e) => setPlayer(e.target.value)}
                                className={classes.playerName}
                                label="Player name"
                                error={playerNameError}
                                helperText={
                                    playerNameError && "Fill player name"
                                }
                            />
                            <IconButton
                                onClick={() => roll(game)}
                                color="primary"
                            >
                                <CasinoIcon fontSize="large" />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            {error}
        </Grid>
    );
}

const useStyles = makeStyles({
    gameHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playerName: {
        flexGrow: 1,
    },
});
