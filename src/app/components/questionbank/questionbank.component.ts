import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/interfaces/player';
import { Question } from 'src/app/interfaces/question';
import { GamestateService } from 'src/app/services/gamestate.service';
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

  constructor(private playerService: PlayerService, private questionService: QuestionService, private gameService: GamestateService){ }

  ngOnInit(): void {
    this.questions = this.questionService.getQuestions();
    this.questionService.setCurrentQuestion(1);
    this.reloadQuestion();
    this.currentPlayer = this.playerService.getCurrentPlayer();
    
   }

   selectAnswer(optionSelected: string, currentQuestion: Question): void {
    let nextQuestionId = currentQuestion.id + 1;
    let nextPlayerId = (this.currentPlayer.id === 1) ? 2 : 1;
    if (optionSelected === currentQuestion.answer) {
      this.playerService.currentPlayer.score++;
      this.questionService.setCurrentQuestion(nextQuestionId);
      this.playerService.setCurrentPlayer(nextPlayerId);
      this.feedbackText = "answer is correct!";
      this.showFeedback = true;
      setTimeout(() => {
        this.showFeedback = false;
        this.feedbackText = "";
        this.reloadQuestion();
      }, 1500);
    }
    else {
      this.questionService.setCurrentQuestion(nextQuestionId);
      this.playerService.setCurrentPlayer(nextPlayerId);
      this.feedbackText = "wrong answer, correct answer is: " + currentQuestion.answer;
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
  
}
