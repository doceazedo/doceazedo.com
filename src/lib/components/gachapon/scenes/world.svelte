<script lang="ts">
	import { T } from "@threlte/core";

	let { children } = $props();
</script>

<T.OrthographicCamera
	makeDefault
	zoom={100}
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1.75, 0);
	}}
/>

<T.HemisphereLight skyColor="#f5f5f5" groundColor="#dddddd" intensity={0.6} />

<T.DirectionalLight
	position={[5, 8, 5]}
	intensity={1.2}
	castShadow
	shadow-mapSize-width={1024}
	shadow-mapSize-height={1024}
/>

<T.DirectionalLight position={[-5, 6, 4]} intensity={0.5} />

{@render children()}
