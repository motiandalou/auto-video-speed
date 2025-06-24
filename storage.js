function getSpeedSetting(callback) {
  chrome.storage.sync.get(['playbackRate'], function (result) {
    callback(result.playbackRate || 1.5);
  });
}