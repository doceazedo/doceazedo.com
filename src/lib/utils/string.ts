export const escapeHTML = (str: string) =>
	str
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll("(", "&lpar;")
		.replaceAll(")", "&rpar;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

export const removeEmojiCodes = (str: string) =>
	str
		.split(" ")
		.filter((x) => !x.startsWith(":") || !x.endsWith(":"))
		.join(" ");
