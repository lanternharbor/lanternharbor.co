import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

/**
 * Append a short content hash to a `/public` asset URL so a changed file always
 * resolves to a fresh URL. The logo PNGs ship with `cache-control: max-age=2592000`
 * (30 days); without a versioned URL, browsers keep serving the stale file after a
 * redeploy. This busts that cache by content — no manual version bumps, no renames.
 *
 * Build-time only (reads from disk during `astro build`); falls back to the plain
 * path if the file can't be read, so a path hiccup can never break the build.
 */
export function versioned(publicPath: string): string {
  try {
    const buf = readFileSync(join(process.cwd(), 'public', publicPath));
    const hash = createHash('sha1').update(buf).digest('hex').slice(0, 8);
    return `${publicPath}?v=${hash}`;
  } catch {
    return publicPath;
  }
}
