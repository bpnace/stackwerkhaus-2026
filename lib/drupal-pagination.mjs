/**
 * Collect an entire JSON:API article collection without following foreign links.
 * @template T, U
 * @param {string} endpoint
 * @param {(url: string) => Promise<{data?: T[], included?: U[], links?: {next?: string | {href: string} | null}}>} loadPage
 */
export async function collectDrupalArticles(endpoint, loadPage) {
  const first = new URL(endpoint);
  const visited = new Set();
  /** @type {T[]} */
  const data = [];
  /** @type {U[]} */
  const included = [];
  let next = endpoint;
  while (next) {
    const target = new URL(next, first);
    if (target.origin !== first.origin || target.pathname !== first.pathname || target.username || target.password || target.hash) {
      throw new Error("Drupal pagination link outside article endpoint");
    }
    if (visited.has(target.href) || visited.size >= 100) {
      throw new Error("Drupal pagination loop or page limit exceeded");
    }
    visited.add(target.href);
    const page = await loadPage(target.href);
    if (!Array.isArray(page.data) || (page.included !== undefined && !Array.isArray(page.included))) {
      throw new Error("Invalid Drupal article collection");
    }
    data.push(...page.data);
    included.push(...(page.included ?? []));
    const link = page.links?.next;
    next = typeof link === "string" ? link : link?.href ?? "";
  }
  return { data, included };
}
