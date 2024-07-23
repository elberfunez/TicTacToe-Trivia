export interface TriviaApi<T> {
    response_code: number;
    results: T[];
}
