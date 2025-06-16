<script lang="ts">
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";

	let { children, class: className }: { children: Snippet; class?: string } =
		$props();
</script>

<article
	class={cn(
		"prose prose-neutral dark:prose-invert prose-headings:font-semibold prose-code:before:hidden prose-blockquote:[&>p]:before:hidden prose-code:after:hidden prose-blockquote:not-italic prose-blockquote:bg-primary/20 [&>p>code]:bg-primary/20 prose-blockquote:border-primary prose-blockquote:rounded prose-blockquote:p-3 prose-blockquote:[&>p]:m-0 prose-blockquote:font-normal [&>p>code]:text-primary dark:[&_[data-remark-code-title]]:bg-muted/50 prose-img:rounded prose-strong:text-foreground prose-a:hover:text-primary prose-a:transition-all prose-li:my-0 prose-ul:marker:text-primary prose-img:border max-w-full [&_[data-remark-code-title]]:-mb-2 [&_[data-remark-code-title]]:rounded-t [&_[data-remark-code-title]]:bg-neutral-200 [&_[data-remark-code-title]]:px-3 [&_[data-remark-code-title]]:py-1.5 [&_[data-remark-code-title]+pre]:rounded-t-none [&>p>code]:rounded [&>p>code]:px-1 [&>p>code]:py-0.5 [&>p>code]:font-normal",
		className,
	)}
>
	{@render children()}
</article>
