<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import { ArrowUpRightIcon } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';

	const tools = [
		{
			id: 'cards',
			label: 'Conversation cards',
			kicker: 'Open a prompt',
			title: 'Use a card when a conversation needs a gentle way in.',
			description:
				'Prompts help people speak without performing, explaining everything, or finding perfect mental health language first.',
			detail: 'Best for clinics, youth groups, family check-ins, and first sessions.',
			cta: 'See card game',
			href: '#toolkit-products',
			video: null as string | null,
			poster: '/photos/product-card-game.webp'
		},
		{
			id: 'journal',
			label: 'Reflection journal',
			kicker: 'Follow the page',
			title: 'Give thoughts somewhere structured to land.',
			description:
				'Guided pages make reflection easier for people who need a little shape before they can name what is happening.',
			detail: 'Best for personal practice, counseling support, and post-session reflection.',
			cta: 'See journal',
			href: '#toolkit-products',
			video: '/videos/journal.mp4' as string | null,
			poster: '/photos/product-journal.webp'
		},
		{
			id: 'mood',
			label: 'Mood tracker',
			kicker: 'Notice patterns',
			title: 'Track emotional patterns without turning care into homework.',
			description:
				'A simple rhythm helps people notice what shifts across days, places, relationships, and routines.',
			detail: 'Best for daily awareness, support teams, and low-language mental health settings.',
			cta: 'See tracker',
			href: '#toolkit-products',
			video: '/videos/mood-tracker.mp4' as string | null,
			poster: '/photos/product-mood-tracker.webp'
		}
	];

	type Tool = (typeof tools)[number];

	let activeTool = $state<Tool>(tools[0]);

	// Only autoplay the tool videos when the user hasn't asked for reduced
	// motion. Starts off (poster shown) and enables on the client if allowed.
	let allowMotion = $state(false);
	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
</script>

<div
	use:reveal={{ delay: 80, y: 22 }}
	class="grid overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-paper/70 xl:grid-cols-[0.92fr_1.08fr]"
>
	<div class="p-6 sm:p-8 lg:p-10">
		<h2 class="type-title max-w-lg text-foreground">A tool for the moment you are in.</h2>
		<p class="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
			Each piece has a different job: opening a conversation, making reflection easier, or helping
			someone notice patterns over time.
		</p>

		<div class="mt-8 grid gap-2">
			{#each tools as tool}
				<button
					type="button"
					class={cn(
						'w-full rounded-2xl border px-5 py-4 text-left transition-colors',
						activeTool.id === tool.id
							? 'border-dci-teal/40 bg-dci-teal/5'
							: 'border-dci-teal/15 hover:border-dci-teal/30'
					)}
					aria-pressed={activeTool.id === tool.id}
					onclick={() => (activeTool = tool)}
				>
					<span class="block text-base font-semibold text-foreground">{tool.label}</span>
					<span class="mt-1 block text-sm text-muted-foreground">{tool.kicker}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="border-t border-dci-teal/15 p-6 sm:p-8 lg:p-10 xl:border-t-0 xl:border-l">
		<div class="grid gap-8 2xl:grid-cols-[0.9fr_1fr] 2xl:items-center">
			<div
				class="relative min-h-[20rem] overflow-hidden rounded-2xl bg-dci-cream 2xl:min-h-[23rem]"
			>
				{#key activeTool.id}
					<div class="absolute inset-0" in:fade={{ duration: 320 }}>
						{#if activeTool.video}
							<!-- svelte-ignore a11y_media_has_caption -->
							<video
								src={activeTool.video}
								poster={activeTool.poster}
								autoplay={allowMotion}
								loop
								muted
								playsinline
								preload="none"
								aria-label={`${activeTool.label} in use`}
								class="h-full w-full object-cover"
							></video>
						{:else}
							<img
								src={activeTool.poster}
								alt={`${activeTool.label} in use`}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						{/if}
					</div>
				{/key}
			</div>

			<div>
				<p class="type-eyebrow text-dci-teal">{activeTool.kicker}</p>
				<h3 class="type-subtitle mt-4 text-foreground">{activeTool.title}</h3>
				<p class="mt-4 text-base leading-relaxed text-muted-foreground">{activeTool.description}</p>
				<p class="mt-6 border-t border-dci-teal/15 pt-4 text-sm leading-relaxed text-dci-teal-deep">
					{activeTool.detail}
				</p>
				<Button href={activeTool.href} class="mt-7">
					{activeTool.cta}
					<ArrowUpRightIcon weight="regular" />
				</Button>
			</div>
		</div>
	</div>
</div>
