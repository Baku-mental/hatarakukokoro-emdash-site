/** robots.txt（2026-11-14 会社サイトの移行で追加。旧 WordPress と同じく GPTBot は断る） */
import type { APIRoute } from "astro";
import { CORP } from "../corp-config";

export const GET: APIRoute = ({ url }) => {
	const prod = url.hostname === new URL(CORP.origin).hostname;
	const body = prod
		? `User-agent: *
Disallow: /_emdash/
Disallow: /wp-admin/
Disallow: /business/wp-admin/

User-agent: GPTBot
Disallow: /

Sitemap: ${CORP.origin}/sitemap.xml
`
		: "User-agent: *\nDisallow: /\n";
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
