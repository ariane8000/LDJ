import { Capacitor } from "@capacitor/core";
import { AppLauncher } from "@capacitor/app-launcher";
import { Geolocation } from "@capacitor/geolocation";
import { Share } from "@capacitor/share";

window.LDJNative = {
  isNative: Capacitor.isNativePlatform(),
  getCurrentPosition: async function (options) {
    var permissions = await Geolocation.checkPermissions();
    if (permissions.location !== "granted" && permissions.coarseLocation !== "granted") {
      permissions = await Geolocation.requestPermissions({ permissions: ["location", "coarseLocation"] });
    }
    if (permissions.location !== "granted" && permissions.coarseLocation !== "granted") {
      throw new Error("Location permission was not granted.");
    }
    return Geolocation.getCurrentPosition(options);
  },
  share: function (payload) {
    return Share.share({
      title: payload.title,
      text: payload.text,
      url: payload.url,
      dialogTitle: payload.title
    });
  },
  openUrl: function (url) {
    return AppLauncher.openUrl({ url: url });
  }
};
