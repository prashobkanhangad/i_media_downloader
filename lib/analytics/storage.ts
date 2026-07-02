const VISITOR_ID_KEY = "ig_analytics_visitor_id";
const SESSION_ID_KEY = "ig_analytics_session_id";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

export function getAnalyticsContext() {
  return {
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    path: typeof window !== "undefined" ? window.location.pathname : "/",
    referrer:
      typeof document !== "undefined" ? document.referrer || null : null,
  };
}
