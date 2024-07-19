import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamestateService } from 'src/app/services/gamestate.service';
import { PlayerService } from 'src/app/services/player.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playerOneName: string = "";
  playerTwoName: string = "";
  showErrorAlert: boolean = false;

  constructor(
    private playerService: PlayerService,
    private questionService: QuestionService,
    private router: Router,
    private gameStateService: GamestateService
  ){ }

  ngOnInit(): void {
    this.playerService.resetPlayers();
  }

  navigateToQuestionBank(): void {
    if (this.areBothUsersEntered()) {
      this.playerService.initializePlayers(this.playerOneName, this.playerTwoName);
      this.playerService.setCurrentPlayer(1);
      this.questionService.setCurrentQuestion(1);
      this.gameStateService.initializeGameState();
      this.router.navigate(['/questionbank']);
    }
    else {
      this.setErrorMsg();
    }
  }
  
  areBothUsersEntered(): boolean {
    return !(this.playerOneName === '' || this.playerTwoName === '');
  }

  setErrorMsg(): void {
    this.showErrorAlert = true;

    setTimeout(() => {
      this.showErrorAlert = false;
    }, 2000);
  }

}
