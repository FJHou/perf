(function(win) {
  const performance = win.performance;
  const timing =
    performance.getEntriesByType("navigation")[0] || performance.timing;
  const navTypeMapping = {
    0: "navigate",

    1: "reload",

    2: "back_foward",

    255: "reserved"
  };

  const performanceTime = function() {
    if (timing.loadEventEnd <= 0) {
      // 未加载完，延迟200ms后继续times方法，直到成功
      setTimeout(function() {
        performanceTime();
      }, 200);
      return;
    }

    const {
      connectStart,
      connectEnd,
      domainLookupStart,
      domainLookupEnd,
      domContentLoadedEventEnd,
      domInteractive,
      responseStart,
      responseEnd,
      requestStart,
      secureConnectionStart,
      loadEventEnd,
      loadEventStart,
      fetchStart,
      type
    } = timing;
    const navtype = type || navTypeMapping[performance.navigation.type];

    let info = {
      // 1.区间阶段耗时
      //  DNS 解析耗时
      dns: domainLookupEnd - domainLookupStart,
      // TCP 连接耗时
      tcp: connectEnd - connectStart,
      // SSL 安全连接耗时
      ssl: connectEnd - secureConnectionStart,
      // Time to First Byte（TTFB），网络请求耗时 TTFB 有多种计算方式，ARMS 以 Google Development 定义为准
      ttfb: responseStart - requestStart,
      // 数据传输耗时
      trans: responseEnd - responseStart,
      // DOM 解析耗时
      dom: domInteractive - responseEnd,
      // 资源加载耗时
      resourceload: loadEventStart - domContentLoadedEventEnd,
      // 2.关键性能指标
      // 首包时间
      firstbyte: responseStart - domainLookupStart,
      // First Paint Time, 首次渲染时间 / 白屏时间
      fpt: responseEnd - fetchStart,
      // Time to Interact，首次可交互时间
      tti: domInteractive - fetchStart,
      // HTML 加载完成时间， 即 DOM Ready 时间
      ready: domContentLoadedEventEnd - fetchStart,
      // 页面完全加载时间
      pageload: loadEventEnd - fetchStart,
      navtype: navtype
    };

    console.table(info);
  };

  window.addEventListener("load", function() {
    performanceTime();
  });
})(window);
