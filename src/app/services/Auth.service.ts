import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  researching = signal(Boolean(sessionStorage.getItem('researching')) || false);
  userName!: string;

  private refeshResearching() {
    this.researching.set(
      Boolean(sessionStorage.getItem('researching')) || false,
    );
  }
  login(): void {
    sessionStorage.setItem('logged', 'true');
    this.router.navigate(['tasks']);
  }
  ilVeutRechercher() {
    sessionStorage.setItem('researching', 'true');
    this.router.navigate(['researchtasks']);
    this.refeshResearching();
  }
  ilNeVeutPlusRechercher() {
    sessionStorage.removeItem('researching');
    this.router.navigate(['tasks']);
    this.refeshResearching();
  }

  isLogin(): boolean {
    if (sessionStorage.getItem('logged')) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
