# LDJ mobile app

This Capacitor project packages the existing LDJ interface for Android and iOS.
The HTML interface and a bundled Lottie intro animation are bundled locally; Tailwind CSS,
Font Awesome, and Lottie no longer need to be downloaded from a CDN at runtime.

The original Lottie attachment was not present in the project when it was
restored. `src/EDGE/Untitled file.json` is therefore a lightweight local
fallback animation, not the user's original animation file.

## Requirements

- Node.js 22 or newer and npm
- Android builds: Android Studio with its Android SDK and JDK 21
- iOS builds: macOS with Xcode (Apple's iOS build tools are not available on Windows)

## Install and build

```powershell
npm install
npm run sync
```

Open a native project in its IDE:

```powershell
npm run open:android
npm run open:ios
```

Edit `src/index.html` and `src/styles.css`, then run `npm run sync` to regenerate
the bundled web assets and copy them into the native projects. Android Studio can produce a
debug APK or a signed release build. iOS signing and App Store distribution
must be configured in Xcode on a Mac.

To build a local debug APK after syncing:

```powershell
Set-Location android
.\gradlew.bat assembleDebug
```

The APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`.

## Permissions and privacy

Microphone access is only used for a voice recording initiated by the user.
Location is requested only when the sender checks the optional sharing box.
The mobile projects declare foreground microphone and approximate location
permissions; they do not request background location.

Profiles and messages remain in local WebView storage. They are not backed up
to an LDJ server and may be removed when app data is cleared or the app is
uninstalled.

This is still a local-data prototype, not a complete cross-device messaging
service. The native app deliberately hides/disables its share link until a
public HTTPS app URL is set in `src/mobile-config.js`. A public URL alone is
not enough to deliver messages: an LDJ backend/API, deployed web app, and
verified deep-link handling still need to be implemented.

## Ads and payments

No ad SDK, ad request, subscription purchase, or real payment is enabled in
this project. The weekly creator price and the location paywall remain
informational prototype screens. Advertising IDs identify ad placements and
are not payment credentials. Before adding monetization, choose the ad network
and payment provider separately, provide their IDs/product configuration, and
complete the required consent, store billing, and privacy disclosures.

The `.env.example` file lists configuration placeholders only. It is not
loaded into the app, and no credentials or advertising IDs should be committed.
