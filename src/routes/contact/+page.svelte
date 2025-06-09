<script lang="ts">
	import { m } from "$lib/paraglide/messages";
	import { onMount } from "svelte";

	let pageHeight = $state(0);

	onMount(() => {
		const navbar = document.getElementsByTagName("nav")[0];
		const footer = document.getElementsByTagName("footer")[0];
		const footerMarginTop = parseInt(window.getComputedStyle(footer).marginTop);
		const footerMarginBottom = parseInt(
			window.getComputedStyle(footer).marginBottom,
		);
		pageHeight =
			window.innerHeight -
			navbar.clientHeight -
			footer.clientHeight -
			footerMarginTop -
			footerMarginBottom -
			4;
	});
</script>

<div
	class="flex w-full flex-col items-center justify-center"
	style="height:{pageHeight}px"
>
	<p class="text-body mb-1.5">{m.ready_when_you_are()}</p>
	<h1 class="text-center text-3xl md:text-4xl">doce@docezedo.com</h1>
</div>
