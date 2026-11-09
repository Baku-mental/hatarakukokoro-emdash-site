import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
	// 一度作ったページを Cloudflare に取っておいて使い回す（2026-11-09）。
	// 無料プランの CPU 上限で、記事ページの約1割がエラー 1102（503）になっていたため。かぞくると同じ仕組み。
	// 記事・固定ページは公開・更新のときに EmDash がタグで捨てる。一覧やサイドの記事リストは最長1時間遅れる。
	cache: { provider: cacheCloudflare() },
	routeRules: {
		"/business": { maxAge: 3600, swr: 86400 },
		"/business/[slug]": { maxAge: 3600, swr: 604800 },
		"/business/category/[slug]": { maxAge: 3600, swr: 86400 },
		"/business/posts": { maxAge: 3600, swr: 86400 },
		"/business/kenshu": { maxAge: 3600, swr: 86400 },
		"/business/sitemap.xml": { maxAge: 3600, swr: 86400 },
		"/business/rss.xml": { maxAge: 3600, swr: 86400 },
	},
});
