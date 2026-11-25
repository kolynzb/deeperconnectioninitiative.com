<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight, CheckIcon as Check } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading } from '$lib/components/sections';

	const pillars = [
		{
			kicker: 'Connect',
			title: 'Space for honest conversation',
			description:
				'Community Champions and Conversation Clinics create the room your people need to say what usually goes unsaid.'
		},
		{
			kicker: 'Equip',
			title: 'Language and daily practice',
			description:
				'The Mood Tracker, Journal, and Card Game give your people the tools to notice patterns and process what they feel.'
		},
		{
			kicker: 'Understand',
			title: 'Patterns across your organisation',
			description:
				'The Early Warning System reads signals across your whole organisation, so support moves first, before a crisis.'
		}
	];

	// What every engagement is scoped around, and what funders get back.
	const scoped = [
		'Your people',
		'Your setting',
		'The outcomes you report on',
		'Connection Miles: independently verified, permanently recorded, never inflated'
	];
</script>

<PageHero
	eyebrow="For organisations"
	title="Your organisation already has the people. DCI gives them a system."
	description="Crisis is expensive. Connection is cheap. Schools, corporates, NGOs, faith communities, and hospitality spaces: this is your entry point."
>
	{#snippet actions()}
		<Button href="/contact?topic=Partner%20training">Book a 30-minute call</Button>
		<Button href="/trainings" variant="outline">Explore trainings</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/partner-training-room.webp"
			alt="DCI running a session at a partner organisation"
			class="aspect-[4/3] w-full rounded-4xl object-cover"
		/>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading
		eyebrow="How it works"
		title="Connect, equip, understand."
		description="Three layers that turn scattered goodwill into a system your people can actually feel."
		split
	/>

	<!-- Scarlet's divided rows: layer | what it gives | how. -->
	<ol
		use:reveal={{ delay: 100, y: 18 }}
		class="mt-12 divide-y divide-dci-teal/15 border-y border-dci-teal/15"
	>
		{#each pillars as item, index (item.kicker)}
			<li class="grid gap-3 py-8 md:grid-cols-[1fr_1.2fr_1.6fr] md:gap-8 lg:py-10">
				<p class="flex items-baseline gap-4">
					<span class="font-serif text-3xl leading-none text-dci-teal/60">0{index + 1}</span>
					<span class="type-title text-foreground">{item.kicker}</span>
				</p>
				<h3 class="type-subtitle text-dci-burgundy">{item.title}</h3>
				<p class="text-base leading-relaxed text-muted-foreground">{item.description}</p>
			</li>
		{/each}
	</ol>
</Section>

<!-- Scarlet's care plan: the price and the ask on one side, what gets scoped on the other.
     It closes the page, so there is no separate CTA band. -->
<Section class="pt-0 lg:pt-0">
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="grid gap-14 rounded-4xl bg-dci-burgundy px-6 py-14 text-dci-cream sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20"
	>
		<div class="flex flex-col items-start justify-between gap-12">
			<div>
				<p class="type-eyebrow text-dci-cream/75">Engagements</p>
				<h2 class="type-headline mt-4 max-w-md text-dci-cream">Scoped to fit your context.</h2>
				<p class="mt-5 max-w-md text-base leading-relaxed text-dci-cream/75">
					It's the kind of impact data that makes reporting to your own stakeholders easier, not
					harder.
				</p>
			</div>
			<div>
				<p class="text-sm text-dci-cream/75">Organisations start from</p>
				<p class="mt-1 font-serif text-5xl leading-none sm:text-6xl">USD 20,000</p>
				<p class="mt-2 text-sm text-dci-cream/75">annually</p>
				<Button href="/contact?topic=Partner%20training" variant="inverse" class="mt-8">
					Book a 30-minute call
					<ArrowUpRight class="size-4" weight="regular" />
				</Button>
			</div>
		</div>

		<div class="self-end">
			<p class="type-eyebrow text-dci-cream/75">Every engagement is scoped around</p>
			<ul class="mt-3 divide-y divide-dci-cream/20 border-y border-dci-cream/20">
				{#each scoped as item (item)}
					<li class="flex items-start gap-4 py-5">
						<Check class="mt-1 size-5 shrink-0" weight="regular" />
						<span class="text-lg leading-snug">{item}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Section>
