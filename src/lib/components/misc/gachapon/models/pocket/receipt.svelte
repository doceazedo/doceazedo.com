<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.1 ../../../../../static/models/receipt.glb
-->

<script>
	import { T } from "@threlte/core";
	import { useGltf } from "@threlte/extras";
	import { degToRad } from "three/src/math/MathUtils.js";

	let { fallback, error, children, ref = $bindable(), ...props } = $props();

	const gltf = useGltf("/models/receipt.glb");
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Mesh
			geometry={gltf.nodes.Plane.geometry}
			material={gltf.materials.receipt}
			rotation.x={degToRad(90)}
			rotation.z={degToRad(-75)}
			position.y={1.75}
		/>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
