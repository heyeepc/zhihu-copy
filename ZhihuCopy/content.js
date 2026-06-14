// 1. 强行注入 CSS，恢复文本可选状态
const style = document.createElement('style');
style.innerHTML = `
  * {
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
  }
`;
// 确保在页面最快时间注入
if (document.head) {
  document.head.appendChild(style);
} else {
  const observer = new MutationObserver(() => {
    if (document.head) {
      document.head.appendChild(style);
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, { childList: true });
}

// 2. 拦截并消灭知乎的 copy / selectstart 等防御事件
const enableCopy = (e) => {
  e.stopPropagation();
};

window.addEventListener('copy', enableCopy, true);
window.addEventListener('selectstart', enableCopy, true);
window.addEventListener('contextmenu', enableCopy, true);
