// 会社サイト（remental.co.jp/）の設定。リンク先はここで変える
export const CORP = {
	origin: "https://remental.co.jp",
	title: "株式会社remental | こころの可能性を、最大化する。",
	description:
		"人類のこころが持つ可能性を、最大化する。株式会社rementalは公認心理師の専門性とテクノロジーで、こころを整える仕組みを個人から社会へ届けます。",
	ga4: "G-K7RHJSPX7C", // 旧 WordPress（MonsterInsights）と同じ ID
	// お問い合わせは旧サイトと同じ Google フォーム
	contactForm:
		"https://docs.google.com/forms/d/e/1FAIpQLSfu_VmvWvQh8PDcS_BggS04wssUi_aEYG8eabHCV5TuaUOP3A/viewform?embedded=true",
	links: {
		kimochi: "https://kimochi-mental.com/",
		k4b: "https://kimochi-mental.com/business/", // 旧サイトと同じ（2026-11-14 Rioto OK）
		kokoshe: "https://kimochi-care.net/kokoshe/", // ココシェのページ（2026-11-14 Rioto 指定）
		recruit: "https://meety.net/matches/rtEeUtEmzvKt", // カジュアル面談（旧サイトと同じ）
		kazokuru: "https://kazokuru.com/", // フッター（2026-11-14 Rioto 依頼）
		privacy: "/privacy/",
	},
} as const;

// 検索エンジン・AI 向けの会社情報（schema.org Organization）。トップと全ページの構造化データに使う
export const ORG = {
	"@type": "Organization",
	"@id": "https://remental.co.jp/#organization",
	name: "株式会社remental",
	alternateName: ["remental", "remental, inc."],
	url: "https://remental.co.jp/",
	logo: { "@type": "ImageObject", url: "https://remental.co.jp/icon-512.png", width: 512, height: 512 },
	description:
		"公認心理師の専門性とテクノロジーで、こころを整える仕組みを個人から社会へ届ける会社。オンラインカウンセリング「Kimochi」、法人向けメンタルウェルネス「Kimochi for Business」、セルフケアアプリ「ココシェ」を運営。",
	foundingDate: "2022-01",
	founder: { "@type": "Person", name: "佐藤 利音" },
	address: { "@type": "PostalAddress", addressRegion: "東京都", addressLocality: "文京区", addressCountry: "JP" },
	contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: "https://remental.co.jp/contact/", availableLanguage: "ja" },
	brand: [
		{ "@type": "Brand", name: "Kimochi", url: "https://kimochi-mental.com/" },
		{ "@type": "Brand", name: "Kimochi for Business", url: "https://kimochi-mental.com/business/" },
		{ "@type": "Brand", name: "ココシェ", url: "https://kimochi-care.net/kokoshe/" },
		{ "@type": "Brand", name: "はたらくこころ研究所", url: "https://remental.co.jp/business/" },
		{ "@type": "Brand", name: "かぞくる", url: "https://kazokuru.com/" },
	],
	sameAs: ["https://x.com/kimochi_care", "https://www.instagram.com/kimochi_care/", "https://www.facebook.com/Kimochicare"],
} as const;

export const crumbs = (items: [string, string][]) => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `https://remental.co.jp${path}` })),
});

// お知らせの種類 → ラベルの色
export const NEWS_PILL: Record<string, string> = {
	お知らせ: "background:#DCEBEC;color:#0B5C63",
	メディア: "background:#DCEBEC;color:#0B5C63",
	リリース: "background:#FBE3C4;color:#7A4210",
	サービス: "background:#E3F2F3;color:#0B5C63",
	受賞: "background:#FBE3C4;color:#7A4210",
};

// 旧 WordPress のお知らせ（/archives/<ID>）→ 新しいお知らせの slug
export const LEGACY_NEWS: Record<string, string> = {
	"542": "2024-06-kimochi-renai-soudan",
	"555": "2024-08-nikkei",
	"570": "2025-01-ellegirl",
	"593": "2025-03-shinseikatsu-campaign",
	"601": "2025-04-kimochi-pair",
	"616": "2025-12-subscription-award",
	"653": "2026-07-tbs-the-time",
};
