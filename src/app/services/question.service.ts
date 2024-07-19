import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  currentQuestion: Question = {} as Question;
  questions: Question[] = [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      answer: 'Paris'
    },
    {
      id: 2,
      text: 'Who wrote the play "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
      answer: 'William Shakespeare'
    },
    {
      id: 3,
      text: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars'
    },
    {
      id: 4,
      text: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      answer: 'Pacific Ocean'
    },
    {
      id: 5,
      text: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
      answer: 'Leonardo da Vinci'
    },
    {
      id: 6,
      text: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Hg'],
      answer: 'Au'
    },
    {
      id: 7,
      text: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Earth', 'Mercury', 'Mars'],
      answer: 'Mercury'
    },
    {
      id: 8,
      text: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Iron', 'Diamond', 'Quartz'],
      answer: 'Diamond'
    },
    {
      id: 9,
      text: 'What gas do plants absorb from the atmosphere?',
      options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'],
      answer: 'Carbon Dioxide'
    },
    {
      id: 10,
      text: 'How many bones are in the adult human body?',
      options: ['206', '205', '208', '210'],
      answer: '206'
    },
    {
      id: 11,
      text: 'In which year did the Titanic sink?',
      options: ['1905', '1912', '1915', '1920'],
      answer: '1912'
    },
    {
      id: 12,
      text: 'Who was the first President of the United States?',
      options: ['Thomas Jefferson', 'Abraham Lincoln', 'George Washington', 'John Adams'],
      answer: 'George Washington'
    },
    {
      id: 13,
      text: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Japan', 'South Korea', 'Thailand'],
      answer: 'Japan'
    },
    {
      id: 14,
      text: 'What is the longest river in the world?',
      options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
      answer: 'Nile River'
    },
    {
      id: 15,
      text: 'Who was the famous female pharaoh of Egypt?',
      options: ['Nefertiti', 'Cleopatra', 'Hatshepsut', 'Tutankhamun'],
      answer: 'Hatshepsut'
    },
    {
      id: 16,
      text: 'Which movie won the Academy Award for Best Picture in 1994?',
      options: ['Forrest Gump', 'Pulp Fiction', 'The Shawshank Redemption', 'The Lion King'],
      answer: 'Forrest Gump'
    },
    {
      id: 17,
      text: 'Who played the character Jack Dawson in the film "Titanic"?',
      options: ['Matt Damon', 'Leonardo DiCaprio', 'Brad Pitt', 'Johnny Depp'],
      answer: 'Leonardo DiCaprio'
    },
    {
      id: 18,
      text: 'What TV series features a character named Sheldon Cooper?',
      options: ['Friends', 'How I Met Your Mother', 'The Big Bang Theory', 'The Office'],
      answer: 'The Big Bang Theory'
    },
    {
      id: 19,
      text: 'Which band is known for the hit song "Hey Jude"?',
      options: ['The Rolling Stones', 'The Beatles', 'The Who', 'Led Zeppelin'],
      answer: 'The Beatles'
    },
    {
      id: 20,
      text: 'Who wrote the novel "1984"?',
      options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'J.D. Salinger'],
      answer: 'George Orwell'
    }
  ];
  
  constructor() { }

  getQuestions(): Question[] {
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
  
}
