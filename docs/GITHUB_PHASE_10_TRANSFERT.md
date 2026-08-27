# Chapter — envoyer la phase 10 vers GitHub

Le 27 août 2026, l'utilisateur accepte le transfert par bundle Git, à envoyer depuis son ordinateur authentifié auprès de GitHub. Le bundle conserve les commits et les deux historiques réunis ; il ne s'agit pas d'une simple copie des fichiers.

La fusion locale est terminée. **La préparation ou le téléchargement de cette archive ne met pas GitHub à jour.** L'envoi reste à effectuer, puis à vérifier. La version Sites 24 ne change pas et la phase 11 reste non ouverte.

## Préparer le dossier

1. Installer Git s'il n'est pas déjà disponible et utiliser l'authentification GitHub habituelle de son ordinateur.
2. Extraire complètement `chapter-phase10.zip`.
3. Ouvrir un terminal dans le dossier extrait, où se trouve `chapter-phase10.bundle`, et non dans un dépôt existant.

Les commandes ci-dessous fonctionnent dans PowerShell, Terminal macOS et les shells usuels sous Linux. Les lancer une par une et s'arrêter à la première erreur. Le dossier `chapter-phase10-transfert` doit être nouveau ; s'il existe déjà, choisir un autre dossier de départ sans supprimer son contenu.

## Envoyer

```sh
git clone --branch main chapter-phase10.bundle chapter-phase10-transfert
git -C chapter-phase10-transfert remote set-url origin https://github.com/maeldepreville/chapter.git
git -C chapter-phase10-transfert push origin main:main
```

Le clone crée une copie indépendante : aucun dépôt de travail existant n'est modifié. La deuxième commande désigne le dépôt GitHub comme destination de cette nouvelle copie. La troisième envoie `main` sans forcer ; elle conserve l'historique distant s'il est toujours un ancêtre du jalon fourni.

Si GitHub demande une connexion, utiliser son parcours d'authentification habituel sur l'ordinateur. Ne communiquer aucun mot de passe, jeton ou autre secret dans le chat. Si l'authentification n'est pas configurée, s'arrêter et demander de l'aide avec le message d'erreur expurgé des données sensibles.

En cas de refus `non-fast-forward`, de branche protégée ou d'un autre refus d'accès, s'arrêter et transmettre le message d'erreur. **Ne pas ajouter `--force`, ne pas réinitialiser un dépôt existant et ne pas lancer de nouvelle fusion à l'aveugle.** Le dépôt distant a pu évoluer depuis la préparation du bundle.

## Vérifier la synchronisation

```sh
git -C chapter-phase10-transfert rev-parse main
git -C chapter-phase10-transfert ls-remote origin refs/heads/main
```

Le premier résultat est le commit local ; le second doit afficher exactement le même identifiant, suivi de `refs/heads/main`. L'archive comporte également `COMMIT.txt`, qui donne le commit préparé. La synchronisation n'est confirmée qu'après concordance de ces identifiants. Transmettre le résultat de l'envoi et de cette vérification pour consigner sa réussite dans le suivi du projet.

## Continuité

La règle permanente de `AGENTS.md` reste applicable : chaque futur jalon explicitement validé doit être synchronisé vers `maeldepreville/chapter`, branche `main`, puis vérifié. Ce transfert manuel résout le blocage d'authentification de l'environnement actuel ; il ne remplace pas cette règle par une obligation de publication manuelle systématique.

Le bundle contient l'historique versionné accessible depuis `main`, dont le code, les assets, les tests et les documents. Il n'embarque pas les fichiers non suivis, les identifiants Git locaux ni la configuration privée du dossier `.git`.
