import { Injectable } from '@angular/core';
import { Gamestate } from '../interfaces/models/gamestate';
import { Cell } from '../interfaces/models/cell';
import { Player } from '../interfaces/models/player';

@Injectable({
  providedIn: 'root'
})
export class GamestateService {
  gameState: Gamestate = {} as Gamestate;
  gameboard: Cell[][] = [
    [{ symbol: null, color: null }, { symbol: null, color: null }, { symbol: null, color: null }],
    [{ symbol: null, color: null }, { symbol: null, color: null }, { symbol: null, color: null }],
    [{ symbol: null, color: null }, { symbol: null, color: null }, { symbol: null, color: null }]
  ];

  constructor() { }

  initializeGameState(): void {
    this.startNewGame();
  }

  updateGameState(currentGamestate: Gamestate): void {
    this.gameState = currentGamestate;
  }

  getGameBoard(): Cell[][] {
    return this.gameState.grid;
  }

  getGameState(): Gamestate {
    return this.gameState
  }

  startNewGame(): void {
    this.gameState.grid = [
      [{ symbol: null, color: null }, { symbol: null, color: null }, { symbol: null, color: null }],
      [{ symbol: null, color: null }, { symbol: null, color: null }, { symbol: null, color: null }],
      [{ symbol: null, color: null }, { symbol: null, color: null }, { symbol: null, color: null }]
    ];
    this.gameState.isGameOver = false;
    this.gameState.isTie = false;
    this.gameState.winner = {} as Player;
  }

}
