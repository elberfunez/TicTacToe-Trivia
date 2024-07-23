import { Injectable } from '@angular/core';
import { Player } from '../interfaces/models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players: Player[] = [] as Player[];
  currentPlayer: Player = {} as Player;
  constructor() { }

  initializePlayers(nameOfPlayerOne: string, nameOfPlayerTwo: string): void{
    let playerOne: Player =  {
      id: 1,
      name: nameOfPlayerOne,
      symbol: 'X',
      correctAnswers: 0,
      incorrectAnswers: 0
    };

    let playerTwo: Player =  {
      id: 2,
      name: nameOfPlayerTwo,
      symbol: 'O',
      correctAnswers: 0,
      incorrectAnswers: 0
    };

    this.players.push(playerOne, playerTwo);
  }

  setCurrentPlayer(playerId: number): void {
    let player = this.players.find(p => p.id == playerId);
    if (player) {
      this.currentPlayer = player;
    }
  }
  
  resetPlayers(): void {
    this.players = [] as Player[];
  }

  getAllPlayers(): Player[] {
    return this.players;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

}
