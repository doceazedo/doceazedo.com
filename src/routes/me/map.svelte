<script lang="ts">
	import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
	import { onMount } from "svelte";
	import type { Map } from "mapbox-gl";
	import { MY_LOCATION } from "$lib/constants";

	let { userLocation } = $props<{ userLocation: [number, number] | null }>();

	let map: Map;

	onMount(() => {
		window.mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN;

		map = new window.mapboxgl.Map({
			container: "map",
			center: MY_LOCATION,
			zoom: 4,
		});

		map.on("load", () => {
			new window.mapboxgl.Marker(
				document.getElementById("doce-marker") as HTMLElement,
			)
				.setLngLat(MY_LOCATION)
				.addTo(map);

			if (!userLocation) return;

			new window.mapboxgl.Marker(
				document.getElementById("user-marker") as HTMLElement,
			)
				.setLngLat(userLocation)
				.addTo(map);

			map.addSource("route", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [
						{
							type: "Feature",
							geometry: {
								type: "LineString",
								coordinates: [MY_LOCATION, userLocation],
							},
							properties: null,
						},
					],
				},
			});

			map.addLayer({
				id: "route",
				source: "route",
				type: "line",
				paint: {
					"line-width": 4,
					"line-color": "#85cc1a",
				},
			});

			setTimeout(() => {
				map.fitBounds([MY_LOCATION, userLocation], {
					padding: { top: 12, bottom: 24, left: 12, right: 12 },
				});
			}, 500);
		});
	});
</script>

<div id="map" class="size-full"></div>

<img src="/img/memoji-wink.webp" alt="" class="size-12" id="doce-marker" />
<img src="/img/emoji-apple-you.webp" alt="" class="size-10" id="user-marker" />
