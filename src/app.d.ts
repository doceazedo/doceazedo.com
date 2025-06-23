import mapboxgl from "mapbox-gl";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare interface Window {
		mapboxgl: typeof mapboxgl;
		rosebud: () => void;
		kaching: () => void;
		motherlode: () => void;
	}
}

export {};
