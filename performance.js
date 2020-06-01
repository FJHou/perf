//监听perf
let performanceTime = function() {
  let timing = performance.timing;
  let loadTime = timing.loadEventEnd - timing.navigationStart; //过早获取时,loadEventEnd有时会是0
  if (loadTime <= 0) {
    // 未加载完，延迟200ms后继续times方法，直到成功
    setTimeout(function() {
      performanceTime();
    }, 200);
    return;
  }

  function formatTime(val) {
    return val;
  }
  let info = {
    // 1.区间阶段耗时
    //  DNS 解析耗时
    dns: formatTime(timing.domainLookupEnd - timing.domainLookupStart),
    // TCP 连接耗时
    tcp: formatTime(timing.connectEnd - timing.connectStart),
    // SSL 安全连接耗时
    ssl: formatTime(timing.connectEnd - timing.secureConnectionStart),
    // Time to First Byte（TTFB），网络请求耗时 TTFB 有多种计算方式，ARMS 以 Google Development 定义为准
    ttfb: formatTime(timing.responseStart - timing.requestStart),
    // 数据传输耗时
    trans: formatTime(timing.responseEnd - timing.responseStart),
    // DOM 解析耗时
    dom: formatTime(timing.domInteractive - timing.responseEnd),
    // 资源加载耗时
    resourceload: formatTime(
      timing.loadEventStart - timing.domContentLoadedEventEnd
    ),
    // 2.关键性能指标
    // 首包时间
    firstbyte: formatTime(timing.responseStart - timing.domainLookupStart),
    // First Paint Time, 首次渲染时间 / 白屏时间
    fpt: formatTime(timing.responseEnd - timing.fetchStart),
    // Time to Interact，首次可交互时间
    tti: formatTime(timing.domInteractive - timing.fetchStart),
    // HTML 加载完成时间， 即 DOM Ready 时间
    ready: formatTime(timing.domContentLoadedEventEnd - timing.fetchStart),
    // 页面完全加载时间
    pageload: (function() {
      return formatTime(timing.loadEventEnd - timing.fetchStart);
    })(),
    navtype: (function() {
      let type = "";
      switch (performance.navigation.type) {
        case 0:
          type = "navigate";
          break;
        case 1:
          type = "reload";
          break;
        case 2:
          type = "back_foward";
          break;
        case 255:
          type = "reserved";
          break;
      }
      return type;
    })()
  };
  console.table(info);
  // uploadUserData(1, );
};

window.addEventListener("load", function() {
  performanceTime();
});
