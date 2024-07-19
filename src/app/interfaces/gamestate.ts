import { Cell } from "./cell";
import { Player } from "./player";

export interface Gamestate {
    grid: Cell[][];
    isGameOver: boolean;
    isTie: boolean;
    winner: Player;
}
