import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cell } from 'src/app/interfaces/models/cell';
import { Gamestate } from 'src/app/interfaces/models/gamestate';
import { Player } from 'src/app/interfaces/models/player';
import { GamestateService } from 'src/app/services/gamestate.service';
import { PlayerService } from 'src/app/services/player.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  currentPlayer: Player = {} as Player;
  currentGameState: Gamestate = {} as Gamestate;
  resultText: string = "";

  constructor(
    private playerService: PlayerService,
    private questionService: QuestionService,
    private router: Router,
    private gameStateService: GamestateService
  ){ }

  ngOnInit(): void {
    this.currentPlayer = this.playerService.getCurrentPlayer();
    this.currentGameState = this.gameStateService.getGameState();
    this.refreshGameBoard();
  }

  makeMove(row: number, col: number): void {
    let nextQuestionId =  this.questionService.getCurrentQuestion().id + 1;
    let nextPlayerId = (this.currentPlayer.id === 1) ? 2 : 1;
    let cellColor = (this.currentPlayer.id === 1) ? '#89c499': '#fff685'; // light green p1 or light yellow p2 
    if (this.currentGameState.grid[row][col].symbol === null) {
      let cell: Cell = { symbol: this.currentPlayer.symbol, color: cellColor };
      this.currentGameState.grid[row][col] = cell;
      this.gameStateService.updateGameState(this.currentGameState);
      if (this.checkForWin(row, col) && !this.areAllCellsFilled()) {
        this.currentGameState.isGameOver = true;
        this.currentGameState.isTie = false;
        this.currentGameState.winner = this.currentPlayer;
        this.currentGameState.grid = this.currentGameState.grid;
        this.gameStateService.updateGameState(this.currentGameState);
      }
      else if (!this.checkForWin(row,col) && this.areAllCellsFilled()) {
        this.currentGameState.isGameOver = true;
        this.currentGameState.isTie = true;
        this.currentGameState.winner = this.currentPlayer;
        this.currentGameState.grid = this.currentGameState.grid;
        this.gameStateService.updateGameState(this.currentGameState);
      }
      else {
        setTimeout(() => {
          this.questionService.setCurrentQuestion(nextQuestionId);
          this.playerService.setCurrentPlayer(nextPlayerId);
          this.router.navigate(['/questionbank']);
        }, 1500);
      } 
    }
  }

  refreshGameBoard(): void {
    this.currentGameState = this.gameStateService.getGameState();
  }

  checkForWin(row: number, col: number): boolean {
    const symbol = this.currentGameState.grid[row][col].symbol;
    if (!symbol) {
      return false;
    }

    // Check row
    if (this.currentGameState.grid[row].every(cell => cell.symbol === symbol)) {
      return true;
    }

    // Check column
    if (this.currentGameState.grid.every(r => r[col].symbol === symbol)) {
      return true;
    }

    // Check main diagonal
    if (row === col && this.currentGameState.grid.every((r, index) => r[index].symbol === symbol)) {
      return true;
    }

    // Check anti-diagonal
    if (row + col === 2 && this.currentGameState.grid.every((r, index) => r[2 - index].symbol === symbol)) {
      return true;
    }

    return false;
  }

  areAllCellsFilled(): boolean {
    return this.currentGameState.grid.flat().every(cell => cell.symbol !== null);
  }

  resetGame(): void {
    this.playerService.resetPlayers();
    this.gameStateService.startNewGame();
    this.questionService.resetQuestions();
    this.router.navigate(['']);
  }

}
