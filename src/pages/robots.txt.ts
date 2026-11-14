/**
 * robots.txt（2026-11-14 会社サイトの移行で追加）
 * AI 検索（回答に出典として出る）のクローラーは許可し、AI の学習専用のクローラーだけ断る（著作権保護と AIO の両立）
 */
import type { APIRoute } from "astro";
import { CORP } from "../corp-config";

export const GET: APIRoute = ({ url }) => {
	const prod = url.hostname === new URL(CORP.origin).hostname;
	const body = prod
		? `User-agent: *
Disallow: /_emdash/
Disallow: /wp-admin/
Disallow: /business/wp-admin/

# AI の学習専用クローラーは断る
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

# AI 検索・回答用のクローラーは許可（出典として表示されるため）
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

Sitemap: ${CORP.origin}/sitemap.xml
`
		: "User-agent: *\nDisallow: /\n";
	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
