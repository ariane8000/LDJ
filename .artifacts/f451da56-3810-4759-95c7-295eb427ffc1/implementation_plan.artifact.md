# Exclure les dossiers générés et tiers des inspections Android Studio

## Contexte et Problème

L'utilisateur observe plus de 52 000 "erreurs" et "avertissements" dans Android Studio (dont 50 050 fautes d'orthographe/proofreading, 648 erreurs C/C++, 318 avertissements HTML).
Cela se produit parce qu'Android Studio indexe et inspecte par défaut l'intégralité du répertoire du projet, y compris :
- `node_modules/` (plus de 130 paquets npm avec des milliers de fichiers JS, HTML, README, etc.)
- `www/` (les assets web générés)
- `android/.gradle/` et `android/app/build/`
- `ios/App/Pods/` et dossiers de build iOS

Ces fichiers tiers et générés ne font pas partie du code source de l'application native Android/Capacitor, ce qui submerge l'outil d'inspection d'Android Studio de faux positifs massifs.

## Objectif

Mettre à jour la configuration du projet IntelliJ/Android Studio (`.idea/LDJ.iml`) pour exclure explicitement tous ces répertoires tiers et de build des inspections et de l'indexation.

## Proposition de Changements

### Configuration du Module IDE

#### [MODIFY] [LDJ.iml](file:///C:/Users/jerem/StudioProjects/LDJ/.idea/LDJ.iml)
- Ajouter des balises `<excludeFolder>` pour exclure :
  - `node_modules`
  - `www`
  - `android/.gradle`
  - `android/app/build`
  - `ios/App/Pods`
  - `ios/App/build`
  - `.manus`

## Plan de Vérification

### Vérification Manuelle
- Demander à l'utilisateur de fermer et rouvrir le projet dans Android Studio (ou de faire un *Sync Project with Gradle Files* / *Invalidate Caches* si nécessaire) pour vérifier que le nombre d'erreurs d'inspection tombe à 0 ou aux quelques fichiers sources réels.
