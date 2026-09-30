import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  isSearching = signal(Boolean(sessionStorage.getItem('researching')));

  private refreshSearchState(): void {
    this.isSearching.set(Boolean(sessionStorage.getItem('researching')));
  }

  login(): void {
    sessionStorage.setItem('logged', 'true');
    this.router.navigate(['tasks']);
  }

  startSearch(): void {
    sessionStorage.setItem('researching', 'true');
    this.router.navigate(['researchtasks']);
    this.refreshSearchState();
  }

  stopSearch(): void {
    sessionStorage.removeItem('researching');
    this.router.navigate(['tasks']);
    this.refreshSearchState();
  }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('logged')) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
