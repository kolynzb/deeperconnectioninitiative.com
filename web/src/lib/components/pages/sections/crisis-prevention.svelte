<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';
	import { Section, SectionHeading } from '$lib/components/sections';

	const stages = [
		{
			number: '01',
			title: 'Pressure builds',
			description: 'Daily stress, unspoken emotions, and isolation pile up with no safe outlet.',
			crisis: false
		},
		{
			number: '02',
			title: 'Warning signals',
			description: 'Mood shifts, withdrawal, and behavioural changes go unnoticed or unnamed.',
			crisis: false
		},
		{
			number: '03',
			title: 'Support gap',
			description:
				'Communities lack tools, language, and confidence to respond before things escalate.',
			crisis: false
		},
		{
			number: '04',
			title: 'Crisis',
			description:
				'When everyday pressure becomes a clinical emergency, the cost, human and financial, multiplies.',
			crisis: true
		}
	];
</script>

<Section id="crisis-prevention">
	<SectionHeading
		eyebrow="The prevention model"
		split
		description="Mental health emergencies rarely come out of nowhere. They follow a pattern: pressure, signals, a support gap, then crisis. DCI's ecosystem targets the first three stages so the fourth rarely happens."
	>
		{#snippet title()}Most crises are preventable. DCI works <em>upstream.</em>{/snippet}
	</SectionHeading>

	<!-- One line, four steps. DCI's reach is marked over the first three. -->
	<div class="mt-12 grid gap-x-8 lg:grid-cols-4" use:reveal={{ delay: 120, y: 18 }}>
		<p
			class="type-eyebrow hidden border-b border-dci-teal/30 pb-3 text-dci-teal lg:col-span-3 lg:block"
		>
			DCI works here
		</p>
		<p class="type-eyebrow hidden pb-3 text-dci-burgundy lg:block">What it prevents</p>

		{#each stages as stage (stage.number)}
			<div
				class={cn(
					'border-t-2 pt-6 pb-8 lg:mt-6 lg:pb-0',
					stage.crisis ? 'border-dci-burgundy' : 'border-dci-teal'
				)}
			>
				<p class={cn('font-serif text-lg', stage.crisis ? 'text-dci-burgundy' : 'text-dci-teal')}>
					{stage.number}
				</p>
				<h3 class={cn('type-title mt-3', stage.crisis ? 'text-dci-burgundy' : 'text-foreground')}>
					{stage.title}
				</h3>
				<p class="mt-3 text-base leading-relaxed text-muted-foreground">{stage.description}</p>
			</div>
		{/each}
	</div>
</Section>
