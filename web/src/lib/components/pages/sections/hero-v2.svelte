<script lang="ts">
	import VideoEmbed from '@/lib/components/video-embed.svelte';
	import { reveal } from '@/lib/actions/reveal';
</script>

<!--
	Editorial hero: one large, regular-weight headline with a single italic
	accent, centred, and the film wide underneath. The video sits above the
	path finder's dark band, which tucks up behind its lower half.
-->
<section class="relative z-10 w-full px-4 pt-32 sm:px-6 lg:px-8 lg:pt-40">
	<div class="mx-auto max-w-5xl text-center" use:reveal={{ delay: 0, y: 18 }}>
		<h1
			class="text-6xl leading-[0.98] font-normal tracking-tight text-balance text-foreground sm:text-7xl lg:text-8xl"
		>
			Tools that put healing back in <em class="text-dci-burgundy">your hands.</em>
		</h1>

		<p
			class="mx-auto mt-8 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg"
		>
			A mental health initiative equipping individuals and communities with a physical wellness
			toolkit and an AI-powered early warning system for earlier support and intervention.
		</p>

		<div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
			<a
				href="/toolkit#toolkit-products"
				class="inline-flex h-12 items-center justify-center rounded-full bg-dci-teal-deep px-8 text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.98]"
			>
				Buy a toolkit
			</a>
			<a
				href="/checkout/donate"
				class="inline-flex h-12 items-center justify-center rounded-full border border-dci-teal-deep/30 px-8 text-sm font-semibold text-dci-teal-deep transition hover:bg-dci-teal/5 active:scale-[0.98]"
			>
				Sponsor a toolkit
			</a>
		</div>
	</div>

	<div class="mx-auto mt-16 max-w-5xl lg:mt-20" use:reveal={{ delay: 120, y: 18 }}>
		<VideoEmbed
			videoId="wMUYQ6uZn0Q"
			title="The Airbnb of Mental Health: Uganda's New Early Warning System"
			class="rounded-4xl"
		/>
	</div>
</section>
