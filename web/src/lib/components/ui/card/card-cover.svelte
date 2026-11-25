<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		tint = 'cream',
		flush = false,
		class: className,
		children
	}: {
		tint?: 'cream' | 'mist' | 'blush' | 'oat' | 'dark';
		flush?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	const tintClasses = {
		cream: 'border-dci-teal/10 bg-dci-cream text-foreground',
		mist: 'border-dci-teal/12 bg-dci-mist text-foreground',
		blush: 'border-dci-burgundy/12 bg-dci-blush text-foreground',
		oat: 'border-dci-teal/12 bg-dci-oat text-foreground',
		dark: 'border-dci-cream/15 bg-dci-teal-deep text-dci-cream'
	};
</script>

<div
	class={cn(
		'relative overflow-hidden',
		flush ? 'border-b' : 'm-2.5 mb-0 rounded-2xl border p-5 sm:p-6',
		tintClasses[tint],
		className
	)}
>
	{@render children?.()}
</div>
