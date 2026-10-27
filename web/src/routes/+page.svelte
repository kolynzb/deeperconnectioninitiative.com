<script>
	import HeroV2 from '@/lib/components/pages/sections/hero-v2.svelte';
	import FlowingThoughts from '@/lib/components/pages/sections/flowing-thoughts.svelte';
	import CrisisPrevention from '@/lib/components/pages/sections/crisis-prevention.svelte';
	import Toolkit from '@/lib/components/pages/sections/toolkit.svelte';
	import CardDraw from '@/lib/components/pages/sections/card-draw.svelte';
	import ImpactStories from '@/lib/components/pages/sections/impact-stories.svelte';
	import Founder from '@/lib/components/pages/sections/founder.svelte';
	import PathFinder from '@/lib/components/pages/sections/path-finder.svelte';
	import { CtaBand } from '$lib/components/sections';
	import { Button } from '$lib/components/ui/button';
</script>

<!--
	The client's order, with duplicates removed: promise → pick your path → the problem →
	who's behind it → proof → the tools → what people carry, leading into the last call
	to action. Products appear only in the
	Toolkit section; How DCI works lives on /about.
-->
<HeroV2 />
<PathFinder />
<CrisisPrevention />
<Founder />
<ImpactStories />
<Toolkit />
<CardDraw />
<div class="py-12 lg:py-16"><FlowingThoughts /></div>
<CtaBand description="Get a toolkit for yourself, or put one in the hands of someone who can't buy their own.">
	{#snippet title()}Ready to <em>start talking?</em>{/snippet}
	{#snippet actions()}
		<Button href="/toolkit#toolkit-products" variant="inverse">Buy a toolkit</Button>
		<Button href="/checkout/donate" variant="inverse-outline">Sponsor a toolkit</Button>
	{/snippet}
</CtaBand>
