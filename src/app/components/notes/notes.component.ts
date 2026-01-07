import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Note } from '../../models/models';

@Component({
    selector: 'app-notes',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    notes: Note[] = [];
    filteredNotes: Note[] = [];
    searchQuery: string = '';
    isEditing: boolean = false;
    currentNote: Partial<Note> = { title: '', content: '' };
    editingNoteId: string | null = null;
    loading: boolean = false;
    userName: string = '';

    constructor(
        private notesService: NotesService,
        private authService: AuthService
    ) {
        this.userName = this.authService.currentUserValue?.name || 'User';
    }

    ngOnInit(): void {
        this.loadNotes();
    }

    loadNotes(): void {
        this.loading = true;
        this.notesService.getNotes().subscribe({
            next: (notes) => {
                this.notes = notes.sort((a, b) =>
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );
                this.filteredNotes = this.notes;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading notes:', error);
                this.loading = false;
            }
        });
    }

    onSearch(): void {
        if (!this.searchQuery.trim()) {
            this.filteredNotes = this.notes;
            return;
        }

        const query = this.searchQuery.toLowerCase();
        this.filteredNotes = this.notes.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.content.toLowerCase().includes(query)
        );
    }

    newNote(): void {
        this.isEditing = true;
        this.currentNote = { title: '', content: '' };
        this.editingNoteId = null;
    }

    editNote(note: Note): void {
        this.isEditing = true;
        this.currentNote = { ...note };
        this.editingNoteId = note.id;
    }

    saveNote(): void {
        if (!this.currentNote.title?.trim() || !this.currentNote.content?.trim()) {
            return;
        }

        if (this.editingNoteId) {
            // Update existing note
            this.notesService.updateNote(this.editingNoteId, this.currentNote).subscribe({
                next: () => {
                    this.loadNotes();
                    this.cancelEdit();
                },
                error: (error) => {
                    console.error('Error updating note:', error);
                }
            });
        } else {
            // Create new note
            this.notesService.createNote(this.currentNote).subscribe({
                next: () => {
                    this.loadNotes();
                    this.cancelEdit();
                },
                error: (error) => {
                    console.error('Error creating note:', error);
                }
            });
        }
    }

    deleteNote(id: string): void {
        if (confirm('Are you sure you want to delete this note?')) {
            this.notesService.deleteNote(id).subscribe({
                next: () => {
                    this.loadNotes();
                },
                error: (error) => {
                    console.error('Error deleting note:', error);
                }
            });
        }
    }

    downloadNote(note: Note): void {
        this.notesService.downloadNoteAsTxt(note);
    }

    cancelEdit(): void {
        this.isEditing = false;
        this.currentNote = { title: '', content: '' };
        this.editingNoteId = null;
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getPreview(content: string): string {
        return content.length > 150 ? content.substring(0, 150) + '...' : content;
    }

    logout(): void {
        this.authService.logout();
        window.location.href = '/login';
    }
}
