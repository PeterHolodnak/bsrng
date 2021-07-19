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
import { useState } from "react";
import { Link } from "react-router-dom";
import { gamesCollection } from "../firebase/firebase";
import { Draw } from "../firebase/model/game";
import { GameSnapshot } from "../model/game-snapshot";

type PropsType = {
    snapshot: GameSnapshot;
    playerName?: string;
};

export default function GameDetail({ snapshot, playerName }: PropsType) {
    const classes = useStyles();
    const [player, setPlayer] = useState<string>(playerName || "");
    const [playerNameError, setPlayerNameError] = useState<boolean>();

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
        <Grid item xs={12} md={6}>
            <Card raised>
                <Link to={`/game/${snapshot.id}`}>
                    <CardHeader
                        className={classes.gameHeader}
                        title={snapshot.data.name}
                        subheader={formatDate(snapshot.data.date.toDate())}
                    ></CardHeader>
                </Link>
                <Divider></Divider>
                <CardContent>
                    {!!snapshot.data.draws?.length && (
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
                                {snapshot.data.draws?.map((draw, drawIndex) => (
                                    <ListItem key={drawIndex}>
                                        <ListItemText
                                            primary={draw.playerName}
                                            secondary={draw.score}
                                        />
                                    </ListItem>
                                ))}
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
                        helperText={playerNameError && "Fill player name"}
                    />
                    <IconButton onClick={() => roll(snapshot)} color="primary">
                        <CasinoIcon fontSize="large" />
                    </IconButton>
                </CardActions>
            </Card>
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
