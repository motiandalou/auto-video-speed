function getSpeedSetting(callback) {
  chrome.storage.sync.get(["playbackRate", "volume"], function (result) {
    const rate = result.playbackRate || 1;
    const volume = result.volume !== undefined ? result.volume : 1;
    const skipIntro = result.skipIntro !== undefined ? result.skipIntro : 0;
    const adBlockEnabled = result.adBlockEnabled || true;

    callback(rate, volume, skipIntro, adBlockEnabled);
  });
}
