import { useEffect, useState } from "react";
import { gamesCollection } from "../firebase/firebase";
import { Draw, Game } from "../firebase/model/game";
import "../css/game.scss";

type GameSnapshot = {
    id: string;
    data: Game;
};

export default function GamesList() {
    const [error, setError] = useState<string>();
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
        const score = Math.floor(Math.random() * 6) + 1;

        const draws: Draw[] = [
            ...(snapshot.data.draws ?? []),
            { playerName: player ?? "Lazy not name-filling person", score },
        ];

        await gamesCollection.doc(snapshot.id).update({
            draws,
        });

        setPlayer("");
    };

    return (
        <>
            {games.map((game, gameIndex) => (
                <div className="game" key={gameIndex}>
                    <div className="game__header">
                        <h3 className="game__name">{game.data.name}</h3>
                        <div className="game__date">
                            {formatDate(game.data.date.toDate())}
                        </div>
                    </div>
                    {!!game.data.draws?.length && (
                        <div className="game__draws">
                            <h4>Results</h4>
                            {game.data.draws?.map((draw, drawIndex) => (
                                <div className="game__draw" key={drawIndex}>
                                    <span className="game__player">
                                        {draw.playerName}
                                    </span>
                                    :&nbsp;
                                    <span className="game__score">
                                        {draw.score}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <input
                        type="text"
                        value={player}
                        onChange={(e) => setPlayer(e.target.value)}
                        placeholder="Insert player name"
                    />
                    <button type="button" onClick={() => roll(game)}>
                        Roll
                    </button>
                </div>
            ))}
            {error}
        </>
    );
}
