<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import { reveal } from '$lib/actions/reveal';
	import Eyebrow from './eyebrow.svelte';

	// Every section title on the site. Pass `title` as a snippet to italicise one
	// phrase: <em> picks up the accent colour for the tone automatically.
	let {
		eyebrow,
		title,
		description,
		tone = 'light',
		align = 'left',
		split = false,
		class: className,
		children
	}: {
		eyebrow?: string;
		title: string | Snippet;
		description?: string;
		tone?: 'light' | 'dark';
		align?: 'left' | 'center';
		/** Description sits beside the heading on large screens. */
		split?: boolean;
		class?: string;
		/** Extra content under the description, e.g. a button. */
		children?: Snippet;
	} = $props();
</script>

<div
	use:reveal={{ delay: 0, y: 18 }}
	class={cn(
		split ? 'grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12' : 'max-w-3xl',
		align === 'center' && 'mx-auto text-center',
		className
	)}
>
	<div class="space-y-4">
		{#if eyebrow}
			<Eyebrow label={eyebrow} {tone} />
		{/if}
		<h2
			class={cn(
				'type-headline max-w-3xl',
				tone === 'dark'
					? 'text-dci-cream [&_em]:text-dci-clay'
					: 'text-foreground [&_em]:text-dci-burgundy',
				align === 'center' && 'mx-auto'
			)}
		>
			{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
		</h2>
	</div>
	{#if description || children}
		<div class={cn('space-y-6', !split && 'mt-6')}>
			{#if description}
				<p
					class={cn(
						'type-lede max-w-xl',
						tone === 'dark' ? 'text-dci-cream/75' : 'text-muted-foreground',
						align === 'center' && 'mx-auto'
					)}
				>
					{description}
				</p>
			{/if}
			{@render children?.()}
		</div>
	{/if}
</div>
