export function normalizeUrl(url: string) {
  return url.startsWith("http") ? url : `${window.location.origin}${url}`;
}

/**
 * Normalize icon paths so that relative paths are transformed into absolute paths
 */
export function normalizeIconPaths<T extends { icon: string }>(
  icons: T[],
): T[] {
  return icons.map((base) => ({
    ...base,
    icon: normalizeUrl(base.icon),
  }));
}

/**
 * Normalize an object with a url property so that relative paths are transformed into absolute paths
 */
export function normalizeUrlObject<T extends { url: string }>(urlObject: T): T {
  return {
    ...urlObject,
    url: normalizeUrl(urlObject.url),
  };
}
