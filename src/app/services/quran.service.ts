import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Surah {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
}

export interface Verse {
  id: number;
  text: string;
  translation_en?: string;
  audio?: {
    primary: string;
    secondary?: string[];
  };
}

export interface SurahDetail {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  audio: {
    [key: string]: {
      reciter: string;
      url: string;
      originalUrl: string;
    };
  };
  english: string[];
  arabic1: string[];
  arabic2?: string[];
  bengali?: string[];
  urdu?: string[];
  uzbek?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class QuranService {
  private baseUrl = 'https://quranapi.pages.dev/api';
  private audioBaseUrl = 'https://the-quran-project.github.io/Quran-Audio/Data';

  constructor(private http: HttpClient) {}

  getAllSurahs(): Observable<Surah[]> {
    return this.http.get<Surah[]>(`${this.baseUrl}/surah.json`);
  }

  getSurahDetail(surahNo: number): Observable<SurahDetail> {
    return this.http.get<SurahDetail>(`${this.baseUrl}/${surahNo}.json`);
  }

  getVerse(surahNo: number, ayahNo: number): Observable<Verse> {
    return this.http.get<Verse>(`${this.baseUrl}/${surahNo}/${ayahNo}.json`);
  }

  getAudioUrl(reciterNo: number = 2, surahNo: number, ayahNo: number): string {
    return `${this.audioBaseUrl}/${reciterNo}/${surahNo}_${ayahNo}.mp3`;
  }

  getChapterAudioUrl(reciterNo: number = 2, surahNo: number): string {
    return `https://github.com/The-Quran-Project/Quran-Audio-Chapters/raw/refs/heads/main/Data/${reciterNo}/${surahNo}.mp3`;
  }
}
