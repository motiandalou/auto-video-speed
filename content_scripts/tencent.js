function getSpeedSetting(callback) {
  chrome.storage.sync.get(["playbackRate"], function (result) {
    callback(result.playbackRate || 1.5);
  });
}

getSpeedSetting((rate) => {
  const applySpeed = () => {
    const video = document.querySelector("video");
    if (!video) return;
    if (video.playbackRate !== rate) {
      video.playbackRate = rate;
      console.log("腾讯视频倍速设置为", rate);
    }
  };

  applySpeed();

  // 多次强制赋值，覆盖自动重置
  setInterval(() => {
    applySpeed();
    const video = document.querySelector("video");
    if (video) {
      // 防止被播放器重置
      video.playbackRate = rate;
    }
  }, 1000);

  // 监听倍速变化事件，重置为目标倍速
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("ratechange", () => {
      if (video.playbackRate !== rate) {
        video.playbackRate = rate;
        console.log("检测到倍速变化，重新设置倍速为", rate);
      }
    });
  }
});
