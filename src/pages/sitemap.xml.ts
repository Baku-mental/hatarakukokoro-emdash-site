/**
 * remental.co.jp 全体のサイトマップの入口（/sitemap.xml）。2026-11-14 会社サイトの移行で追加
 * 会社サイト（/sitemap-corp.xml）と、はたらくこころ研究所（/business/sitemap.xml）をまとめる
 */
import type { APIRoute } from "astro";
import { CORP } from "../corp-config";

export const GET: APIRoute = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>${CORP.origin}/sitemap-corp.xml</loc></sitemap>
<sitemap><loc>${CORP.origin}/business/sitemap.xml</loc></sitemap>
</sitemapindex>
`;
	return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
};
