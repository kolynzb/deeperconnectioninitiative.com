<script>
	import HeroV2 from '@/lib/components/pages/sections/hero-v2.svelte';
	import FlowingThoughts from '@/lib/components/pages/sections/flowing-thoughts.svelte';
	import CrisisPrevention from '@/lib/components/pages/sections/crisis-prevention.svelte';
	import Toolkit from '@/lib/components/pages/sections/toolkit.svelte';
	import CardDraw from '@/lib/components/pages/sections/card-draw.svelte';
	import ImpactStories from '@/lib/components/pages/sections/impact-stories.svelte';
	import Founder from '@/lib/components/pages/sections/founder.svelte';
	import PathFinder from '@/lib/components/pages/sections/path-finder.svelte';
</script>

<!--
	Each thing is said once: promise → the problem → the tools (the only place
	products appear) → proof → join (the only place roles and sponsoring appear).
	How DCI works lives on /about.
-->
<HeroV2 />
<div class="py-12 lg:py-16"><FlowingThoughts /></div>
<CrisisPrevention />
<Toolkit />
<CardDraw />
<ImpactStories />
<Founder />
<PathFinder />
