import { Injectable } from '@angular/core';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players: Player[] = [] as Player[];
  constructor() { }

  setPlayers(nameOfPlayerOne: string, nameOfPlayerTwo: string): void{
    let playerOne: Player =  {
      id: 1,
      name: nameOfPlayerOne,
      symbol: 'X'
    };

    let playerTwo: Player =  {
      id: 2,
      name: nameOfPlayerTwo,
      symbol: 'O'
    };

    this.players.push(playerOne, playerTwo);
  }
  
  resetPlayers(): void {
    this.players = [] as Player[];
  }

  getPlayers(): Player[] {
    return this.players;
  }

}
