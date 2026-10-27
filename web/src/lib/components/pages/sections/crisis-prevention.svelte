<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils';

	const stages = [
		{
			number: '01',
			title: 'Pressure builds',
			description:
				'Daily stress, unspoken emotions, and isolation pile up with no safe outlet.',
			crisis: false
		},
		{
			number: '02',
			title: 'Warning signals',
			description:
				'Mood shifts, withdrawal, and behavioural changes go unnoticed or unnamed.',
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

<section
	id="crisis-prevention"
	class="w-full relative z-10 overflow-hidden"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
		<!-- Asymmetric header -->
		<div
			class="grid md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10 mb-10"
			use:reveal={{ delay: 0, y: 18 }}
		>
			<div>
				<p class="text-xs font-semibold tracking-wide text-dci-teal uppercase mb-4">The Prevention Model</p>
				<h2 class="text-5xl sm:text-6xl font-normal tracking-tight leading-[1.04] text-balance text-foreground">
					Most crises are preventable. DCI works <em class="text-dci-burgundy">upstream.</em>
				</h2>
			</div>
			<div class="flex items-end">
				<p class="text-base lg:text-lg leading-relaxed text-muted-foreground">
					Mental health emergencies rarely come out of nowhere. They follow a pattern: pressure,
					signals, a support gap, then crisis. DCI's ecosystem targets the first three stages so
					the fourth rarely happens.
				</p>
			</div>
		</div>

		<!-- One line, four steps. DCI's reach is marked over the first three. -->
		<div class="grid gap-x-8 lg:grid-cols-4" use:reveal={{ delay: 120, y: 18 }}>
			<p
				class="hidden border-b border-dci-teal/30 pb-3 text-xs font-semibold tracking-wide text-dci-teal uppercase lg:col-span-3 lg:block"
			>
				DCI works here
			</p>
			<p
				class="hidden pb-3 text-xs font-semibold tracking-wide text-dci-burgundy uppercase lg:block"
			>
				What it prevents
			</p>

			{#each stages as stage (stage.number)}
				<div
					class={cn(
						'border-t-2 pt-6 pb-8 lg:mt-6 lg:pb-0',
						stage.crisis ? 'border-dci-burgundy' : 'border-dci-teal'
					)}
				>
					<p
						class={cn(
							'font-serif text-lg',
							stage.crisis ? 'text-dci-burgundy' : 'text-dci-teal'
						)}
					>
						{stage.number}
					</p>
					<h3
						class={cn(
							'mt-3 font-serif text-3xl font-normal',
							stage.crisis ? 'text-dci-burgundy' : 'text-foreground'
						)}
					>
						{stage.title}
					</h3>
					<p class="mt-3 text-base leading-relaxed text-muted-foreground">{stage.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
