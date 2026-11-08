/**
 * WordPress から取り込んだ本文では、枠（グループブロック）が外れて
 * 「段落・リスト・ボタン」が並んでいるだけになっている。
 * 表示するときに決まった並びを見つけて、枠（kGroup）で囲み直す。CMS の中身は変えない。
 *
 * - summary: 「この記事でわかること」の段落 + 続く箇条書き
 * - cta-mid: 「資料ダウンロード」の段落 + 見出しの段落 + ボタン
 * - cta-foot: 段落 + 段落 + Jicoo へのボタン2つ（組織診断・資料）
 */

type Block = Record<string, unknown> & { _type?: string; _key?: string };

export interface WpGroupNode {
	_type: "kGroup";
	_key: string;
	variant: "summary" | "cta-mid" | "cta-foot";
	content: Block[];
}

function isParagraph(b: Block | undefined): boolean {
	return !!b && b._type === "block" && (b.style ?? "normal") === "normal" && !b.listItem;
}

function textOf(b: Block | undefined): string {
	const children = (b?.children as Array<{ text?: string }> | undefined) ?? [];
	return children.map((c) => c.text ?? "").join("").trim();
}

function isJicooButtons(b: Block | undefined, count: number): boolean {
	if (!b || b._type !== "buttons") return false;
	const buttons = (b.buttons as Array<{ url?: string }> | undefined) ?? [];
	return buttons.length === count && buttons.every((x) => (x.url ?? "").includes("jicoo.com"));
}

export function groupWpBlocks(content: unknown): Block[] {
	const src = (Array.isArray(content) ? content : []) as Block[];
	const out: Array<Block | WpGroupNode> = [];
	let i = 0;
	while (i < src.length) {
		const b = src[i];

		if (isParagraph(b) && textOf(b) === "この記事でわかること" && src[i + 1]?.listItem) {
			let j = i + 1;
			while (j < src.length && src[j]?.listItem) j++;
			out.push({ _type: "kGroup", _key: `g-${b._key}`, variant: "summary", content: src.slice(i, j) });
			i = j;
			continue;
		}

		if (
			isParagraph(b) &&
			textOf(b) === "資料ダウンロード" &&
			isParagraph(src[i + 1]) &&
			isJicooButtons(src[i + 2], 1)
		) {
			out.push({ _type: "kGroup", _key: `g-${b._key}`, variant: "cta-mid", content: src.slice(i, i + 3) });
			i += 3;
			continue;
		}

		if (isParagraph(b) && isParagraph(src[i + 1]) && isJicooButtons(src[i + 2], 2)) {
			out.push({ _type: "kGroup", _key: `g-${b._key}`, variant: "cta-foot", content: src.slice(i, i + 3) });
			i += 3;
			continue;
		}

		out.push(b);
		i++;
	}
	return out as Block[];
}
