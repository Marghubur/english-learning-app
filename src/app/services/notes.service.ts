import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/models';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    private apiUrl = 'http://localhost:3000/notes';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    getNotes(): Observable<Note[]> {
        const userId = this.authService.currentUserValue?.id;
        return this.http.get<Note[]>(`${this.apiUrl}?userId=${userId}`);
    }

    getNote(id: string): Observable<Note> {
        return this.http.get<Note>(`${this.apiUrl}/${id}`);
    }

    createNote(note: Partial<Note>): Observable<Note> {
        const userId = this.authService.currentUserValue?.id;
        const newNote = {
            ...note,
            userId,
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return this.http.post<Note>(this.apiUrl, newNote);
    }

    updateNote(id: string, note: Partial<Note>): Observable<Note> {
        const updatedNote = {
            ...note,
            updatedAt: new Date()
        };
        return this.http.patch<Note>(`${this.apiUrl}/${id}`, updatedNote);
    }

    deleteNote(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    downloadNoteAsTxt(note: Note): void {
        const content = `${note.title}\n\n${note.content}\n\nCreated: ${new Date(note.createdAt).toLocaleString()}\nLast Updated: ${new Date(note.updatedAt).toLocaleString()}`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
