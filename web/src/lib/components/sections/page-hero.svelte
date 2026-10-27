<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import Eyebrow from './eyebrow.svelte';

	// The top of every inner page. Pass `title` as a snippet to italicise one phrase.
	let {
		eyebrow,
		title,
		description,
		actions,
		aside
	}: {
		eyebrow?: string;
		title: string | Snippet;
		description?: string;
		actions?: Snippet;
		aside?: Snippet;
	} = $props();
</script>

<section class="relative pt-28">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<div class={aside ? 'grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end' : ''}>
			<div class="space-y-6" use:reveal={{ delay: 0, y: 18 }}>
				{#if eyebrow}
					<Eyebrow label={eyebrow} />
				{/if}
				<h1 class="type-headline max-w-4xl text-foreground lg:text-7xl [&_em]:text-dci-burgundy">
					{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
				</h1>
				{#if description}
					<p class="type-lede max-w-2xl text-muted-foreground">{description}</p>
				{/if}
				{#if actions}
					<div class="flex flex-col gap-3 pt-2 sm:flex-row">
						{@render actions()}
					</div>
				{/if}
			</div>

			{#if aside}
				<div use:reveal={{ delay: 120, y: 18 }}>
					{@render aside()}
				</div>
			{/if}
		</div>
	</div>
</section>
