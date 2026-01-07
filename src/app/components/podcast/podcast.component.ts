import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastService } from '../../services/podcast.service';
import { Podcast } from '../../models/models';

@Component({
    selector: 'app-podcast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {
    podcasts: Podcast[] = [];
    currentPodcast: Podcast | null = null;
    isPlaying: boolean = false;
    currentTime: number = 0;
    duration: number = 0;
    volume: number = 1;

    constructor(private podcastService: PodcastService) { }

    ngOnInit(): void {
        this.loadPodcasts();
    }

    loadPodcasts(): void {
        this.podcastService.getPodcasts().subscribe({
            next: (podcasts) => {
                this.podcasts = podcasts;
                if (podcasts.length > 0) {
                    this.selectPodcast(podcasts[0]);
                }
            },
            error: (error) => {
                console.error('Error loading podcasts:', error);
            }
        });
    }

    selectPodcast(podcast: Podcast): void {
        this.currentPodcast = podcast;
        this.isPlaying = false;
        this.currentTime = 0;
        const audio = this.getAudioElement();
        if (audio) {
            audio.src = podcast.audioUrl;
            audio.load();
        }
    }

    togglePlayPause(): void {
        const audio = this.getAudioElement();
        if (!audio) return;

        if (this.isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        this.isPlaying = !this.isPlaying;
    }

    onTimeUpdate(event: Event): void {
        const audio = event.target as HTMLAudioElement;
        this.currentTime = audio.currentTime;
        this.duration = audio.duration;
    }

    onEnded(): void {
        this.isPlaying = false;
        this.currentTime = 0;
    }

    seek(event: Event): void {
        const input = event.target as HTMLInputElement;
        const audio = this.getAudioElement();
        if (audio) {
            audio.currentTime = parseFloat(input.value);
        }
    }

    changeVolume(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.volume = parseFloat(input.value);
        const audio = this.getAudioElement();
        if (audio) {
            audio.volume = this.volume;
        }
    }

    private getAudioElement(): HTMLAudioElement | null {
        return document.getElementById('audio-player') as HTMLAudioElement;
    }

    formatTime(seconds: number): string {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    getProgress(): number {
        if (!this.duration) return 0;
        return (this.currentTime / this.duration) * 100;
    }
}
