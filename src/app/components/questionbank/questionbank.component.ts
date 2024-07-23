import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/models/player';
import { Question } from 'src/app/interfaces/models/question';
import { PlayerService } from 'src/app/services/player.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrls: ['./questionbank.component.css']
})
export class QuestionbankComponent implements OnInit {
  questions: Question[] = [] as Question[];
  currentQuestion: Question = {} as Question;
  currentPlayer: Player = {} as Player;
  showFeedback: boolean = false;
  feedbackText: string = "";

  constructor(private playerService: PlayerService, private questionService: QuestionService, private router: Router){ }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestionbank();
    this.reloadQuestion();
    this.currentPlayer = this.playerService.getCurrentPlayer();
   }

   selectAnswer(optionSelected: string, currentQuestion: Question): void {
    let nextQuestionId = currentQuestion.id + 1;
    let nextPlayerId = (this.currentPlayer.id === 1) ? 2 : 1;
    if (optionSelected === currentQuestion.correct_answer) {
      this.playerService.currentPlayer.correctAnswers++;
      this.feedbackText = "answer is correct!";
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
        this.feedbackText = "";
        this.navigateToGameGrid();
      }, 1500);
    }
    else {
      this.playerService.currentPlayer.incorrectAnswers++;
      this.questionService.setCurrentQuestion(nextQuestionId);
      this.playerService.setCurrentPlayer(nextPlayerId);
      this.feedbackText = "wrong answer, correct answer is: " + currentQuestion.correct_answer;
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
        this.feedbackText = "";
        this.reloadQuestion();
      }, 1500);
    }
   }

   reloadQuestion(): void {
    this.currentQuestion = this.questionService.getCurrentQuestion();
    this.currentPlayer = this.playerService.getCurrentPlayer();
   }

   navigateToGameGrid(): void {
    this.router.navigate(['/gameboard']);
  }
  
}
