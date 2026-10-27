<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ToolkitDemo from '$lib/components/pages/sections/toolkit-demo.svelte';
	import ProductGallery from '$lib/components/product-gallery.svelte';
	import { PageHero, Section, SectionHeading } from '$lib/components/sections';
	import { Button } from '$lib/components/ui/button';
	import { cardGamePhotos, journalPhotos, moodTrackerPhotos } from '$lib/product-photos';
	import { paymentLinks } from '$lib/payment-links';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';

	const products = [
		{
			name: 'DCI Card Game',
			description: 'Conversation prompts for low-pressure emotional check-ins.',
			price: '69,000 UGX',
			href: paymentLinks.cardGame,
			image: '/photos/product-card-game.webp',
			images: cardGamePhotos,
			video: null as string | null
		},
		{
			name: 'DCI Reflection Journal',
			description: 'Guided pages for processing, naming, and noticing what is happening.',
			price: '100,000 UGX',
			href: paymentLinks.journal,
			image: '/photos/product-journal.webp',
			images: journalPhotos,
			video: '/videos/journal.mp4'
		},
		{
			name: 'DCI Mood Tracker',
			description: 'A simple daily rhythm for noticing emotional patterns over time.',
			price: '31,000 UGX',
			href: paymentLinks.moodTracker,
			image: '/photos/product-mood-tracker.webp',
			images: moodTrackerPhotos,
			video: '/videos/mood-tracker.mp4'
		}
	];
</script>

<PageHero
	eyebrow="Open the kit"
	title="Explore the tools before choosing what fits."
	description="The DCI toolkit is designed to be tactile and practical: cards to open conversation, a journal to shape reflection, and a mood tracker to notice patterns."
>
	{#snippet aside()}
		<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8">
			<p class="type-eyebrow text-dci-teal">How to use this page</p>
			<p class="type-subtitle mt-4 text-foreground">
				Tap through the kit demo, then choose the individual tool or full kit that matches your
				setting.
			</p>
		</div>
	{/snippet}
</PageHero>

<Section class="pt-0 lg:pt-0">
	<ToolkitDemo />
</Section>

<Section id="toolkit-products" class="scroll-mt-28">
	<SectionHeading
		eyebrow="Choose a tool"
		title="Buy one piece or support access to the full kit."
	/>

	<div class="mt-12 space-y-6">
		{#each products as product, index}
			<article
				use:reveal={{ delay: index * 90, y: 22 }}
				class="grid overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-paper md:min-h-[22rem] md:grid-cols-2"
			>
				<div class={`relative min-h-72 overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
					<!-- Absolute so the photo fills the row instead of setting its height. -->
					<div class="absolute inset-0">
						<ProductGallery
							images={product.images}
							alt={product.name}
							video={product.video}
							poster={product.image}
							imgClass="min-h-72"
						/>
					</div>
				</div>

				<div class="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
					<div class="space-y-4">
						<h3 class="type-title text-foreground">{product.name}</h3>
						<p class="max-w-lg text-base leading-relaxed text-muted-foreground">
							{product.description}
						</p>
					</div>

					<div class="flex flex-wrap items-center justify-between gap-4">
						<p class="font-serif text-3xl text-dci-teal-deep">{product.price}</p>
						<Button href={product.href} target="_blank" rel="noopener noreferrer">
							Get this tool
							<ArrowUpRight weight="regular" />
						</Button>
					</div>
				</div>
			</article>
		{/each}

		<article
			use:reveal={{ delay: 120, y: 22 }}
			class="overflow-hidden rounded-4xl bg-dci-teal-deep text-dci-cream"
		>
			<img
				src="/photos/product-full-toolkit.webp"
				alt="The complete DCI toolkit: card game, reflection journal, and mood tracker"
				loading="lazy"
				class="h-56 w-full object-cover object-[center_72%] sm:h-64 lg:h-72"
			/>
			<div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
				<div class="space-y-5">
					<p class="type-eyebrow text-dci-cream/75">Complete kit</p>
					<h3 class="type-title text-dci-cream">All tools together.</h3>
					<p class="max-w-xl text-base leading-relaxed text-dci-cream/75">
						Card Game, Reflection Journal, Mood Tracker, and QR access bundled for personal and
						group support.
					</p>
				</div>

				<div
					class="flex flex-col justify-end gap-3 border-t border-dci-cream/15 pt-8 sm:flex-row lg:flex-col lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
				>
					<Button
						variant="inverse"
						href={paymentLinks.toolkit}
						target="_blank"
						rel="noopener noreferrer"
					>
						Buy complete kit
					</Button>
					<Button
						variant="inverse-outline"
						href={paymentLinks.donation}
						target="_blank"
						rel="noopener noreferrer"
					>
						Sponsor a kit
					</Button>
				</div>
			</div>
		</article>
	</div>
</Section>
