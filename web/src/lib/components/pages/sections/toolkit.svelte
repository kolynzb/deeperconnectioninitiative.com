<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { paymentLinks } from '$lib/payment-links';
	import ProductGallery from '$lib/components/product-gallery.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { Section, SectionHeading } from '$lib/components/sections';
	import { cardGamePhotos, journalPhotos, moodTrackerPhotos } from '$lib/product-photos';

	// Only autoplay the product videos when the user hasn't asked for reduced
	// motion. Starts off (poster shown) and enables on the client if allowed,
	// so motion-sensitive users never see a flash of playback.
	let allowMotion = $state(false);
	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	const products = [
		{
			name: 'DCI Card Game',
			description:
				"60 conversation cards that open the doors you've been keeping closed. Play with friends, family, or use them solo alongside your journal. Start light, go as deep as you're ready for. Each card is a question worth sitting with.",
			credit:
				'Compiled by Ann Banya, Early Child Development Specialist, 40+ years of experience.' as
					string | null,
			miles: '8 Connection Miles',
			price: '69,000 UGX',
			image: '/photos/product-card-game.jpg',
			images: cardGamePhotos as string[] | null,
			video: null as string | null,
			paymentLink: paymentLinks.cardGame
		},
		{
			name: 'DCI Reflection Journal',
			description:
				'A year-long emotional healing journey, guided by Ann Banya. Each month explores a different stage of your development, helping you understand where your patterns, habits, and feelings actually came from. Because healing starts with understanding your story.',
			credit: null as string | null,
			miles: '1 Connection Mile',
			price: '100,000 UGX',
			image: '/photos/product-journal.jpg',
			images: journalPhotos as string[] | null,
			video: '/videos/journal.mp4',
			paymentLink: paymentLinks.journal
		},
		{
			name: 'DCI Mood Tracker',
			description:
				'12 months. Daily check-ins. One colour at a time. Track how you actually feel, not how you think you should feel. Look back weekly or monthly and start to see your patterns: what triggers you, what restores you, what your stress has been trying to tell you all along.',
			credit: null as string | null,
			miles: '1 Connection Mile',
			price: '31,000 UGX',
			image: '/photos/product-mood-tracker.jpg',
			images: moodTrackerPhotos as string[] | null,
			video: '/videos/mood-tracker.mp4',
			paymentLink: paymentLinks.moodTracker
		}
	];
</script>

<!--
	Heading on top like every other section, then the products full width so
	each card has room for its photo and its text side by side.
-->
<Section id="toolkit">
	<SectionHeading
		eyebrow="The DCI Wellness Toolkit"
		split
		description="Designed for homes, schools, clinics, youth groups, and community circles where support needs to work without perfect internet, expert language, or a formal therapy room."
	>
		{#snippet title()}Physical tools for conversations people can <em>actually start.</em>{/snippet}
		<Button href="/toolkit" variant="outline">
			Open the kit
			<ArrowUpRight weight="regular" />
		</Button>
	</SectionHeading>

	<div class="mt-12 space-y-6">
		<div id="toolkit-products" class="scroll-mt-28"></div>
		{#each products as product, index}
			<article
				use:reveal={{ delay: index * 90, y: 22 }}
				class="group grid overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-paper md:min-h-[22rem] md:grid-cols-2"
			>
				<div class={`relative min-h-72 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
					{#if product.images}
						<ProductGallery
							images={product.images}
							alt={product.name}
							video={product.video}
							poster={product.image}
							imgClass="min-h-72"
							cover
						/>
					{:else if product.video}
						<video
							src={product.video}
							poster={product.image}
							autoplay={allowMotion}
							loop
							muted
							playsinline
							preload="none"
							aria-label={product.name}
							class={`h-full min-h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] ${index === 0 ? 'bg-dci-blush' : index === 1 ? 'bg-dci-mist' : 'bg-dci-oat'}`}
						></video>
					{:else}
						<img
							src={product.image}
							alt={product.name}
							loading="lazy"
							class={`h-full min-h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] ${index === 0 ? 'bg-dci-blush' : index === 1 ? 'bg-dci-mist' : 'bg-dci-oat'}`}
						/>
					{/if}
				</div>

				<div class="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
					<div class="space-y-4">
						<h3 class="type-title text-foreground">{product.name}</h3>
						<p class="max-w-lg text-base leading-relaxed text-muted-foreground">
							{product.description}
						</p>
						{#if product.credit}
							<p class="max-w-md text-sm italic leading-relaxed text-muted-foreground">
								{product.credit}
							</p>
						{/if}
						<p class="text-sm text-muted-foreground">
							Earns <a href="/connection-miles" class="text-dci-teal underline underline-offset-4"
								>{product.miles}</a
							>
						</p>
					</div>

					<div class="flex flex-wrap items-center justify-between gap-4">
						<p class="font-serif text-3xl text-dci-teal-deep">{product.price}</p>
						<Button href={product.paymentLink} target="_blank" rel="noopener noreferrer">
							Get this tool
							<ArrowUpRight class="size-4" weight="regular" />
						</Button>
					</div>
				</div>
			</article>
		{/each}

		<article
			use:reveal={{ delay: 120, y: 22 }}
			class="overflow-hidden rounded-4xl border border-dci-cream/15 bg-dci-teal-deep text-dci-cream"
		>
			<img
				src="/photos/product-full-toolkit.jpg"
				alt="The complete DCI toolkit: card game, reflection journal, and mood tracker"
				loading="lazy"
				class="h-56 w-full object-cover object-[center_72%] sm:h-64 lg:h-72"
			/>
			<div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
				<div class="space-y-5">
					<h3 class="type-title text-dci-cream">The <em class="text-dci-clay">full</em> toolkit</h3>
					<p class="max-w-xl text-base leading-relaxed text-dci-cream/75">
						Card Game, Reflection Journal, Mood Tracker, and QR access bundled for everyday
						self-awareness, group facilitation, and community support.
					</p>
				</div>

				<div
					class="flex flex-col justify-between gap-8 border-t border-dci-cream/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
				>
					<div>
						<p class="type-eyebrow text-dci-cream/75">Complete kit</p>
						<div class="mt-2 flex items-end gap-3">
							<span class="font-serif text-5xl text-dci-cream">200k</span>
							<span class="mb-2 text-sm text-dci-cream/75">UGX</span>
						</div>
						<p class="mt-3 text-sm text-dci-cream/75">10% funds community champion training.</p>
					</div>

					<div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
						<Button
							variant="inverse"
							href={paymentLinks.toolkit}
							target="_blank"
							rel="noopener noreferrer"
						>
							Buy complete kit
						</Button>
						<Button
							href={paymentLinks.donation}
							target="_blank"
							rel="noopener noreferrer"
							variant="inverse-outline"
						>
							Sponsor a kit
						</Button>
					</div>
				</div>
			</div>
		</article>
	</div>
</Section>
