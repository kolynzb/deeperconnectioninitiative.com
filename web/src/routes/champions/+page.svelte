<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, FeatureCard, CheckList, CtaBand } from '$lib/components/sections';

	const does = [
		{
			title: 'Run Conversation Clinics',
			description:
				'Peer-led wellness meetups in your community, school, or organisation. No clinician required, just a trained Champion and the toolkit.'
		},
		{
			title: 'Monitor mood data',
			description:
				'Read patterns across your community and get a quiet alert when something needs attention, before it becomes a crisis.'
		},
		{
			title: 'Hold space that matters',
			description:
				'Create room for the honest conversations most groups never have the structure to start.'
		}
	];

	const covers = [
		'How to run a Conversation Clinic from start to finish',
		'How to read the Mood Tracker and Early Warning System signals',
		'How to hold space without needing to be a clinician',
		'How Connection Miles work, and how yours compound as your community grows'
	];
</script>

<PageHero
	eyebrow="Community Champions"
	title="Become the infrastructure in your community."
	description="A certified DCI facilitator trained through the Training of Trainers program to run clinics, hold space, and monitor mood data across their community."
>
	{#snippet actions()}
		<Button href="/contact?topic=Community%20Champion%20application">Apply for the next cohort</Button>
		<Button
			href="/trainings"
			variant="outline"
		>
			See training tiers
		</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/champion-training-hero.webp"
			alt="A Community Champion training a room of young people"
			class="aspect-[4/3] w-full rounded-4xl object-cover"
		/>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading
		eyebrow="What a Champion does"
		title="One certified Champion changes the texture of a whole community."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-3">
		{#each does as item, index}
			<div use:reveal={{ delay: index * 80, y: 22 }} class="h-full">
				<FeatureCard title={item.title} description={item.description} />
			</div>
		{/each}
	</div>
</Section>

<Section tone="dark">
	<div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
		<SectionHeading
			tone="dark"
			eyebrow="Training of Trainers"
			title="What the certification covers."
		/>
		<div use:reveal={{ delay: 120, y: 18 }} class="rounded-2xl border border-dci-cream/15 p-6 sm:p-8">
			<CheckList items={covers} accent="#F6ECD9" class="[&_span]:text-dci-cream/80" />
			<div class="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-dci-cream/15 pt-6">
				<div>
					<p class="font-serif text-3xl text-dci-cream">UGX 500,000</p>
					<p class="mt-1 text-sm text-dci-cream/75">per person · one certified Champion</p>
				</div>
				<p class="type-eyebrow text-dci-cream/75">50+ compounding miles</p>
			</div>
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="Ready to lead?"
	title="Apply to the next Community Champion cohort."
	description="You don't just help one person, you change the texture of a whole community. And your miles keep compounding as it grows."
>
	{#snippet actions()}
		<Button href="/contact?topic=Community%20Champion%20application" variant="inverse">
			Submit application
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	{/snippet}
</CtaBand>
