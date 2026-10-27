<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { paymentLinks } from '$lib/payment-links';
	import { ArrowsClockwiseIcon, ArrowUpRightIcon } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';

	type Tone = 'burgundy' | 'teal' | 'clay';
	type Prompt = { text: string; theme: string; tone: Tone; no: number };

	const prompts: Prompt[] = [
		{
			text: 'What are you using to get through a normal Tuesday, and is it actually working?',
			theme: 'Coping',
			tone: 'clay',
			no: 7
		},
		{
			text: 'Who was the last person you told the whole truth to, and how did it feel?',
			theme: 'Honesty',
			tone: 'burgundy',
			no: 12
		},
		{
			text: 'What emotion do you feel most often but almost never say out loud?',
			theme: 'Feeling',
			tone: 'teal',
			no: 19
		},
		{
			text: 'If someone really knew you, what would surprise them most?',
			theme: 'Identity',
			tone: 'clay',
			no: 23
		},
		{
			text: 'What did you need to hear as a child that no one ever said?',
			theme: 'Childhood',
			tone: 'burgundy',
			no: 31
		},
		{
			text: 'What is the hardest thing you have forgiven yourself for?',
			theme: 'Forgiveness',
			tone: 'teal',
			no: 38
		},
		{
			text: 'When was the last time you felt genuinely safe with another person?',
			theme: 'Safety',
			tone: 'clay',
			no: 44
		},
		{
			text: 'What conversation are you avoiding right now, and why?',
			theme: 'Courage',
			tone: 'burgundy',
			no: 51
		},
		{
			text: 'What would your younger self think about the life you are living?',
			theme: 'Reflection',
			tone: 'teal',
			no: 56
		},
		{
			text: 'What would change if you stopped pretending to be fine?',
			theme: 'Truth',
			tone: 'burgundy',
			no: 60
		}
	];

	// Two card faces alternate as the deck flips, so each draw reveals a fresh prompt.
	let rotation = $state(0);
	let idxA = $state(0);
	let idxB = $state(1);
	let allowMotion = $state(false);

	onMount(() => {
		allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function drawCard() {
		const showingA = rotation % 360 === 0;
		const currentIdx = showingA ? idxA : idxB;
		let next: number;
		do {
			next = Math.floor(Math.random() * prompts.length);
		} while (next === currentIdx && prompts.length > 1);
		if (showingA) idxB = next;
		else idxA = next;
		rotation += 180;
	}

	const toneText: Record<Tone, string> = {
		teal: 'text-dci-teal',
		clay: 'text-dci-burgundy',
		burgundy: 'text-dci-burgundy'
	};
</script>

{#snippet cardFace(p: Prompt, isBack: boolean)}
	<div
		class="absolute inset-0 flex flex-col rounded-2xl border border-dci-teal/15 bg-dci-paper p-7 [backface-visibility:hidden]"
		style="transform: rotateY({isBack ? 180 : 0}deg);"
	>
		<div class="flex items-center justify-between">
			<span class="type-eyebrow {toneText[p.tone]}">{p.theme}</span>
			<span class="type-eyebrow text-muted-foreground">{String(p.no).padStart(2, '0')} / 60</span>
		</div>
		<p class="my-auto font-serif text-2xl leading-snug text-foreground">{p.text}</p>
		<p class="type-eyebrow text-muted-foreground">Deeper Connection</p>
	</div>
{/snippet}

{#snippet deckBack(rot: number, tx: string, ty: string, z: number)}
	<div
		class="absolute inset-0 flex items-center justify-center rounded-2xl bg-dci-burgundy"
		style="transform: rotate({rot}deg) translate({tx}, {ty}); z-index: {z};"
		aria-hidden="true"
	>
		<span class="font-serif text-xl text-dci-cream/80 italic">Deeper Connection</span>
	</div>
{/snippet}

<section id="card-draw" class="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="mx-auto grid max-w-7xl overflow-hidden rounded-4xl bg-dci-teal-deep text-dci-cream lg:grid-cols-[0.9fr_1.1fr]"
	>
		<div class="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
			<p class="type-eyebrow text-dci-cream/75">Draw a card</p>
			<h2 class="type-headline mt-4 max-w-md">
				Start a conversation people <em class="text-dci-clay">actually want</em> to have.
			</h2>
			<p class="type-lede mt-6 max-w-md text-dci-cream/75">
				Every card carries a real prompt, not a therapy question, just an honest one. 60 cards,
				solo or in a group, no screens needed.
			</p>
			<Button
				href={paymentLinks.cardGame}
				target="_blank"
				rel="noopener noreferrer"
				variant="inverse"
				class="mt-9 self-start"
			>
				Get the card game
				<ArrowUpRightIcon weight="regular" />
			</Button>
		</div>

		<div class="flex flex-col items-center bg-dci-cream p-8 sm:p-10 lg:p-14">
			<div class="relative h-[23rem] w-full max-w-[21rem] [perspective:1600px] sm:h-[25rem]">
				{@render deckBack(-7, '-13px', '11px', 0)}
				{@render deckBack(5, '11px', '7px', 1)}
				{@render deckBack(-3, '-4px', '3px', 2)}

				<!-- The active card flips to reveal a fresh prompt on each draw. -->
				<div
					class="absolute inset-0 z-10 cursor-pointer [transform-style:preserve-3d] focus-visible:outline-none"
					style="transform: rotateY({rotation}deg); transition: transform {allowMotion
						? 620
						: 0}ms cubic-bezier(0.16, 1, 0.3, 1);"
					role="button"
					tabindex="0"
					aria-label="Draw another conversation card"
					onclick={drawCard}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							drawCard();
						}
					}}
				>
					{@render cardFace(prompts[idxA], false)}
					{@render cardFace(prompts[idxB], true)}
				</div>
			</div>

			<Button size="sm" class="mt-10" onclick={drawCard}>
				<ArrowsClockwiseIcon weight="regular" />
				Draw another
			</Button>
		</div>
	</div>
</section>
