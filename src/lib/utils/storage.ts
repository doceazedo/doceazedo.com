import { browser } from "$app/environment";
import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import { get, type Updater, type Writable } from "svelte/store";

export function storage<T>(
	store: Writable<T>,
	key: string,
	gzip = false,
	defaultData?: T,
) {
	if (!key || typeof key !== "string" || key.trim() === "") {
		console.warn("Local storage key not provided or invalid!");
	}

	function loadFromStorage() {
		if (browser) {
			let valueStr;
			try {
				valueStr = localStorage.getItem(key);
				if (valueStr !== null) {
					if (gzip) {
						const decompressed = decompressSync(strToU8(valueStr, true));
						valueStr = strFromU8(decompressed, true);
					}
					const json = JSON.parse(valueStr);
					store.set(
						typeof json === "object"
							? {
									...defaultData,
									...json,
								}
							: json,
					);
				}
			} catch (_e) {
				if (valueStr === "") {
					store.set("");
				}
				// probably it was a primitive
				else {
					if (valueStr === "false" || valueStr === "true") {
						// boolean state
						store.set(valueStr === "false" ? false : true);
					} else if (!Number.isNaN(Number(valueStr))) {
						store.set(Number(valueStr));
					} else {
						store.set(valueStr);
					}
				}
			}
		}
	}

	function saveToStorage(value: T) {
		if (browser) {
			if (
				typeof value === "boolean" ||
				typeof value === "number" ||
				typeof value === "string"
			) {
				localStorage.setItem(key, value.toString());
			} else if (typeof value === "object") {
				if (value instanceof Map) {
					localStorage.setItem(key, JSON.stringify(Object.fromEntries(value)));
				} else {
					value = JSON.stringify(value);
					if (gzip) {
						const compressed = compressSync(strToU8(value, true));
						value = strFromU8(compressed, true);
					}
					localStorage.setItem(key, value);
				}
			}
		}
	}

	function set(value: T) {
		saveToStorage(value);
		store.set(value);
	}

	function update(fn: Updater<T>) {
		const value = fn(get(store));
		saveToStorage(value);
		store.update(fn);
	}

	loadFromStorage();

	return {
		subscribe: store.subscribe,
		set,
		update,
	};
}
