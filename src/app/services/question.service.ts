import { Injectable } from '@angular/core';
import { Question } from '../interfaces/models/question';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, retry, switchMap, throwError, timer } from 'rxjs';
import { TriviaApi } from '../interfaces/api/trivia-api';
import { decode } from 'he';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private lastRequestTime = 0;
  private readonly RATE_LIMIT_INTERVAL = 5000; // 5 seconds
  private apiUrl: string = 'https://opentdb.com/api.php?amount=40&category=9&difficulty=easy';
  currentQuestion: Question = {} as Question;
  questions: Question[] = [];
  
  constructor(private http: HttpClient) { }

  fetchQuestions(): Observable<Question[]> {
    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - this.lastRequestTime;
    const delay = timeSinceLastRequest < this.RATE_LIMIT_INTERVAL ? this.RATE_LIMIT_INTERVAL - timeSinceLastRequest : 0;

    return timer(delay).pipe(
      switchMap(() => {
        this.lastRequestTime = Date.now(); // Update the time of the last request
        return this.http.get<TriviaApi<Question>>(this.apiUrl).pipe(
          map(response => {
            console.log('API Response:', response); // Log response for debugging
            return response.results.map((question, index) => ({
              ...question,
              id: index + 1,
              question: decode(question.question),
              options: [question.correct_answer, ...question.incorrect_answers]
            }));
          }),
          retry({
            count: 3, // Retry 3 times
            delay: (error) => {
              if (error.status === 429) { // Rate limit error
                console.warn('Rate limit exceeded. Retrying...');
                return timer(this.RATE_LIMIT_INTERVAL); // Retry after the rate limit interval
              }
              return throwError(() => error); // For other errors, don't retry
            }
          }),
          catchError(error => {
            console.error('API Call Error:', error); // Log errors
            return throwError(() => new Error('Failed to load questions')); // Return an empty observable or error
          })
        );
      })
    );
  }

  setQuestionBank(questions: Question[]): void {
    this.questions = questions;
  }

  getQuestionbank(): Question[] {
    return this.questions;
  }
  

  setCurrentQuestion(questionId: number) : void {
    let question = this.questions.find(s => s.id === questionId);
    if (question) {
      this.currentQuestion = question;      
    }
   }
   getCurrentQuestion(): Question {
    return this.currentQuestion;
   }
   
   resetQuestions(): void {
    
   }
  
}
