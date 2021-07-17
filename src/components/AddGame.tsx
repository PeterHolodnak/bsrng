import firebase from "firebase";
import { useState } from "react";
import { gamesCollection } from "../firebase/firebase";
import "../css/game-add.scss";
import { Button, makeStyles, TextField } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";

export default function AddGame() {
    const classes = useStyles();
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
        <div className={classes.gameAdd}>
            <TextField
                variant="outlined"
                label="Game name"
                placeholder="Add new game name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddBoxIcon />}
                onClick={addGame}
            >
                Add game
            </Button>
        </div>
    );
}

const useStyles = makeStyles({
    gameAdd: {
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        paddingBottom: 40,
    },
});
