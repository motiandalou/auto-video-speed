getSpeedSetting((rate) => {
  const setSpeed = () => {
    const video = document.querySelector("video");
    if (video && video.playbackRate !== rate) {
      video.playbackRate = rate;
      console.log("设置倍速为", rate);
    }
  };
  setInterval(setSpeed, 1000);
});
