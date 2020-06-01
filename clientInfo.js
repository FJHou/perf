export default function clientInfo() {
  let navInfo = {},
    screenInfo = {}
  const {
    navigator,
    screen,
    devicePixelRatio
  } = window;

  if (navigator) {
    const {
      userAgent,
      platform,
      language,
      serviceWorker
    } = navigator
    const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

    navInfo = {
      userAgent,
      platform,
      language,
      serviceWorker,
      webRTC: getUserMedia ? 1 : 0,
      serviceWorker: serviceWorker ? 1 : 0
    }
  }

  if (screen) {
    const {
      pixelDepth,
      colorDepth,
      width,
      height
    } = screen
    screenInfo = {
      pixelDepth,
      colorDepth,
      width,
      height,
      devicePixelRatio
    }
  }
  // location storage ip 时间记录
  return {
    navInfo,
    screenInfo
  }
}
