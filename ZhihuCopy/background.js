chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: enablePageCopy
  });
});

// 这段函数会被注入到目标网页中执行
function enablePageCopy() {
  // 1. 暴力释放所有被禁用的事件
  const events = ['copy', 'cut', 'contextmenu', 'selectstart', 'mousedown'];
  events.forEach(eventType => {
    document.addEventListener(eventType, (e) => e.stopPropagation(), true);
  });

  // 2. 强行恢复 CSS 中的文本可选状态
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      user-select: text !important;
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
    }
  `;
  document.head.appendChild(style);
  
  alert('✨ 复制限制已解除');
}