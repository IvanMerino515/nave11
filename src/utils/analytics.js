// Wrapper para GA4 — evita errores si gtag no está cargado
export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', eventName, params)
}

// Page view manual para SPA (React Router no lo dispara automáticamente)
export function trackPageView(path) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  })
}
