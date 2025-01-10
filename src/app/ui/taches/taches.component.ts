import { Component, inject } from '@angular/core';
import { ListeTachesComponent } from './liste-taches/liste-taches.component';
import { CommonModule, NgIf } from '@angular/common';
import { TasksManagerService } from '../../services/tasks-manager.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MenuManagerService } from '../../services/menu-manager.service';
import { Taches } from '../../models/taches.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-taches',
  imports: [
    CommonModule,
    ListeTachesComponent,
    TaskFormComponent,
    NgIf,
    RouterLink,
  ],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss',
})
export default class TachesComponent {
  private tacheServ = inject(TasksManagerService); // inection du service de gestions de taches
  constructor(private menuManS: MenuManagerService) {} // injection du service de gestion des menus
  tachesBrutes = this.tacheServ.taches;
  tacheTerminees = this.tacheServ.tachesTerminees;
  motifP: boolean = false; //
  onVeutOuONVeutPlusRechercher = false;
  OnVeutOuONVeutPlusRechercher2 = false;
  OnVeutOuONVeutPlusRechercher3 = true;
  cache = false; // servi pour afficher ou cacher le formulaire ou autre element lui attaché
  anime = false;
  TaskToModifier!: Taches; // partagée à l'enfant task-form pour qu'il ait la tache à modifier
  OnTenteDeModifier: boolean = false; // utilisée pour reunitialiser (false) le
  // champs de saisie lors de l'ajout d'une tache ou
  // pour le preremplire (true) lors de la modification d'une tâche
  // elle est partagé à l'enfant task-form.component pour ça.

  champsRecherche!: HTMLInputElement;

  ajouterTache() {
    this.OnTenteDeModifier = false; // rend le champs reunitialisé pour permettre l'ajout d'une tâche
    this.cache = !this.cache; // inverse la valeur de la propriété cache probablement 'false' en 'true' pour
    // // faire apparaître le formulaire
    // this.champsRecherche ? (this.champsRecherche.value = '') : '';
    // this.tachesFiltres = this.tachesBrutes;
    // this.champsValeur = '';
    // this.rechercher = '';
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
    // this.rechercher = '';
    // this.champsValeur = '';
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
      // this.tachesFiltres = this.tachesBrutes;
    }
  }
  onAjouteUntache(e: boolean) {
    this.anime = e;
  }

  onSupprime(e: boolean) {
    if (e) {
      // this.rechercher = '';
      // this.champsValeur = '';
      this.champsRecherche ? (this.champsRecherche.value = '') : '';
    }
  }
  onVeutOuOnVeutPlusRechercher() {
    this.onVeutOuONVeutPlusRechercher = true;
  }
}
