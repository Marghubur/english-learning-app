import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';
import { WordDefinition } from '../models/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {
    private randomWordURL: string = 'https://random-word-api.herokuapp.com/word?number=5';
    private dictionaryUrl: string = 'https://api.dictionaryapi.dev/api/v2/entries/en';
    // Mock data based on the format provided
    constructor(private http: HttpClient) { }

    private getRandomWords(): Observable<string[]> {
        return this.http.get<string[]>(this.randomWordURL).pipe(
            catchError(err => {
                console.error('Random word API failed', err);
                return throwError(() => err);
            })
        );
    }

    private getWordDetails(word: string): Observable<any> {
        return this.http.get<any>(`${this.dictionaryUrl}/${word}`).pipe(
            catchError(err => {
                console.error('Word details API failed', err);
                return throwError(() => err);
            })
        );
    }

    getRandomWordsWithDetails(): Observable<any[]> {
        return this.getRandomWords().pipe(
            switchMap((words: string[]) => {
                const requests = words.map(word =>
                    this.getWordDetails(word).pipe(
                        catchError(() => of(null))  // Return null for failed requests
                    )
                );

                return forkJoin(requests);
            }),
            map(results => results.filter(res => res !== null).map(res => res[0]))  // Filter nulls and extract first element
        );
    }
}
