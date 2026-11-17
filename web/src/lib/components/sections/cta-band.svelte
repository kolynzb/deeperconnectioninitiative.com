<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	// The closing call to action on a page: a burgundy panel, inset so it never
	// runs into the teal footer. Use Button variant="inverse" / "inverse-outline".
	let {
		eyebrow,
		title,
		description,
		actions
	}: {
		eyebrow?: string;
		title: string | Snippet;
		description?: string;
		actions?: Snippet;
	} = $props();
</script>

<section class="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="mx-auto max-w-7xl rounded-4xl bg-dci-burgundy px-6 py-16 text-center text-dci-cream sm:px-10 lg:py-24"
	>
		{#if eyebrow}
			<p class="type-eyebrow text-dci-cream/75">{eyebrow}</p>
		{/if}
		<h2 class="type-headline mx-auto mt-4 max-w-3xl [&_em]:text-dci-clay">
			{#if typeof title === 'string'}{title}{:else}{@render title()}{/if}
		</h2>
		{#if description}
			<p class="type-lede mx-auto mt-6 max-w-lg text-dci-cream/75">{description}</p>
		{/if}
		{#if actions}
			<div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
				{@render actions()}
			</div>
		{/if}
	</div>
</section>
