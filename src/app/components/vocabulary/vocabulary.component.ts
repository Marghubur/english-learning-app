import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyService } from '../../services/vocabulary.service';
import { SpeechService } from '../../services/speech.service';
import { WordDefinition, Meaning, Definition } from '../../models/models';

@Component({
    selector: 'app-vocabulary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './vocabulary.component.html',
    styleUrls: ['./vocabulary.component.css']
})
export class VocabularyComponent implements OnInit {
    words: WordDefinition[] = [];
    loading: boolean = false;

    constructor(
        private vocabularyService: VocabularyService,
        private speechService: SpeechService
    ) { }

    ngOnInit(): void {
        this.loadRandomWords();
    }

    loadRandomWords(): void {
        this.loading = true;
        this.vocabularyService.getRandomWordsWithDetails().subscribe({
            next: (words: WordDefinition[]) => {
                this.words = words;
                console.log(this.words);
            },
            error: (error: any) => {
                console.error('Error fetching words:', error);
            },
            complete: () => {
                this.loading = false;
            }
        });
    }

    speakWord(word: string): void {
        this.speechService.speak(word);
    }

    refresh(): void {
        this.loadRandomWords();
    }

    getSynonyms(meaning: Meaning): string {
        const allSynonyms = new Set<string>();
        meaning.definitions.forEach(def => {
            def.synonyms.forEach(syn => allSynonyms.add(syn));
        });
        meaning.synonyms.forEach(syn => allSynonyms.add(syn));
        return Array.from(allSynonyms).slice(0, 5).join(', ') || 'N/A';
    }

    getAntonyms(meaning: Meaning): string {
        const allAntonyms = new Set<string>();
        meaning.definitions.forEach(def => {
            def.antonyms.forEach(ant => allAntonyms.add(ant));
        });
        meaning.antonyms.forEach(ant => allAntonyms.add(ant));
        return Array.from(allAntonyms).slice(0, 5).join(', ') || 'N/A';
    }
}
