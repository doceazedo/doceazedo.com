<script lang="ts">
	import { T } from "@threlte/core";
	import { Environment } from "@threlte/extras";

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

<Environment url="/hdr/auto_service_1k.hdr" />

{@render children()}
