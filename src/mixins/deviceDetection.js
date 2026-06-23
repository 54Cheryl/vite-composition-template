function detectDevice () {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const userAgentData = navigator.userAgentData
  // 判斷 iOS 裝置
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'mobile'
  }

  // 判斷 Android 裝置
  if (/android/i.test(userAgent)) {
    return 'mobile'
  }

  // 判斷其他手機裝置
  if (/mobile/i.test(userAgent)) {
    return 'mobile'
  }

  const appleiPad = (navigator.userAgent.match(/(iPad)/) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1))

  if (appleiPad) {
    return 'tablet'
  }

  // 特定情況默認為筆電
  if (userAgentData) {
    if (userAgentData.platform === 'macOS') {
      return 'desktop'
    } else if (userAgentData.platform === 'Windows') {
      return 'desktop'
    }
  } else {
    if (navigator.platform === 'Win32') {
      return 'desktop'
    } else if (navigator.platform === 'MacIntel') {
      return 'desktop'
    }
  }

  // 其他情況默認為 Android 平板
  if (navigator.maxTouchPoints > 1) {
    return 'tablet'
  }
  return 'desktop'
}

export { detectDevice }
