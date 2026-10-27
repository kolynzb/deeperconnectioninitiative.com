<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, FeatureCard, CtaBand } from '$lib/components/sections';

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
</script>

<PageHero
	eyebrow="For organisations"
	title="Your organisation already has the people. DCI gives them a system."
	description="Crisis is expensive. Connection is cheap. Schools, corporates, NGOs, faith communities, and hospitality spaces: this is your entry point."
>
	{#snippet actions()}
		<Button href="/contact?topic=Partner%20training">Book a 30-minute call</Button>
		<Button
			href="/trainings"
			variant="outline"
		>
			Explore trainings
		</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/partner-training-room.jpg"
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
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-3">
		{#each pillars as item, index}
			<div use:reveal={{ delay: index * 80, y: 22 }} class="h-full">
				<FeatureCard
					kicker={item.kicker}
					title={item.title}
					description={item.description}
				/>
			</div>
		{/each}
	</div>
</Section>

<Section tone="dark">
	<div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
		<SectionHeading
			tone="dark"
			eyebrow="Engagements"
			title="Scoped to fit your context."
			description="Organisations start from USD 20,000 annually. We scope every engagement around your people, your setting, and the outcomes you report on."
		>
			<Button variant="inverse" href="/contact?topic=Partner%20training">
				Request a call
				<ArrowUpRight class="size-4" weight="regular" />
			</Button>
		</SectionHeading>
		<div use:reveal={{ delay: 120, y: 18 }} class="rounded-2xl border border-dci-cream/15 p-6 sm:p-8">
			<p class="type-subtitle text-dci-cream">
				For funders: every Connection Mile is independently verified, permanently recorded, and never
				inflated.
			</p>
			<p class="mt-3 text-sm leading-relaxed text-dci-cream/75">
				It's the kind of impact data that makes reporting to your own stakeholders easier, not
				harder.
			</p>
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="Bring DCI to your institution"
	title="See how organisations use DCI."
	description="Activate the system across your school, company, or community, and give your people an early warning system before burnout hits."
>
	{#snippet actions()}
		<Button href="/contact?topic=Partner%20training" variant="inverse">Book a 30-minute call</Button>
	{/snippet}
</CtaBand>
