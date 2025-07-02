<script lang="ts">
	import { CHA_CHING_AUDIO, GUMBALL_DISPENSE_AUDIO } from "../stores";
</script>

<audio
	src="/audio/cha-ching.ogg"
	preload="auto"
	controls={false}
	volume={0.5}
	bind:this={$CHA_CHING_AUDIO}
	class="hidden"
></audio>

<audio
	src="/audio/gumball-dispense.ogg"
	preload="auto"
	controls={false}
	volume={0.5}
	bind:this={$GUMBALL_DISPENSE_AUDIO}
	class="hidden"
></audio>
