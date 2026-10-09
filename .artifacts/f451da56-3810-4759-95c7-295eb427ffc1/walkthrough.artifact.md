# Résumé des modifications

## Modification apportée

### Exclusion des dossiers tiers et de build dans Android Studio / IntelliJ
Dans le fichier `.idea/LDJ.iml`, les répertoires suivants ont été ajoutés à la liste des dossiers exclus (`<excludeFolder>`) :
- `node_modules` (prévenant plus de 50 000 erreurs d'orthographe et avertissements HTML/JS tiers)
- `www` (dossier d'output web généré)
- `android/.gradle` et `android/app/build` (dossiers de build Gradle)
- `ios/App/Pods` et `ios/App/build` (dossiers de dépendances et build iOS)
- `.manus`

```xml
<content url="file://$MODULE_DIR$">
  <excludeFolder url="file://$MODULE_DIR$/node_modules" />
  <excludeFolder url="file://$MODULE_DIR$/www" />
  <excludeFolder url="file://$MODULE_DIR$/android/.gradle" />
  <excludeFolder url="file://$MODULE_DIR$/android/app/build" />
  <excludeFolder url="file://$MODULE_DIR$/ios/App/Pods" />
  <excludeFolder url="file://$MODULE_DIR$/ios/App/build" />
  <excludeFolder url="file://$MODULE_DIR$/.manus" />
</content>
```

> [!IMPORTANT]
> **Action requise dans Android Studio :**
> Pour qu'Android Studio prenne immédiatement en compte ces exclusions et efface la liste des 52 000 faux positifs :
> 1. Dans Android Studio, allez dans le menu **File** -> **Reload All from Disk** (ou **File** -> **Sync Project with Gradle Files**).
> 2. Si les erreurs persistent en cache, faites **File** -> **Invalidate Caches...** -> cochez les options et cliquez sur **Invalidate and Restart**.
