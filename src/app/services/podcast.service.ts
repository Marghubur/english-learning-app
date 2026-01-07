import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Podcast } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class PodcastService {
    private mockPodcasts: Podcast[] = [
        {
            id: '1',
            title: 'English Pronunciation Practice',
            description: 'Learn proper pronunciation of common English words and phrases',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            duration: 300, // 5 minutes
            thumbnail: 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=Pronunciation'
        },
        {
            id: '2',
            title: 'Daily English Conversation',
            description: 'Practice everyday English conversations and improve your speaking skills',
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            duration: 300,
            thumbnail: 'https://via.placeholder.com/300x300/7C3AED/FFFFFF?text=Conversation'
        }
    ];

    constructor() { }

    getPodcasts(): Observable<Podcast[]> {
        return of(this.mockPodcasts);
    }

    getPodcastById(id: string): Observable<Podcast | undefined> {
        const podcast = this.mockPodcasts.find(p => p.id === id);
        return of(podcast);
    }
}
