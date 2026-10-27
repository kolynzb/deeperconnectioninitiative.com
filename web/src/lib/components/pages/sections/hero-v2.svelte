<script lang="ts">
	import VideoEmbed from '@/lib/components/video-embed.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<!--
	Editorial hero: one large, regular-weight headline with a single italic
	accent, centred, and the film wide underneath. The video sits above the
	path finder's dark band, which tucks up behind its lower half.
-->
<section class="relative z-10 w-full px-4 pt-32 sm:px-6 lg:px-8 lg:pt-40">
	<div class="mx-auto max-w-5xl text-center">
		<h1 class="type-display text-foreground">
			Tools that put healing back in <em class="text-dci-burgundy">your hands.</em>
		</h1>

		<p class="type-lede mx-auto mt-8 max-w-xl text-muted-foreground">
			A mental health initiative equipping individuals and communities with a physical wellness
			toolkit and an AI-powered early warning system for earlier support and intervention.
		</p>

		<div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
			<Button href="/toolkit#toolkit-products">Buy a toolkit</Button>
			<Button href="/checkout/donate" variant="outline">Sponsor a toolkit</Button>
		</div>
	</div>

	<div class="mx-auto mt-16 max-w-5xl lg:mt-20">
		<VideoEmbed
			videoId="wMUYQ6uZn0Q"
			poster="/photos/events/event-7.webp"
			posterSrcset="/photos/events/event-7-640.webp 640w, /photos/events/event-7.webp 1100w"
			title="The Airbnb of Mental Health: Uganda's New Early Warning System"
			class="rounded-4xl"
		/>
	</div>
</section>
