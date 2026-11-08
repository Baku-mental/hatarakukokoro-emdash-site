/**
 * はたらくこころ研究所のサイトマップ（/business/sitemap.xml）。
 * 本番ではサイトのルート（/sitemap.xml）は会社サイトのものなので、/business/ の下に置く。
 * トップ・記事・固定ページ・カテゴリを、本番の住所（SITE.origin）で並べる。
 */
import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";
import { CATEGORIES, SITE } from "../../site-config";

/** サイトマップに入れない固定ページ（WordPress のトップは /business/ と同じ） */
const EXCLUDED_PAGES = new Set(["top"]);

function esc(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toIso(d: unknown): string | null {
	if (!d) return null;
	const date = d instanceof Date ? d : new Date(String(d));
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export const GET: APIRoute = async () => {
	const [{ entries: posts }, { entries: pages }] = await Promise.all([
		getEmDashCollection("posts", { orderBy: { published_at: "desc" }, limit: 1000 }),
		getEmDashCollection("pages", { limit: 200 }),
	]);

	const urls: Array<{ loc: string; lastmod: string | null }> = [];
	const latest = toIso(posts[0]?.data.updatedAt);
	urls.push({ loc: `${SITE.origin}/business/`, lastmod: latest });
	urls.push({ loc: `${SITE.origin}/business/posts/`, lastmod: latest });
	for (const c of CATEGORIES) {
		urls.push({ loc: `${SITE.origin}/business/category/${c.slug}/`, lastmod: null });
	}
	for (const p of posts) {
		urls.push({
			loc: `${SITE.origin}/business/${encodeURIComponent(p.id)}/`,
			lastmod: toIso(p.data.updatedAt),
		});
	}
	for (const p of pages) {
		if (EXCLUDED_PAGES.has(p.id)) continue;
		urls.push({
			loc: `${SITE.origin}/business/${encodeURIComponent(p.id)}/`,
			lastmod: toIso(p.data.updatedAt),
		});
	}

	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		urls
			.map(
				(u) =>
					`  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
			)
			.join("\n") +
		`\n</urlset>\n`;

	return new Response(body, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
