<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		appearance = 'editorial',
		tone = 'paper',
		split = false,
		interactive = false,
		class: className,
		children
	}: {
		appearance?: 'editorial' | 'project' | 'collection';
		tone?: 'paper' | 'cream' | 'dark';
		split?: boolean;
		interactive?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	const toneClasses = {
		paper: 'border-dci-teal/15 bg-dci-paper text-foreground',
		cream: 'border-dci-teal/15 bg-dci-cream text-foreground',
		dark: 'border-dci-cream/15 bg-dci-teal-deep text-dci-cream'
	};
</script>

<article
	data-appearance={appearance}
	data-split={split ? 'true' : undefined}
	class={cn(
		'relative flex h-full flex-col rounded-2xl border',
		appearance === 'collection' ? 'dci-card-collection' : 'overflow-hidden',
		split && 'md:grid md:grid-cols-2',
		interactive && 'dci-soft-hover',
		toneClasses[tone],
		className
	)}
>
	{@render children?.()}
</article>
