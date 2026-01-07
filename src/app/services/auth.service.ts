import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User, AuthResponse, LoginCredentials, SignupData } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000';
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public get isAuthenticated(): boolean {
        return !!this.currentUserValue && !!this.getToken();
    }

    signup(data: SignupData): Observable<AuthResponse> {
        // For demo purposes, we'll create a simple auth flow
        // In production, this would hash passwords on the backend
        return this.http.post<User>(`${this.apiUrl}/users`, {
            ...data,
            id: this.generateId(),
            createdAt: new Date()
        }).pipe(
            map(user => {
                const token = this.generateToken();
                const authResponse: AuthResponse = { user, token };
                this.setSession(authResponse);
                return authResponse;
            })
        );
    }

    login(credentials: LoginCredentials): Observable<AuthResponse> {
        // Check if user exists with matching credentials
        return this.http.get<User[]>(`${this.apiUrl}/users?email=${credentials.email}`).pipe(
            map(users => {
                if (users.length === 0) {
                    throw new Error('User not found');
                }
                const user = users[0];
                // In production, password would be hashed and verified on backend
                if (user.password !== credentials.password) {
                    throw new Error('Invalid password');
                }
                const token = this.generateToken();
                const authResponse: AuthResponse = {
                    user: { ...user, password: undefined },
                    token
                };
                this.setSession(authResponse);
                return authResponse;
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    private setSession(authResponse: AuthResponse): void {
        const userWithoutPassword = { ...authResponse.user, password: undefined };
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', authResponse.token);
        this.currentUserSubject.next(userWithoutPassword);
    }

    private generateToken(): string {
        return 'token_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
