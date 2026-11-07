import { getI18nConfig } from "emdash";

/**
 * The default locale from the site's Astro `i18n` config, if it names a
 * language this runtime can format. Not used for display: the site is
 * Japanese-only and the imported content is stored with locale "en", so
 * labels and dates are always rendered in Japanese (see formatDate).
 */
export function getSiteLocale(): string | undefined {
	const locale = getI18nConfig()?.defaultLocale;
	if (!locale) return undefined;
	try {
		return Intl.DateTimeFormat.supportedLocalesOf(locale)[0];
	} catch {
		// Malformed tags such as "pt_BR" throw instead of matching nothing.
		return undefined;
	}
}

/** Formats a date in Japanese, in Japan time (e.g. 2026年11月7日), whatever the i18n config says. */
export function formatDate(date: Date, month: "long" | "short" = "long"): string {
	return date.toLocaleDateString("ja-JP", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: month === "short" ? "numeric" : "long",
		day: "numeric",
	});
}

const SHORT_DATE = new Intl.DateTimeFormat("ja-JP", {
	timeZone: "Asia/Tokyo",
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

/** Short numeric date for cards and lists, in Japan time (e.g. 2026.11.07). */
export function formatShortDate(date: Date): string {
	return SHORT_DATE.format(date).replaceAll("/", ".");
}
