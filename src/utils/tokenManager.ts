let tokenCache: string | null = null;

const isBrowser = typeof window !== 'undefined';

export const setAccessToken = (token: string): void => {
  tokenCache = token;
  if (isBrowser) {
    try {
      sessionStorage.setItem('accessToken', token);
    } catch (e) {
      console.warn('Failed to write to sessionStorage', e);
    }
  }
};

export const getAccessToken = (): string | null => {
  if (tokenCache) return tokenCache;

  if (isBrowser) {
    try {
      tokenCache = sessionStorage.getItem('accessToken');
    } catch (e) {
      console.warn('Failed to read from sessionStorage', e);
      tokenCache = null;
    }
  }

  return tokenCache;
};

export const clearAccessToken = (): void => {
  tokenCache = null;
  if (isBrowser) {
    try {
      sessionStorage.removeItem('accessToken');
    } catch (e) {
      console.warn('Failed to clear sessionStorage', e);
    }
  }
};
