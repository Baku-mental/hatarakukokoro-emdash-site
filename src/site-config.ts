/**
 * サイト全体の設定のうち、CMS に置かないもの（運営会社、ヘッダー・フッターのリンク、
 * カテゴリの一覧、申し込みボタンの行き先）。ここを直して再デプロイすると反映される。
 */

export const SITE = {
	operator: "株式会社remental",
	operatorUrl: "https://remental.co.jp/",
	tagline: "ストレスチェックから休職・復職まで。企業のメンタルヘルス実務メディア",
};

/** 申し込み・資料請求（Jicoo）。どちらも新しいタブで開く */
export const LINKS = {
	diagnosis: "https://www.jicoo.com/t/remental/f/TsIogv9EWwor",
	download: "https://www.jicoo.com/t/remental/f/37kJrBL59zGV",
};

export interface Category {
	slug: string;
	label: string;
	/** カテゴリページの説明文（CMS 側に説明があればそちらを優先） */
	description: string;
	/** ヘッダーのメニューに出すか */
	nav: boolean;
}

/** 表示順どおり。slug は CMS のカテゴリのスラッグと同じにする */
export const CATEGORIES: Category[] = [
	{
		slug: "stress-check",
		label: "ストレスチェック",
		description:
			"ストレスチェックの実施手順、集団分析の読み方、高ストレス者への対応など、担当者が押さえておきたい実務をまとめています。",
		nav: true,
	},
	{
		slug: "mental-health",
		label: "メンタルヘルス対策",
		description:
			"職場のメンタルヘルス対策の進め方を、産業保健の担当者がいない会社でも取り組める形でまとめています。",
		nav: true,
	},
	{
		slug: "leave",
		label: "休職・復職・離職",
		description:
			"メンタル不調による休職の手続き、復職の判断と支援、離職を防ぐための対応をまとめています。",
		nav: true,
	},
	{
		slug: "harassment",
		label: "ハラスメント対策",
		description:
			"ハラスメントの予防、相談窓口の整え方、起きたときの対応など、職場で必要な取り組みをまとめています。",
		nav: true,
	},
	{
		slug: "line-care",
		label: "管理職・ラインケア",
		description:
			"部下の不調に早く気づくためのラインケアや、管理職が日ごろからできる関わり方をまとめています。",
		nav: true,
	},
	{
		slug: "human-capital",
		label: "人的資本経営・マネジメント",
		description:
			"人的資本経営や組織づくりの観点から、社員の心の健康と働きやすさを高める取り組みをまとめています。",
		nav: false,
	},
];

export const NAV_CATEGORIES = CATEGORIES.filter((category) => category.nav);

export const FOOTER_LINKS: Array<{ label: string; href: string; external?: boolean }> = [
	{ label: "無料チェックツール", href: "/pages/tools" },
	{ label: "メディア方針", href: "/pages/media-policy" },
	{ label: "プライバシーポリシー", href: "/pages/privacy-policy" },
	{ label: "運営会社", href: "https://remental.co.jp/", external: true },
];
