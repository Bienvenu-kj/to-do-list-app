import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuManagerService {
  cacheOUmontre = true;
  basculeEnVrai = () => (this.cacheOUmontre = true);

  basculeEnFaux = () => (this.cacheOUmontre = false);
  inverse() {
    return (this.cacheOUmontre = !this.cacheOUmontre);
  }
}
