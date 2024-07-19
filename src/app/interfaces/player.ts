export interface Player {
    id: number;
    name: string;
    symbol: 'X' | 'O';
    correctAnswers: number;
    incorrectAnswers: number;
}
