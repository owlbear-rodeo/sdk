/**
 * Normalize icon paths so that relative paths are transformed into absolute paths
 */
export function normalizeIconPaths<T extends { icon: string }>(
  icons: T[],
): T[] {
  return icons.map((base) => ({
    ...base,
    icon: base.icon.startsWith("http")
      ? base.icon
      : `${window.location.origin}${base.icon}`,
  }));
}

/**
 * Normalize an object with a url property so that relative paths are transformed into absolute paths
 */
export function normalizeUrlObject<T extends { url: string }>(urlObject: T): T {
  return {
    ...urlObject,
    url: urlObject.url.startsWith("http")
      ? urlObject.url
      : `${window.location.origin}${urlObject.url}`,
  };
}
