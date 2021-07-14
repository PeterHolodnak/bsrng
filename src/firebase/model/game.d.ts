export type Draw = {
    playerName: string;
    score: number;
};

export type Game = {
    name: string;
    date: firebase.firestore.Timestamp;
    draws: Draw[];
};
