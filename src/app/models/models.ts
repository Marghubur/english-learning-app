// Word Definition Models
export interface Phonetic {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: License;
}

export interface License {
  name: string;
  url: string;
}

export interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface WordDefinition {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license?: License;
  sourceUrls?: string[];
}

// Podcast Model
export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // in seconds
  thumbnail?: string;
}

// News Article Model
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: Date;
  imageUrl?: string;
  category: string;
}

// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only used for registration, not stored in frontend
  createdAt?: Date;
}

// Note Model
export interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

// Auth Response
export interface AuthResponse {
  user: User;
  token: string;
}

// Login Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Signup Data
export interface SignupData {
  name: string;
  email: string;
  password: string;
}
