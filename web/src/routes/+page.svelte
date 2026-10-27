<script>
	import HeroV2 from '@/lib/components/pages/sections/hero-v2.svelte';
	import FlowingThoughts from '@/lib/components/pages/sections/flowing-thoughts.svelte';
	import CrisisPrevention from '@/lib/components/pages/sections/crisis-prevention.svelte';
	import Toolkit from '@/lib/components/pages/sections/toolkit.svelte';
	import CardDraw from '@/lib/components/pages/sections/card-draw.svelte';
	import ImpactStories from '@/lib/components/pages/sections/impact-stories.svelte';
	import Founder from '@/lib/components/pages/sections/founder.svelte';
	import PathFinder from '@/lib/components/pages/sections/path-finder.svelte';
	import ClosingCta from '@/lib/components/pages/sections/closing-cta.svelte';
</script>

<!--
	The client's order, with duplicates removed: promise → pick your path → what
	people carry → the problem → who's behind it → proof → the tools. Products appear only in the
	Toolkit section; How DCI works lives on /about.
-->
<HeroV2 />
<PathFinder />
<div class="py-12 lg:py-16"><FlowingThoughts /></div>
<CrisisPrevention />
<Founder />
<ImpactStories />
<Toolkit />
<CardDraw />
<ClosingCta />
