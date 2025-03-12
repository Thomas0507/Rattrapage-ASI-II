# ASI II rattrappage

## Installation

    Executer "start.ps1" ou compiler manuellement avec mvn les common modules, puis lancer
    ```shell
    podman compose up --build
    ``` 

## Features:
- Authentification utilisateurs
- Login
- Signup
- Achat de carte
- Vente de carte
- Consultation des cartes de l’utilisateurs connecté
- Consultation de toutes les cartes existantes
- Chat global avec tous les utilisateurs présents dessus.
- Chat privé avec un utilisateur particulier
- Système d’argent pour l’achat / vente
- Historisation des transaction (achat / ventes)
- Historisation des messages (chat global uniquement)
- Jeu : 
- Créer une partie personnalisée.
- Recherche des parties joignables.
- Salle d’attente.
- Écran de sélection des cartes.
- Jeu au tour par tour avec logique complète.
- Point d’action, attaquer coûte des points d’actions.
- Le joueur doit signaler la fin de son tour.
- Animations de sélections de cartes pour attaque.
- Les cartes vaincues sont noircies.
- Système d’avantage de type pour les dégâts que font les cartes.
- Système de chance d’esquive lors des attaques.
- Système de coup critique lors des attaques.
- Résultat du jeu
- Historisation des parties jouées.
- Invocation de cartes depuis des bannières semblable à des “gachas”:
- Des bannières contiennent des cartes invocable
- Certaines cartes ont plus de chance d’être obtenues.
- Monnayant de l’argent, le joueur peut effectuer des invocations.
- Système de rareté pour les cartes.
- Génération de carte par AI avec un prompt:
- Traitement asynchrone
- Notification de l’utilisateur une fois la carte générée


## Features manquantes:

- Enregistrement des messages dans le SpringBoot (actuellement stocké dans l’express).
- Écran de visualisation des historiques de parties.
- Écran de visualisation des historiques de transactions.


## Authors :

Marin Thomas
Tran Van Ba Remi
Rtayli Oumaima
Al-Homsi Raghad
