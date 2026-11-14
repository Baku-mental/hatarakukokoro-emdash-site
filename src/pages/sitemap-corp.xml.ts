/** 会社サイト（トップ・お知らせ・お問い合わせ）のサイトマップ（/sitemap-corp.xml） */
import type { APIRoute } from "astro";
import { getEmDashCollection } from "emdash";
import { CORP } from "../corp-config";

export const GET: APIRoute = async () => {
	let news: any[] = [];
	try {
		news = (await getEmDashCollection("news", { orderBy: { published_at: "desc" }, limit: 500 })).entries;
	} catch {
		news = [];
	}
	const iso = (d: unknown) => (d instanceof Date && !Number.isNaN(d.getTime()) ? d.toISOString() : null);
	const urls = [
		{ loc: `${CORP.origin}/`, lastmod: iso(news[0]?.data.publishedAt) },
		{ loc: `${CORP.origin}/news/`, lastmod: iso(news[0]?.data.publishedAt) },
		{ loc: `${CORP.origin}/contact/`, lastmod: null },
		...news.map((n) => ({ loc: `${CORP.origin}/news/${encodeURIComponent(n.id)}/`, lastmod: iso(n.data.updatedAt) })),
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
};
