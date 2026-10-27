<script lang="ts">
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { reveal } from '$lib/actions/reveal';
	import { PlayIcon, XIcon } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Eyebrow } from '$lib/components/sections';

	let showVideo = $state(false);
	let closeButton = $state<HTMLButtonElement | null>(null);

	const videoId = 'wMUYQ6uZn0Q';

	const affiliations = [
		'UPFMH',
		'Butabika National Referral Hospital',
		'Ministry of Education Uganda'
	];

	const fadeDuration = () =>
		browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160;

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') showVideo = false;
	}

	// While the lightbox is open, lock background scroll and move focus into it.
	$effect(() => {
		if (!browser) return;
		if (showVideo) {
			document.body.style.overflow = 'hidden';
			closeButton?.focus();
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={onKeydown} />

<section id="founder" class="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div class="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
		<figure class="mx-auto w-full max-w-md md:mx-0" use:reveal={{ delay: 0, y: 18 }}>
			<img
				src="/photos/ann-banya.jpg"
				alt="Ann Banya, Early Child Development Specialist"
				loading="lazy"
				class="aspect-[4/5] w-full rounded-4xl object-cover object-top"
			/>
			<figcaption class="mt-4 flex items-baseline justify-between gap-4 border-t border-dci-teal/15 pt-4">
				<span class="font-serif text-xl text-foreground">Ann Banya</span>
				<span class="text-sm text-muted-foreground">Early Child Development Specialist</span>
			</figcaption>
		</figure>

		<div class="space-y-6" use:reveal={{ delay: 120, y: 18 }}>
			<Eyebrow label="The founder" />
			<h2 class="type-headline text-foreground">
				<em class="text-dci-burgundy">40+ years</em> of experience started this journey
			</h2>
			<p class="type-lede text-muted-foreground">
				DCI is built on four decades of behavioural practice, not an emerging idea. Every toolkit,
				clinic, and training carries that experience behind it.
			</p>

			<Button variant="outline" onclick={() => (showVideo = true)}>
				<PlayIcon weight="fill" />
				Watch her story
			</Button>

			<div class="pt-4">
				<p class="type-eyebrow mb-3 text-muted-foreground">Trusted alongside</p>
				<!-- Plain names, not pills, so they don't read as buttons. Swap for logos once we have them. -->
				<ul class="divide-y divide-dci-teal/15 border-y border-dci-teal/15">
					{#each affiliations as name (name)}
						<li class="py-3 font-serif text-xl text-foreground">{name}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	{#if showVideo}
		<!-- Video lightbox: kept separate from the portrait so the photo and film stand on their own -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-dci-teal-deep/80 p-4 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			aria-label="Ann Banya: video"
			transition:fade={{ duration: fadeDuration() }}
		>
			<button
				type="button"
				class="absolute inset-0 h-full w-full cursor-default"
				aria-label="Close video"
				onclick={() => (showVideo = false)}
			></button>

			<button
				bind:this={closeButton}
				type="button"
				onclick={() => (showVideo = false)}
				aria-label="Close video"
				class="absolute top-4 right-4 z-20 flex size-11 items-center justify-center rounded-full border border-dci-cream/30 bg-dci-cream/10 text-dci-cream transition hover:bg-dci-cream/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dci-cream/70"
			>
				<XIcon class="size-5" weight="bold" />
			</button>

			<div class="relative z-10 w-full max-w-4xl">
				<div class="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-dci-panel">
					<iframe
						src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
						title="Ann Banya: Deeper Connection Initiative"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="h-full w-full"
					></iframe>
				</div>
			</div>
		</div>
	{/if}
</section>
