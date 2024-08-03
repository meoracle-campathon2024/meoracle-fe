'use client';

/**
 * This will add the necessary query param to the url
 * to make the browser download the file instead of opening it.
 *
 * You can also override the name of the file by passing the name param.
 */
export function getDownloadUrl(url: string, name?: string) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('download', name ?? 'true');
    return urlObj.toString();
}
