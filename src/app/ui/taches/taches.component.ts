import { Component, inject } from '@angular/core';
import { ListeTachesComponent } from './liste-taches/liste-taches.component';
import { CommonModule, NgIf } from '@angular/common';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MenuManagerService } from '../../services/menu-manager.service';
import { Taches } from '../../models/taches.model';

@Component({
  selector: 'app-taches',
  imports: [CommonModule, ListeTachesComponent, TaskFormComponent, NgIf],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss',
})
export default class TachesComponent {
  private tacheServ = inject(TasksManagerService); // inection du service de gestions de taches
  constructor(private menuManS: MenuManagerService) {} // injection du service de gestion des menus
  motifP: boolean = false; //

  cache = false; // servi pour afficher ou cacher le formulaire ou autre element lui attaché

  tachesBrutes = this.tacheServ.taches; // taches brutes
  tachesFiltres = this.tachesBrutes; // les taches filtrées
  tacheTerminee = this.tacheServ.tachesTerminees;
  champsValeur!: any; // servi pour afficher les termes de la recherhce de l'utilisateur
  rechercher!: string; // servi pour afficher 'Recherche encours' selon une condition se trouvant dans la méthode RecherTache
  TaskToModifier!: Taches; // partagée à l'enfant task-form pour qu'il ait la tache à supprimer
  OnTenteDeModifier: boolean = false; // utilisée pour reunitialiser (false) le
  // champs de saisie lors de l'ajout d'une tache ou
  // pour le preremplire (true) lors de la modification d'une tâche
  // elle est partagé à l'enfant task-form.component pour ça.

  champsRecherche!: HTMLInputElement;
  RecherTaches(event: Event) {
    this.champsRecherche = event.target as HTMLInputElement;
    let champs = event.target as HTMLInputElement;
    let champs_valeur = champs.value;
    this.champsValeur = champs_valeur;
    this.tachesFiltres = this.tachesBrutes;
    this.tachesFiltres = this.tachesFiltres.filter((tache) =>
      tache.taskName
        .toLocaleLowerCase()
        .includes(champs_valeur.toLocaleLowerCase())
    );
    const tachesFiltres = this.tachesFiltres;
    console.log(tachesFiltres);
    this.rechercher = tachesFiltres.length ? 'Recherche en cours' : '';
    if (tachesFiltres.length === 0) {
      if (champs_valeur.length) {
        this.champsValeur = 'Aucune tache trouvée selon votre recherche !';
        this.rechercher = '';
      } else {
        this.champsValeur = '';
        this.rechercher = '';
      }
    }
    if (!champs_valeur) {
      this.tachesFiltres = this.tachesBrutes;
      this.champsValeur = '';
      this.rechercher = '';
    }
  }
  formView() {
    this.OnTenteDeModifier = false; // rend le champs reunitialisé pour permettre l'ajout d'une tâche
    this.cache = !this.cache; // inverse la valeur de la propriété cache probablement 'false' en 'true' pour
    // faire apparaître le formulaire
    this.champsRecherche ? (this.champsRecherche.value = '') : '';
    this.tachesFiltres = this.tachesBrutes;
    this.champsValeur = '';
    this.rechercher = '';
  }
  recevoirlafermeture(e: boolean) {
    this.cache = e; // la propriété cache reçoit la valeur probablement  'false' (emise par l'enfant task-form.component (recevoirLafermeture) lors de la soumission du
    // formulaire pour faire disparaître le formulaire)
  }
  recevoirlouverture(e: boolean) {
    this.cache = e; // la proriété cache reçoit la valeur (emise par l'enfant liste-taches.component (voirLeFormulaire) lors du clic sur la commande 'modidier'
    // pour faire apparaitre le formulaire) probablement true
  }
  //  tacheAmodifier(tache: {}){

  //  }
  getEditedElement(e: Taches) {
    this.TaskToModifier = e; // la proriété TaskToModifiier reçoit la valeur (emise par l'enfant liste-taches.component (elementAmodifier) lors du clic sur la commande 'modidier'
    // transmettre l'élément à supprimer) probablement du type Taches
  }
  onVeutModifier(m: boolean) {
    this.rechercher = '';
    this.champsValeur = '';
    this.champsRecherche ? (this.champsRecherche.value = '') : '';
    this.OnTenteDeModifier = m; // la proriété TaskToModifiier reçoit la valeur (emise par l'enfant liste-taches.component (OnVeutModifier) lors du clic sur la commande 'modidier'
    // transmettre l'élément à supprimer) probablement du type Taches
    // this.tachesFiltres = this.tachesBrutes
  }
  //  ajouTache(nom:string){
  //    return this.taches.unshift({nom: `${nom}`, etat:'Non commencée'});
  //  }
  recevoirLaSoumission(e: boolean) {
    if (e) {
      this.tachesFiltres = this.tachesBrutes;
    }
  }
  onSupprime(e: boolean) {
    if (e) {
      this.rechercher = '';
      this.champsValeur = '';
      this.champsRecherche ? (this.champsRecherche.value = '') : '';
    }
  }
}
