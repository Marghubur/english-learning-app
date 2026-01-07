import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    private mockArticles: NewsArticle[] = [
        {
            id: '1',
            title: 'The Benefits of Learning English in the Digital Age',
            excerpt: 'Discover how technology has revolutionized language learning and made English more accessible than ever before.',
            content: `In today's interconnected world, English has become the lingua franca of business, science, and technology. The digital age has brought unprecedented opportunities for language learners, with countless resources available at our fingertips.

Online platforms, mobile applications, and interactive tools have transformed the way we approach language learning. From video tutorials to AI-powered chatbots, learners can now practice English anytime, anywhere. This flexibility has made it easier for people from all walks of life to improve their language skills.

Moreover, the ability to connect with native speakers through social media and language exchange platforms has created authentic learning experiences. These interactions provide invaluable practice in real-world contexts, helping learners develop both fluency and cultural understanding.

The integration of gamification elements in language learning apps has also made the process more engaging and enjoyable. By turning lessons into interactive challenges, these tools maintain learner motivation and encourage consistent practice.

As we continue to advance technologically, the future of English language learning looks brighter than ever. Virtual reality, augmented reality, and artificial intelligence promise to create even more immersive and personalized learning experiences.`,
            author: 'Dr. Sarah Johnson',
            publishedDate: new Date('2026-01-05'),
            imageUrl: 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Digital+Learning',
            category: 'Education'
        },
        {
            id: '2',
            title: 'Mastering English Pronunciation: Tips from Language Experts',
            excerpt: 'Expert linguists share their proven strategies for improving English pronunciation and speaking with confidence.',
            content: `Pronunciation is often one of the most challenging aspects of learning English. However, with the right approach and consistent practice, anyone can improve their speaking skills significantly.

According to leading linguists, the key to mastering pronunciation lies in understanding the phonetic system of English. This includes recognizing the different sounds, stress patterns, and intonation that characterize native speech.

One effective technique is shadowing, where learners listen to native speakers and immediately repeat what they hear. This method helps develop muscle memory for correct pronunciation and improves listening comprehension simultaneously.

Another crucial aspect is understanding word stress and sentence rhythm. English is a stress-timed language, meaning that stressed syllables occur at regular intervals. Mastering this rhythm can make your speech sound more natural and easier to understand.

Recording yourself speaking and comparing it to native speakers can also provide valuable feedback. Many learners are surprised to discover specific areas where their pronunciation differs from the target sound.

Finally, don't be afraid to make mistakes. Language learning is a journey, and every error is an opportunity to improve. With patience, practice, and the right resources, you can achieve clear and confident English pronunciation.`,
            author: 'Prof. Michael Chen',
            publishedDate: new Date('2026-01-03'),
            imageUrl: 'https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Pronunciation',
            category: 'Language Tips'
        },
        {
            id: '3',
            title: 'Building Vocabulary: The Foundation of Language Fluency',
            excerpt: 'Learn effective strategies for expanding your English vocabulary and retaining new words long-term.',
            content: `A robust vocabulary is essential for effective communication in English. Research shows that vocabulary size is one of the strongest predictors of reading comprehension and overall language proficiency.

The most effective way to build vocabulary is through extensive reading. When you encounter new words in context, you're more likely to understand their meaning and remember them. Reading diverse materials—from news articles to novels—exposes you to words used in different contexts.

Spaced repetition is another powerful technique for vocabulary retention. This method involves reviewing new words at increasing intervals, which helps transfer them from short-term to long-term memory. Many digital flashcard apps use this principle to optimize learning.

Creating personal connections with new words can also enhance retention. Try to use new vocabulary in sentences related to your own life, or create mental images that link the word to its meaning.

It's important to learn words in context rather than in isolation. Understanding how a word is used in different situations helps you grasp its nuances and use it appropriately in your own speech and writing.

Finally, active use is crucial. Make a conscious effort to incorporate new vocabulary into your daily conversations and writing. The more you use a word, the more natural it becomes.`,
            author: 'Emma Rodriguez',
            publishedDate: new Date('2026-01-01'),
            imageUrl: 'https://via.placeholder.com/800x400/EC4899/FFFFFF?text=Vocabulary',
            category: 'Learning Strategies'
        }
    ];

    constructor() { }

    getArticles(): Observable<NewsArticle[]> {
        return of(this.mockArticles);
    }

    getArticleById(id: string): Observable<NewsArticle | undefined> {
        const article = this.mockArticles.find(a => a.id === id);
        return of(article);
    }
}
