import { Routes } from '@angular/router';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { PodcastComponent } from './components/podcast/podcast.component';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NotesComponent } from './components/notes/notes.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/vocabulary', pathMatch: 'full' },
    { path: 'vocabulary', component: VocabularyComponent },
    { path: 'podcast', component: PodcastComponent },
    { path: 'news', component: NewsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'notes', component: NotesComponent, canActivate: [authGuard] }
];
