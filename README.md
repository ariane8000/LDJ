# Application mobile LDJ

![Logo LDJ](assets/ldj-logo.png)

**LDJ — On écoute, sans juger.**

Cette application Capacitor reprend l’interface LDJ existante et la conditionne pour **Android et iOS**. L’image fournie est utilisée comme logo de l’application, dans le README et dans les icônes natives des deux plateformes.

L’interface HTML et l’animation d’introduction Lottie sont embarquées localement : Tailwind CSS, Font Awesome et Lottie ne nécessitent aucun téléchargement depuis un CDN au moment de l’exécution.

> L’animation Lottie d’origine n’était pas présente dans les fichiers restaurés. `src/EDGE/Untitled file.json` est donc une animation locale de remplacement légère.

## Prérequis

- Node.js 22 ou version ultérieure et npm
- Pour Android : Android Studio, le SDK Android et le JDK 21
- Pour iOS : macOS et Xcode — les outils de compilation iOS d’Apple ne sont pas disponibles sur Windows

## Installation et synchronisation

À la racine du projet :

```powershell
npm install
npm run sync
```

Cette commande construit les ressources web locales puis les synchronise avec les projets natifs Android et iOS.

## Ouvrir les projets natifs

```powershell
npm run open:android
npm run open:ios
```

Modifiez `src/index.html` ou `src/styles.css`, puis relancez `npm run sync` pour régénérer les ressources web et les recopier dans les projets natifs.

Android Studio peut produire un APK de debug ou une version release signée. La signature iOS et la distribution sur l’App Store doivent être configurées dans Xcode sur un Mac.

## Générer un APK Android de debug

Après la synchronisation :

```powershell
Set-Location android
.\gradlew.bat assembleDebug
```

L’APK est généré ici :

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Logo de l’application

L’image principale se trouve dans `assets/ldj-logo.png`. Elle est également utilisée pour les icônes natives :

- Android : icônes `mipmap-*` et icônes adaptatives
- iOS : `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`

Si le logo doit être remplacé, régénérez les différentes tailles natives à partir d’une image carrée, puis relancez `npm run sync`.

## Permissions et confidentialité

- Le microphone est utilisé uniquement lorsqu’une personne choisit d’enregistrer un message vocal.
- La localisation est demandée uniquement si l’expéditeur choisit de joindre sa position.
- Les projets mobiles déclarent l’accès au microphone et à la localisation approximative au premier plan ; aucune localisation en arrière-plan n’est demandée.
- Les profils et les messages restent dans le stockage local de la WebView. Ils ne sont pas sauvegardés sur un serveur LDJ et peuvent être supprimés lors de l’effacement des données de l’application ou de sa désinstallation.

Il s’agit encore d’un prototype utilisant des données locales, et non d’un service complet de messagerie entre plusieurs appareils. L’application native masque ou désactive volontairement le lien de partage tant qu’une URL publique HTTPS n’est pas définie dans `src/mobile-config.js`.

Une URL publique ne suffit pas à distribuer les messages : il faut également un backend/API LDJ, une application web déployée et une gestion des liens profonds validée.

## Publicités et paiements

Aucun SDK publicitaire, aucune requête publicitaire, aucun abonnement et aucun paiement réel ne sont activés dans ce projet. Le prix hebdomadaire créateur et le paywall de localisation sont uniquement informatifs dans le prototype.

Avant d’ajouter une monétisation, choisissez séparément le réseau publicitaire et le prestataire de paiement, renseignez leurs identifiants, puis complétez les règles de consentement, de facturation des stores et de confidentialité.

Le fichier `.env.example` contient uniquement des emplacements de configuration. Il n’est pas chargé par l’application : ne commitez jamais de secrets, de clés privées ou d’identifiants réels.

## Vérifications automatisées

Le dépôt contient des workflows GitHub Actions pour compiler :

- un APK Android de debug sur Ubuntu ;
- l’application iOS pour simulateur sur macOS, sans signature de distribution.
