import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpeechService {
    private synth: SpeechSynthesis;
    private utterance: SpeechSynthesisUtterance | null = null;

    constructor() {
        this.synth = window.speechSynthesis;
    }

    speak(text: string): void {
        // Cancel any ongoing speech
        if (this.synth.speaking) {
            this.synth.cancel();
        }

        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.rate = 0.9; // Slightly slower for clarity
        this.utterance.pitch = 1;
        this.utterance.volume = 1;
        this.utterance.lang = 'en-US';

        this.synth.speak(this.utterance);
    }

    stop(): void {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
    }

    isSpeaking(): boolean {
        return this.synth.speaking;
    }
}
