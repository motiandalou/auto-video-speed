chrome.storage.sync.get(
  {
    playbackRate: 1,
    volume: 1,
    skipIntro: 0,
    adBlockEnabled: true,
  },
  ({ playbackRate, volume, skipIntro, adBlockEnabled }) => {
    let lastUrl = location.href;

    const applyVideoSettings = () => {
      const video = document.querySelector("video");
      if (!video) return;

      // 设置播放速度和音量
      video.playbackRate = playbackRate;
      video.volume = volume;

      // 跳过片头
      if (video.currentTime < skipIntro) {
        video.currentTime = skipIntro;
      }
    };

    // 初始化
    const init = () => {
      const tryApply = setInterval(() => {
        const video = document.querySelector("video");
        if (video) {
          applyVideoSettings();
          clearInterval(tryApply);
        }
      }, 500);
    };

    // 广告屏蔽函数
    const removeAds = () => {
      const adSelectors = [".ad-report", ".slide-ad-exp"];
      adSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          el.style.display = "none";
        });
      });
    };

    // 启动广告 MutationObserver
    if (adBlockEnabled) {
      const adObserver = new MutationObserver(removeAds);
      adObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      removeAds();
    }

    // 监听页面 SPA URL 变化
    const observeUrlChange = () => {
      const bodyObserver = new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
          lastUrl = currentUrl;
          init(); // 新页面，重新设置视频
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    };

    // 启动
    init();
    observeUrlChange();
  }
);
