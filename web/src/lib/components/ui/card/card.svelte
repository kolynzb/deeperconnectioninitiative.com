<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { depth } from '$lib/actions/flow';

	let {
		appearance = 'editorial',
		tone = 'paper',
		split = false,
		interactive = false,
		lift = false,
		class: className,
		children
	}: {
		appearance?: 'editorial' | 'project' | 'collection';
		tone?: 'paper' | 'cream' | 'dark';
		split?: boolean;
		interactive?: boolean;
		/** Cojeev's pointer depth: tilt, lift and light. */
		lift?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	const toneClasses = {
		paper: 'border-dci-teal/15 bg-dci-paper text-foreground',
		cream: 'border-dci-teal/15 bg-dci-cream text-foreground',
		dark: 'border-dci-cream/15 bg-dci-teal-deep text-dci-cream'
	};

	const classes = $derived(
		cn(
			'relative flex h-full flex-col rounded-2xl border',
			appearance === 'collection' ? 'dci-card-collection' : 'overflow-hidden',
			split && 'md:grid md:grid-cols-2',
			interactive && 'dci-soft-hover',
			toneClasses[tone],
			className
		)
	);
</script>

<article
	data-slot="card"
	data-appearance={appearance}
	data-split={split ? 'true' : undefined}
	use:depth={lift}
	class={classes}
>
	{@render children?.()}
</article>
