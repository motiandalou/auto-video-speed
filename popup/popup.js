document.addEventListener("DOMContentLoaded", () => {
  // 播放速度
  const input = document.getElementById("speedInput");
  const speedValue = document.getElementById("speedValue");

  // 音量
  const volumeInput = document.getElementById("volumeInput");
  const volumeValue = document.getElementById("volumeValue");

  // 跳片头
  const skipIntroInput = document.getElementById("skipIntroSeconds");
  const skipValue = document.getElementById("skipValue");

  // 打开关闭--广告
  const adBlockToggle = document.getElementById("adBlockToggle");

  // 保存并且更新
  const button = document.getElementById("saveBtn");

  // 实时更新右侧显示数值
  input.addEventListener("input", () => {
    speedValue.textContent = input.value;
  });

  // 音量
  volumeInput.addEventListener("input", () => {
    volumeValue.textContent = Math.round(volumeInput.value * 100) + "%";
  });

  // 拖动滑块时，实时更新文字显示
  skipIntroInput.addEventListener("input", () => {
    skipValue.textContent = skipIntroInput.value;
  });

  chrome.storage.sync.get(["playbackRate"], (res) => {
    input.value = res.playbackRate || 1;
    volumeInput.value = res.volume || 1;
  });

  // 初始化UI，从存储中加载数据
  function loadSettings() {
    chrome.storage.sync.get(
      {
        playbackRate: 1,
        volume: 1,
        adBlockEnabled: true,
        skipIntro: 0, // 默认跳过 0 秒
      },
      (items) => {
        // 播放速度
        input.value = items.playbackRate;
        speedValue.textContent = items.playbackRate;
        // 音量
        volumeInput.value = items.volume;
        volumeValue.textContent = Math.round(items.volume * 100) + "%";
        // 广告开关
        adBlockToggle.checked = items.adBlockEnabled;
        // 跳片头
        skipIntroInput.value = items.skipIntro;
        skipValue.textContent = items.skipIntro;
      }
    );
  }
  loadSettings();

  // 按钮--保存并且更新
  button.onclick = () => {
    // 播放速度
    const rate = parseFloat(speedInput.value);
    // 音量
    const volume = parseFloat(volumeInput.value);
    // 获取勾选状态
    const adBlockEnabled = adBlockToggle.checked;
    // 跳片头
    const skipIntro = parseInt(skipIntroInput.value, 10);

    if (!isNaN(rate) && !isNaN(volume)) {
      chrome.storage.sync.set(
        {
          playbackRate: rate,
          volume: volume,
          adBlockEnabled: adBlockEnabled,
          skipIntro: skipIntro,
        },
        () => {
          // 更新规则集状态（广告屏蔽）
          chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: adBlockEnabled ? ["ruleset_1"] : [],
            disableRulesetIds: adBlockEnabled ? [] : ["ruleset_1"],
          });

          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.reload(tabs[0].id);
            window.close();
          });
        }
      );
    }
  };
});
