import { Game } from "../firebase/model/game";

export type GameSnapshot = {
    id: string;
    data: Game;
};
