<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { PageHero } from '$lib/components/sections';

	let missing = $derived(page.status === 404);
</script>

<PageHero
	eyebrow={missing ? 'Page not found' : 'Something went wrong'}
	title={missing ? "We couldn't find that page." : 'This page failed to load.'}
	description={missing
		? 'It may have moved, or the link was mistyped. Start from the homepage or pick up the toolkit.'
		: 'Please try again in a moment. If it keeps happening, let us know.'}
>
	{#snippet actions()}
		<Button href="/">Go to the homepage</Button>
		<Button href={missing ? '/toolkit' : '/contact'} variant="outline">
			{missing ? 'See the toolkit' : 'Contact us'}
		</Button>
	{/snippet}
</PageHero>
<div class="pb-24"></div>
