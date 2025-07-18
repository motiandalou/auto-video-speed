// background.js

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { cancel: true }; // 阻止匹配到的请求
  },
  {
    urls: ["*://*.bilibili.com/*ad*", "*://*.youtube.com/*ad*"],
  },
  ["blocking"]
);
