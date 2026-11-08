/** 本文の H2・H3 から目次を作る（ページの HTML に最初から入れる。SEO のため） */

export interface TocItem {
	id: string;
	text: string;
	level: 2 | 3;
}

/** 見出しの id。components/PostBlock.astro と同じ作り方 */
export function headingId(key: string | undefined): string | undefined {
	return key ? `h-${key}` : undefined;
}

type Block = { _type?: string; _key?: string; style?: string; children?: Array<{ text?: string }> };

export function buildToc(content: unknown): TocItem[] {
	const blocks = (Array.isArray(content) ? content : []) as Block[];
	const items: TocItem[] = [];
	for (const b of blocks) {
		if (b._type !== "block" || (b.style !== "h2" && b.style !== "h3")) continue;
		const id = headingId(b._key);
		const text = (b.children ?? []).map((c) => c.text ?? "").join("").trim();
		if (!id || !text) continue;
		items.push({ id, text, level: b.style === "h2" ? 2 : 3 });
	}
	return items;
}

/** 本文を「最初の H2 の前」と「それ以降」に分ける（本文中の目次を間に置くため） */
export function splitAtFirstH2<T>(content: T[]): [T[], T[]] {
	const i = content.findIndex(
		(b) => (b as Block)?._type === "block" && (b as Block).style === "h2",
	);
	if (i <= 0) return [[], content];
	return [content.slice(0, i), content.slice(i)];
}
