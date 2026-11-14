/**
 * スポットメンタルケア LP（/spot-mentalcare/、2026-11-14 追加）
 * Rioto が作った1枚の HTML（src/lp/spot-mentalcare.html）をそのまま返し、head にだけ共通の情報を足す。
 * 埋め込みだった画像は public/spot-mentalcare/images/ に出してある。LP を直すときは src/lp の HTML を差し替える。
 */
import type { APIRoute } from "astro";
import { CORP } from "../../corp-config";
import lp from "../../lp/spot-mentalcare.html?raw";

const TITLE = "スポットメンタルケア｜1名から使える企業・事務所・団体向けメンタルケア";
const DESC =
	"気になるメンバーを1名から指定して、公認心理師のオンラインカウンセリングを組織の負担で届けられる、企業・事務所・団体向けのサービス。今なら導入費用0円。";

export const GET: APIRoute = ({ url }) => {
	const prod = url.hostname === new URL(CORP.origin).hostname;
	const page = `${CORP.origin}/spot-mentalcare/`;
	const jsonld = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "スポットメンタルケア",
		description: DESC,
		url: page,
		serviceType: "オンラインカウンセリング（法人・団体向け）",
		areaServed: "JP",
		provider: { "@id": `${CORP.origin}/#organization`, "@type": "Organization", name: "株式会社remental", url: `${CORP.origin}/` },
	};
	const head = [
		`<link rel="canonical" href="${page}">`,
		prod ? "" : `<meta name="robots" content="noindex, nofollow">`,
		`<meta property="og:type" content="website">`,
		`<meta property="og:locale" content="ja_JP">`,
		`<meta property="og:site_name" content="株式会社remental">`,
		`<meta property="og:title" content="${TITLE}">`,
		`<meta property="og:description" content="${DESC}">`,
		`<meta property="og:url" content="${page}">`,
		`<meta property="og:image" content="${CORP.origin}/spot-mentalcare/images/hero.jpg">`,
		`<meta name="twitter:card" content="summary_large_image">`,
		`<meta name="theme-color" content="#002F57">`,
		`<link rel="icon" href="/favicon.ico" sizes="any">`,
		`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">`,
		`<link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
		`<link rel="preload" as="image" href="/spot-mentalcare/images/hero.jpg" fetchpriority="high">`,
		`<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
		prod
			? `<script async src="https://www.googletagmanager.com/gtag/js?id=${CORP.ga4}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${CORP.ga4}');</script>`
			: "",
	]
		.filter(Boolean)
		.join("\n");
	const html = lp.replace("</head>", `${head}\n</head>`);
	return new Response(html, {
		headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=600" },
	});
};
