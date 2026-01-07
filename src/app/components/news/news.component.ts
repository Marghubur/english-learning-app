import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { NewsArticle } from '../../models/models';

@Component({
    selector: 'app-news',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    articles: NewsArticle[] = [];
    selectedArticle: NewsArticle | null = null;

    constructor(private newsService: NewsService) { }

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(): void {
        this.newsService.getArticles().subscribe({
            next: (articles) => {
                this.articles = articles;
            },
            error: (error) => {
                console.error('Error loading articles:', error);
            }
        });
    }

    selectArticle(article: NewsArticle): void {
        this.selectedArticle = article;
    }

    closeArticle(): void {
        this.selectedArticle = null;
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
