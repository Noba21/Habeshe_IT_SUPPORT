/**
 * Build URL for user uploads (profile photos, screenshots).
 * Uses same origin in dev (Vite proxy) or VITE_API_URL base when set to full URL.
 */
export function getUploadUrl(path) {
  if (!path || typeof path !== 'string') return null;
  // Normalize input path so it works whether DB stored:
  // - "screenshots/file.jpg"
  // - "uploads/screenshots/file.jpg"
  // - "/uploads/screenshots/file.jpg"
  const clean = path
    .replace(/^\/+/, '')          // remove leading slashes
    .replace(/^uploads\//, '')    // drop leading "uploads/" if present
    .replace(/\\/g, '/');         // windows-style -> URL-style
  const base = import.meta.env.VITE_API_URL?.startsWith('http')
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
    : '';
  return `${base}/uploads/${clean}`;
}
