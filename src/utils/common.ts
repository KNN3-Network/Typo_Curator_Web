export const toShortAddress = (address: string, maxLength = 16) => {
	if (!address) {
		address = "";
	}
	const tmpArr = address.split(".");
	const halfLength = Math.floor(maxLength / 2);
	const realAccount = tmpArr[0];
	if (realAccount.length <= maxLength) {
		return address;
	}
	return `${realAccount.substr(0, halfLength)}...${realAccount.substr(
		-halfLength
	)}${tmpArr[1] ? `.${tmpArr[1]}` : ""}`;
};
// Shortens a given address string, adding ellipsis in the middle if it exceeds the maxLength

export const isPro =
	typeof window !== "undefined" &&
	(window.location.href.includes("localhost") ||
		window.location.href.includes("staging"))
		? false
		: true;
// Determines if the current environment is production or not

export function shareToTelegram(url, text) {
	const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
		url
	)}&text=${encodeURIComponent(text)}`;
	window.open(telegramUrl, "_blank");
}
// Opens a new window to share a URL and text on Telegram

export function shareOnTwitter(url, text) {
	window.open(
		`https://twitter.com/intent/tweet?text=${encodeURIComponent(
			text
		)}&url=${encodeURIComponent(url)}`,
		"_blank"
	);
}
// Opens a new window to share a URL and text on Twitter

export function stringToJSON(inputString) {
	// Splits the input string by underscores into an array
	const parts = inputString?.toString()?.split("_");

	// Creates a JSON object
	const jsonObj = {};

	// Parses the array and creates key-value pairs
	for (let i = 0; i < parts.length; i += 2) {
		// Uses even-indexed elements as keys and odd-indexed elements as values
		if (parts[i] && parts[i + 1]) {
			jsonObj[parts[i]] = parts[i + 1];
		}
	}

	return jsonObj;
}
// Converts a string in a specific format to a JSON object

export const formatQuestion = (data) => {
	data.ans = [];
	for (let i = 1; i <= 6; i++) {
		const opKey = `op${i}`;
		if (data[opKey] !== null) {
			data.ans.push(data[opKey]);
		}
		delete data[opKey];
	}
	data.ans.sort(() => Math.random() - 0.5);
	console.log(data);
	return data;
};
// Formats question data by extracting non-null options and shuffling them

export function debounce(func, delay) {
	let timeoutId;
	return function () {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, arguments);
		}, delay);
	};
}
// Returns a debounced version of a function that delays its execution
