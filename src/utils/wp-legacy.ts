/**
 * WordPress 時代の URL（/business/?p=番号・?page_id=番号・?cat=番号）から新しい URL へ移すための対応表。
 * 2026-11-07 の書き出し（hatarakukokoro/WordPress.2026-11-07.xml）から作成。記事は ?p と ?page_id のどちらでも開ける。
 */
export const WP_POSTS: Record<string, string> = {
	"3": "privacy-policy",
	"12": "design-sample",
	"19": "top",
	"23": "media-policy",
	"27": "stress-check-gimuka",
	"30": "stress-check-gaibu-itaku",
	"31": "chiiki-sangyo-hoken-center",
	"32": "anzen-hairyo-gimu",
	"185": "rishoku-cost",
	"187": "gimuka-check",
	"190": "tools",
	"193": "maturity-check",
	"195": "leave-flow",
	"33": "stress-check-kouseiroudousho",
	"34": "kasuhara-taisaku-gimuka",
	"35": "anzen-eisei-suishinsha",
	"36": "stress-check-imi-nai",
	"37": "stress-check-taishosha",
	"38": "stress-check-mensetsu-shido",
	"39": "stress-check-nagare",
	"40": "stress-check-jisshisha",
	"42": "kigyo-counseling",
	"43": "sangyoi-gimu",
	"44": "kyushoku-kekkin-chigai",
	"45": "stress-check-shudan-bunseki",
	"46": "eap",
	"47": "shanai-sodan-madoguchi",
	"48": "anzen-eisei-iinkai",
	"49": "shokugyosei-stress-kan-i-chosahyo",
	"50": "shokuba-mental-health",
	"51": "kyushoku-tetsuzuki",
	"52": "kasuhara-poster",
	"53": "harassment-kenshu",
	"54": "kokoro-no-kenko-zukuri-keikaku",
	"55": "harassment-sodan-madoguchi",
	"56": "kenko-keiei-yuryo-hojin",
	"147": "line-care",
	"148": "buka-yosu-okashii",
	"149": "shinriteki-anzensei-shokuba",
	"150": "1on1-hanasu-koto",
	"151": "fukushoku-shien-program",
	"152": "taishoku-zencho",
	"153": "anzen-eisei-iinkai-neta",
	"154": "seishin-shogai-rosai-nintei-kijun",
	"155": "pawahara-sodan-taio",
	"156": "presenteeism",
	"199": "kenko-keiei",
	"200": "engagement-survey",
	"201": "taishoku-hikitome",
	"202": "harassment-taisaku",
	"203": "hito-ga-yameteiku-kaisha",
	"204": "rensa-taishoku",
	"205": "mental-health-kenshu",
	"206": "chojikan-rodo-taisaku",
	"207": "chukan-kanrishoku-stress",
	"208": "fukushoku-sangyoi-mendan",
	"242": "stresscheck-kekka",
	"243": "gogatsubyo-taisaku",
	"244": "mental-yowai-buka",
	"245": "fukuri-kosei-counseling",
	"246": "tameshi-shukkin",
	"247": "rishoku-boshi",
	"248": "wakate-rishoku-riyu",
	"249": "jinteki-shihon-keiei",
	"250": "work-engagement",
	"251": "selfcare-kenshu",
	"307": "buka-kara-harassment",
	"308": "fukihara",
	"309": "sekuhara-jirei",
	"310": "ningen-kankei-stress",
	"311": "shindansho-kaisha",
	"312": "sangyo-hokenshi",
	"313": "eisei-kanrisha",
	"314": "iukoto-kikanai-buka",
	"315": "keicho-reibun",
	"316": "shobyo-teatekin-kaisha",
	"353": "kyushoku-shugyokisoku",
	"354": "kyushoku-kurikaesu",
	"355": "shokutaku-sangyoi",
	"356": "kanrishoku-yameru",
	"357": "crusher-joshi",
	"358": "gaikokujin-mental",
	"359": "mensetsu-shido-hokokusho",
	"360": "fukushoku-aisatsu",
	"361": "mental-health-joseikin",
	"362": "rishoku-boshi-enquete",
	"403": "anzen-hairyo-gimu-ihan-jirei",
	"404": "moraharu-shokuba",
	"405": "wellbeing-keiei",
	"406": "kyushoku-itsukara",
	"407": "dame-kanrishoku",
	"408": "manzokudo-engagement",
	"409": "kanrishoku-kotowaru",
	"410": "hsp-buka",
	"411": "kasuhara-handan-kijun",
	"412": "sangyoi-shokuba-junshi",
	"452": "kyushokusha-renraku",
	"453": "stresscheck-jukenritsu",
	"454": "pawahara-choukai",
	"455": "kyushoku-chu-taishoku",
	"456": "tekiou-shogai-buka",
	"457": "mental-fucho-ido",
	"458": "telework-mental",
	"487": "taishoku-daiko-kaisha",
	"488": "buka-kyushoku-shitai",
	"489": "mudan-kekkin-renraku",
	"490": "harassment-tokumei-tsuho",
	"491": "buka-naita"
};

export const WP_CATEGORIES: Record<string, string> = {
	"1": "uncategorized",
	"2": "stress-check",
	"5": "harassment",
	"3": "mental-health",
	"7": "human-capital",
	"4": "leave",
	"6": "line-care"
};

/** 古い URL のクエリから新しいパスを返す。対応がなければ null */
export function legacyWpPath(params: URLSearchParams): string | null {
	// WordPress のサイトマップ（index.php?xml_sitemap=...）とフィード（?feed=rss2）
	if (params.has("xml_sitemap")) return "/business/sitemap.xml";
	if (params.has("feed")) return "/business/rss.xml";
	const id = params.get("p") ?? params.get("page_id");
	// WordPress のトップ（固定ページ top）は新しいトップへ
	if (id && WP_POSTS[id]) return WP_POSTS[id] === "top" ? "/business/" : `/business/${WP_POSTS[id]}/`;
	const cat = params.get("cat");
	if (cat && WP_CATEGORIES[cat]) return `/business/category/${WP_CATEGORIES[cat]}/`;
	// 検索・著者・タグ・月別・添付ファイルなど、移していないページはトップへ
	for (const key of ["s", "author", "tag", "m", "attachment_id", "paged", "p", "page_id", "cat"]) {
		if (params.has(key)) return "/business/";
	}
	return null;
}
