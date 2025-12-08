/**
 * Normalizes image URL by removing localhost URLs and using VITE_BACKEND_BASE_URL
 * @param imageUrl - The original image URL from the backend
 * @returns Normalized image URL
 */
export const normalizeImageUrl = (imageUrl: string): string => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || '/api';

  // If URL starts with http/https (absolute URL), extract pathname only
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    try {
      const urlObj = new URL(imageUrl);
      const pathname = urlObj.pathname;

      // Normalize path to /api/v1/images/ format
      const normalizedPath = pathname.startsWith('/api/v1/images/')
        ? pathname
        : pathname.replace(/^\/images\//, '/api/v1/images/');

      return `${backendBaseUrl}${normalizedPath}`;
    } catch (error) {
      console.error('Invalid URL:', imageUrl, error);
      return imageUrl;
    }
  }

  // If relative path starts with /images/, convert to /api/v1/images/
  if (imageUrl.startsWith('/images/')) {
    return `${backendBaseUrl}${imageUrl.replace('/images/', '/api/v1/images/')}`;
  }

  // If already in /api/v1/images/ format
  if (imageUrl.startsWith('/api/v1/images/')) {
    return `${backendBaseUrl}${imageUrl}`;
  }

  // Return as-is if none of the above patterns match
  return imageUrl;
};
