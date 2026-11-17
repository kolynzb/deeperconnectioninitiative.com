<script lang="ts">
	import { ArrowLeftIcon as ArrowLeft } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { FeatureCard, PageHero, Section } from '$lib/components/sections';

	const features = [
		{
			title: 'Real-time emotional data',
			description:
				'Mood tracking, clinic attendance, and Champion certifications aggregated and analysed by AI across a whole community.'
		},
		{
			title: 'Independently verified',
			description:
				'Every Connection Mile is permanently recorded and never inflated. Organisations see verified impact, not vanity metrics.'
		},
		{
			title: 'Early detection, not crisis reaction',
			description:
				'The EWS activates when sufficient community participation occurs across mood tracking, Champion certification, and clinic attendance.'
		},
		{
			title: 'Connection Miles as currency',
			description:
				'Each Mile represents one life meaningfully impacted. Miles are earned through products sold, clinics hosted, and Champions trained, then used for platform access and ongoing support.'
		}
	];
</script>

<PageHero
	eyebrow="Coming soon"
	title="The DCI Early Warning System"
	description="Real-time emotional data, aggregated and analysed by AI, across a whole community. Log in, check your Connection Miles, and follow your community's Early Warning System."
>
	{#snippet actions()}
		<Button href="/" variant="outline">
			<ArrowLeft weight="regular" />
			Back to DCI Wellness
		</Button>
	{/snippet}
</PageHero>

<Section class="pt-0 lg:pt-0">
	<div class="grid gap-6 sm:grid-cols-2">
		{#each features as feature, index}
			<div use:reveal={{ delay: index * 70, y: 18 }} class="h-full">
				<FeatureCard
					kicker={`Pillar 0${index + 1}`}
					badge={`0${index + 1}`}
					title={feature.title}
					description={feature.description}
				/>
			</div>
		{/each}
	</div>

	<p use:reveal={{ delay: 300, y: 14 }} class="type-lede mt-10 max-w-3xl text-foreground">
		Connection Miles enable organisations to transition from crisis reaction to early detection:
		pay-as-you-go data tracking that compounds with every toolkit sold, clinic hosted, and Champion
		trained.
	</p>
</Section>
