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
		kokoshe:
			"https://apps.apple.com/jp/app/%E3%82%B3%E3%82%B3%E3%82%B7%E3%82%A7-20%E7%A7%92%E3%81%AE%E6%84%9F%E6%83%85%E6%97%A5%E8%A8%98%E3%81%A8%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%8A%E3%83%AA%E3%83%B3%E3%82%B0/id6783313003", // App Store（旧サイトと同じ）
		recruit: "https://meety.net/matches/rtEeUtEmzvKt", // カジュアル面談（旧サイトと同じ）
		privacy: "/privacy/", // 【要確認】旧サイトのプライバシーポリシーは下書きのまま
	},
} as const;

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
