import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playerOneName: string = "";
  playerTwoName: string = "";
  showErrorAlert: boolean = false;

  constructor(private playerService: PlayerService, private router: Router){ }

  ngOnInit(): void {
    this.playerService.resetPlayers();
  }

  navigateToQuestionBank(): void {
    if (this.areBothUsersEntered()) {
      this.playerService.initializePlayers(this.playerOneName, this.playerTwoName);
      this.playerService.setCurrentPlayer(1);
      this.router.navigate(['/questionbank']);
    }
    else {
      this.setErroMsg();
    }
  }
  
  areBothUsersEntered(): boolean {
    return !(this.playerOneName === '' || this.playerTwoName === '');
  }

  setErroMsg(): void {
    this.showErrorAlert = true;

    setTimeout(() => {
      this.showErrorAlert = false;
    }, 2000);
  }

}
