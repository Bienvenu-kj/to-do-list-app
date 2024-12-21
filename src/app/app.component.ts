import { CommonModule} from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet, TitleStrategy } from '@angular/router';
import { ListeTachesComponent } from './liste-taches/liste-taches.component';


@Component({
  selector: 'app-root',
  imports: [CommonModule, ListeTachesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tâches';
  motifP:boolean=false;
  recherche = false;
  taches = [
    {
      nom : 'Faire le sport',
      etat : 'Non commencée',
    },
    {
      nom: 'Faire le devoir',
      etat : 'Non commencée',
    },
    {
      nom : 'Suivre un film',
      etat : 'Non commencée'
    }
  ]
  
  // menuContext(){
    
  // }
  tachesFiltres = this.taches;
  champsValeur:any;
  rechercheReusi!:boolean;
  rechercher!:string;

  RecherTaches(event: Event){
    this.rechercheReusi = this.recherche
    this.rechercheReusi = true;
    let champs = event.target as HTMLInputElement;
    let champsValeur = champs.value;
    this.champsValeur = champsValeur;
    this.tachesFiltres = this.taches;
    this.tachesFiltres = this.tachesFiltres.filter(tache =>tache.nom.toLocaleLowerCase().includes(champsValeur.toLocaleLowerCase()))
    this.rechercher = this.champsValeur?"Recherche en cours":"";
    if(this.tachesFiltres.length === 0){
      this.champsValeur = 'Aucune tache trouvée selon votre recherche !'
      this.rechercher = ''
    }
  }

  
    

  ajouTache(){
    return this.taches.unshift({nom: 'Nouvelle tache', etat:'Non commencée'});
  }
}
