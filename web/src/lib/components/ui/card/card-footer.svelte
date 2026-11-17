<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		meta,
		tone = 'light',
		class: className,
		children
	}: {
		meta?: string;
		tone?: 'light' | 'dark';
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<footer
	class={cn(
		'mt-auto flex flex-wrap items-center justify-between gap-4 border-t px-6 py-4 sm:px-8',
		tone === 'dark'
			? 'border-dci-cream/15 bg-dci-ink/25 text-dci-cream'
			: 'border-dci-teal/12 bg-dci-cream/55 text-foreground',
		className
	)}
>
	{#if meta}
		<p class={cn('text-sm', tone === 'dark' ? 'text-dci-cream/80' : 'text-muted-foreground')}>
			{meta}
		</p>
	{/if}
	{@render children?.()}
</footer>
