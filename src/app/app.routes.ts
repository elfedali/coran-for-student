import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SurahDetailComponent } from './components/surah-detail/surah-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'surah/:id', component: SurahDetailComponent },
  { path: '**', redirectTo: '' },
];
