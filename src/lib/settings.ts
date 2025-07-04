import { writable } from "svelte/store";
import { storage } from "./utils/storage";

export const PROSE_SIZE = storage(
	writable({
		base: "16px",
		xl: "18px",
	}),
	"prose_size",
);
