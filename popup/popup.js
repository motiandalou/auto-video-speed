document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("speedInput");
  const button = document.getElementById("saveBtn");

  chrome.storage.sync.get(["playbackRate"], (res) => {
    input.value = res.playbackRate || 1.5;
  });

  button.onclick = () => {
    const rate = parseFloat(input.value);
    if (!isNaN(rate)) {
      chrome.storage.sync.set({ playbackRate: rate }, () => {
        // ✅ 刷新当前页面
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.reload(tabs[0].id);
          // ✅ 关闭插件弹窗
          window.close();
        });
      });
    }
  };
});
