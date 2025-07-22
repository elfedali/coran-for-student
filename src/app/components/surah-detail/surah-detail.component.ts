import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuranService, SurahDetail } from '../../services/quran.service';

@Component({
  selector: 'app-surah-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <button (click)="goBack()">← Back to Surahs</button>

      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error">{{ error }}</div>

      <div *ngIf="surahDetail">
        <h1>{{ surahDetail.surahNameArabic }}</h1>
        <h2>{{ surahDetail.surahName }}</h2>
        <p>{{ surahDetail.surahNameTranslation }}</p>

        <div *ngFor="let verse of surahDetail.arabic1; let i = index">
          <div class="verse">
            <span class="verse-number">{{ i + 1 }}</span>
            <p class="arabic">{{ verse }}</p>
            <p
              class="english"
              *ngIf="surahDetail.english && surahDetail.english[i]"
            >
              {{ surahDetail.english[i] }}
            </p>
            <button (click)="playVerse(i + 1)">Play</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      .verse {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .verse-number {
        background: #4caf50;
        color: white;
        padding: 4px 8px;
        border-radius: 50%;
      }
      .arabic {
        font-family: 'Amiri', serif;
        font-size: 1.5em;
        text-align: right;
        direction: rtl;
      }
      .english {
        font-style: italic;
        color: #666;
      }
      button {
        background: #4caf50;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class SurahDetailComponent implements OnInit {
  surahDetail: SurahDetail | null = null;
  loading = true;
  error: string | null = null;
  private surahId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quranService: QuranService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.surahId = +params['id'];
      if (this.surahId) {
        this.loadSurah();
      }
    });
  }

  loadSurah(): void {
    this.loading = true;
    this.error = null;

    this.quranService.getSurahDetail(this.surahId).subscribe({
      next: (surahDetail: SurahDetail) => {
        this.surahDetail = surahDetail;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load Surah. Please try again later.';
        this.loading = false;
        console.error('Error loading surah:', err);
      },
    });
  }

  playVerse(verseId: number): void {
    const audioUrl = this.quranService.getAudioUrl(2, this.surahId, verseId);
    const audio = new Audio(audioUrl);
    audio.play().catch((err) => {
      console.error('Error playing audio:', err);
      alert('Audio not available for this verse.');
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
