# Stratégie CSS

## Décision

Le projet utilise **Tailwind CSS 4 et SCSS**, avec une responsabilité claire pour
chaque outil.

### Tailwind CSS

Tailwind est utilisé directement dans les templates pour les styles simples et
réutilisables :

- mise en page (`flex`, positionnement, alignement) ;
- espacements et dimensions ;
- typographie simple ;
- couleurs simples ;
- variantes responsives et états simples.

### SCSS

SCSS est réservé aux styles qui expriment réellement le comportement visuel
d'un composant :

- animations et transitions complexes ;
- pseudo-éléments ;
- menus contextuels, superpositions et états composés ;
- sélecteurs qui dépendent de la structure du composant ;
- règles d'accessibilité, comme la réduction des animations.

Les styles propres à un composant restent dans son fichier `.component.scss`
afin de profiter de l'encapsulation des styles d'Angular.

## Règles du projet

1. Ne pas recopier manuellement un utilitaire Tailwind dans un fichier SCSS.
2. Ne pas versionner le CSS généré par Tailwind.
3. Éviter `@apply`, sauf lorsqu'une exception documentée améliore réellement la
   lisibilité.
4. Limiter `src/styles.scss` à l'import de Tailwind, aux variables de design et
   aux styles réellement globaux.
5. Introduire progressivement des propriétés personnalisées CSS pour les
   couleurs, espacements et autres valeurs partagées.
6. Conserver l'encapsulation Angular par défaut et éviter `::ng-deep`.

## Migration progressive

1. Installer et configurer Tailwind CSS 4.
2. Retirer l'ancien CSS Tailwind 3 généré de `src/styles.scss`.
3. Vérifier que le rendu existant reste stable.
4. Supprimer, composant par composant, les utilitaires Tailwind dupliqués dans
   les fichiers SCSS.
5. Regrouper progressivement les valeurs visuelles partagées sous forme de
   variables de design.
