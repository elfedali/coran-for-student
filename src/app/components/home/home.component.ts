import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuranService, Surah } from '../../services/quran.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1 class="title">القرآن الكريم</h1>
      <h2 class="subtitle">The Holy Quran - 114 Surahs</h2>
      
      <div class="loading" *ngIf="loading">
        Loading Surahs...
      </div>
      
      <div class="error" *ngIf="error">
        {{ error }}
      </div>
      
      <div class="surahs-grid" *ngIf="!loading && !error">
        <div 
          *ngFor="let surah of surahs; trackBy: trackBySurahId; let i = index" 
          class="surah-card"
          (click)="navigateToSurah(i + 1)"
        >
          <div class="surah-number">{{ i + 1 }}</div>
          <div class="surah-info">
            <h3 class="surah-name">{{ surah.surahNameArabic }}</h3>
            <p class="surah-transliteration">{{ surah.surahName }}</p>
            <p class="surah-translation">{{ surah.surahNameTranslation }}</p>
            <div class="surah-details">
              <span class="surah-type">{{ surah.revelationPlace }}</span>
              <span class="verses-count">{{ surah.totalAyah }} verses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .title {
      text-align: center;
      font-size: 2.5em;
      margin-bottom: 10px;
      color: #2c5530;
      font-family: 'Amiri', serif;
    }

    .subtitle {
      text-align: center;
      font-size: 1.2em;
      margin-bottom: 30px;
      color: #666;
    }

    .loading, .error {
      text-align: center;
      font-size: 1.1em;
      padding: 20px;
    }

    .error {
      color: #d32f2f;
      background-color: #ffebee;
      border-radius: 8px;
    }

    .surahs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .surah-card {
      display: flex;
      align-items: center;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .surah-card:hover {
      border-color: #4caf50;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
      transform: translateY(-2px);
    }

    .surah-number {
      font-size: 1.5em;
      font-weight: bold;
      color: #4caf50;
      background: #f1f8e9;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      flex-shrink: 0;
    }

    .surah-info {
      flex: 1;
    }

    .surah-name {
      margin: 0 0 4px 0;
      font-size: 1.3em;
      color: #2c5530;
      font-family: 'Amiri', serif;
    }

    .surah-transliteration {
      margin: 0 0 4px 0;
      font-size: 1em;
      color: #666;
      font-style: italic;
    }

    .surah-translation {
      margin: 0 0 8px 0;
      font-size: 0.9em;
      color: #888;
    }

    .surah-details {
      display: flex;
      gap: 12px;
      font-size: 0.9em;
    }

    .surah-type {
      background: #e3f2fd;
      color: #1976d2;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 500;
    }

    .verses-count {
      color: #666;
    }

    @media (max-width: 768px) {
      .surahs-grid {
        grid-template-columns: 1fr;
      }
      
      .title {
        font-size: 2em;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  surahs: Surah[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private quranService: QuranService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSurahs();
  }

  loadSurahs(): void {
    this.loading = true;
    this.error = null;
    
    this.quranService.getAllSurahs().subscribe({
      next: (surahs: Surah[]) => {
        this.surahs = surahs;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load Surahs. Please try again later.';
        this.loading = false;
        console.error('Error loading surahs:', err);
      }
    });
  }

  navigateToSurah(surahId: number): void {
    this.router.navigate(['/surah', surahId]);
  }

  trackBySurahId(index: number, surah: Surah): string {
    return surah.surahName;
  }
}