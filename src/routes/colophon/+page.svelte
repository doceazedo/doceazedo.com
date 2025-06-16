<script lang="ts">
	import Prose from "$lib/components/parts/prose.svelte";
	import SectionTitleWithIcon from "$lib/components/parts/section-title-with-icon.svelte";
	import Seo from "$lib/components/seo.svelte";
	import { m } from "$lib/paraglide/messages";
	import {
		CodeSSlashLineDevelopment,
		CpuLineDevice,
		Heart3FillHealthMedical,
		HistoryFillSystem,
		LineChartLineBusiness,
		MarkdownLineDocument,
		PencilRuler2FillDesign,
		PlugFillOthers,
		RemixiconLineLogos,
		ServerLineDevice,
	} from "svelte-remix";
	import List from "./list.svelte";
	import {
		siCloudflare,
		siDiscogs,
		siFortnite,
		siGithub,
		siLastdotfm,
		siMapbox,
		siShadcnui,
		siSimpleicons,
		siSteam,
		siSvelte,
		siTailwindcss,
		siVercel,
	} from "simple-icons";
</script>

<Seo title={m.colophon_seo_title()} />

<div class="flex flex-col gap-12">
	<hgroup class="py-3 md:py-6">
		<h1 class="text-3xl md:text-4xl">{m.colophon()}</h1>
		<p
			class="text-body [&>a]:hover:text-primary [&>a]:text-foreground [&>a]:underline [&>a]:transition-all"
		>
			{@html m.colophon_subtitle()}
		</p>
	</hgroup>

	<SectionTitleWithIcon
		icon={CodeSSlashLineDevelopment}
		title="Tech stack"
		subtitle="The technologies and tools that powers this website."
	/>
	<Prose>
		<List
			items={[
				{
					label: "SvelteKit",
					description: "Web development framework.",
					icon: siSvelte.svg,
					url: "https://svelte.dev",
				},
				{
					label: "Tailwind",
					description: "Utility CSS framework.",
					icon: siTailwindcss.svg,
					url: "https://tailwindcss.com",
				},
				{
					label: "shadcn-svelte",
					description: "Svelte port of shadcn/ui, (not) a component library.",
					icon: siShadcnui.svg,
					url: "https://shadcn-svelte.com",
				},
				{
					label: "Remix Icon",
					description: "Neutral icons library.",
					icon: RemixiconLineLogos,
					url: "https://remixicon.com",
				},
				{
					label: "Simple Icons",
					description: "Brand icons library.",
					icon: siSimpleicons.svg,
					url: "https://simpleicons.org",
				},
				{
					label: "MDsveX",
					description: "Markdown preprocessor for Svelte.",
					icon: MarkdownLineDocument,
					url: "https://mdsvex.pngwn.io",
				},
				{
					label: "Mapbox",
					description: 'Interactive map used on <a href="/me">/me</a>.',
					icon: siMapbox.svg,
					url: "https://www.mapbox.com",
				},
			]}
		/>
	</Prose>

	<hr />

	<SectionTitleWithIcon
		icon={ServerLineDevice}
		title="Hosting"
		subtitle="Services that brings this website to you."
	/>
	<Prose>
		<List
			items={[
				{
					label: "Vercel",
					description: "Free web hosting.",
					icon: siVercel.svg,
					url: "https://vercel.com",
				},
				{
					label: "CloudFlare",
					description: "DNS provider.",
					icon: siCloudflare.svg,
					url: "https://cloudflare.com",
				},
			]}
		/>
	</Prose>

	<hr />

	<SectionTitleWithIcon
		icon={PlugFillOthers}
		title="Third-party APIs"
		subtitle="Services that I use to feed data to this website."
	/>
	<Prose>
		<List
			items={[
				{
					label: "Last.fm",
					description: "Current playing and last played tracks.",
					icon: siLastdotfm.svg,
					url: "https://www.last.fm/api",
				},
				{
					label: "Discogs",
					description: "My vinyl records collection.",
					icon: siDiscogs.svg,
					url: "https://www.discogs.com/developers",
				},
				{
					label: "GitHub",
					description: "Last commit on my current side project.",
					icon: siGithub.svg,
					url: "https://docs.github.com/rest",
				},
				{
					label: "Steam",
					description: "Most played games in the past weeks.",
					icon: siSteam.svg,
					url: "https://steamcommunity.com/dev",
				},
				{
					label: "SteamGridDB",
					description: "Better cover arts for some games.",
					icon: siSteam.svg,
					url: "https://www.steamgriddb.com/api/v2",
				},
				{
					label: "Fortnite-API",
					description: "Last time I played Fortnite (unofficial API).",
					icon: siFortnite.svg,
					url: "https://dash.fortnite-api.com",
				},
			]}
		/>
	</Prose>

	<hr />

	<SectionTitleWithIcon
		icon={LineChartLineBusiness}
		title="Anonymous analytics"
	/>
	<Prose>
		<p>
			This site uses <a
				href="https://plausible.io"
				target="_blank"
				rel="noopener noreferrer">Plausible</a
			> to get an approximate number of visitors, fully anonymously. No identifiable
			information about you or your requests is ever stored. All data is anonymized
			and aggregated.
		</p>
		<p>
			Plausible doesn't use cookies and is fully compliant with 🇪🇺 GDPR, 🇺🇸
			CCPA, 🇬🇧 PECR and 🇧🇷 LGPD.
		</p>
		<a
			href="https://plausible.io/privacy-focused-web-analytics"
			target="_blank"
			rel="noopener noreferrer"
		>
			Learn more about Plausible's dedication to privacy.
		</a>
	</Prose>

	<hr />

	<SectionTitleWithIcon icon={CpuLineDevice} title="AI usage" />

	<Prose>
		<p>
			Everything you see here was made by me. The code, the design, the writing,
			everything. I do lightly use LLMs and AI as a tool.
		</p>
		<p>Please read my <a href="/ai">AI manifesto</a>.</p>
	</Prose>

	<hr />

	<SectionTitleWithIcon icon={PencilRuler2FillDesign} title="Design" />
	<Prose class="prose-h3:font-normal prose-h3:text-xl md:prose-h3:text-2xl">
		<p>Figma.</p>
		<h3>Overall design</h3>
		<h3>Key principles</h3>
		<h3>Revamping the old design</h3>
		<h3>Pages vs blog posts</h3>
	</Prose>

	<hr />

	<SectionTitleWithIcon icon={HistoryFillSystem} title="Previous versions" />
	<Prose class="prose-h3:font-normal prose-h3:text-xl md:prose-h3:text-2xl">
		<p>Est. 2021</p>
		<h3>lucasfernandes.com.br</h3>
		<h3>doceazedo.com</h3>
	</Prose>

	<hr />

	<SectionTitleWithIcon
		icon={Heart3FillHealthMedical}
		title="Acknowledgements"
	/>
	<Prose>
		<List
			items={[
				{
					label: "IndieWeb",
					description: "A community of independent and personal websites.",
					url: "https://indieweb.org",
				},
				{
					label: "Damola Morenikeji",
					description: 'The <a href="/ai">/ai</a> manifesto.',
					url: "https://www.bydamo.la/p/ai-manifesto",
				},
				{
					label: "Tania Rascia's website",
					description: "Huge source of inspiration in general.",
					url: "https://www.taniarascia.com/",
				},
				{
					label: "Jarema's website",
					description: "Inspiration for many of the pages of this site.",
					url: "https://jarema.me",
				},
				{
					label: "João Pescada's website",
					description:
						'Inspiration for the <a href="/me">/me</a> page and funny &lt;title&gt;s.',
					url: "https://joaopescada.com",
				},
				{
					label: "Josh W. Comeau's website",
					description: 'Idea for the map on the <a href="/me">/me</a> page.',
					url: "https://joshwcomeau.com/about-josh",
				},
				{
					label: "Bulk Resize Photos",
					description:
						"Super helpful tool for resizing and compressing images.",
					url: "https://bulkresizephotos.com",
				},
				{
					label: "cobalt's privacy policy",
					description: "Excerpt about analytics.",
					url: "https://cobalt.tools/about/privacy",
				},
			]}
		/>
	</Prose>
</div>
