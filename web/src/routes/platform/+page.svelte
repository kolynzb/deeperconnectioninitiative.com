<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ArrowLeftIcon as ArrowLeft, ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { CardWatermark } from '$lib/components/ui/card';
	import { reveal } from '$lib/actions/reveal';
	import { flowGroup } from '$lib/actions/flow';
	import { CtaBand, PageHero, Section, SectionHeading } from '$lib/components/sections';

	// One tab per pillar; `points` are the facts that pillar rests on.
	const pillars = [
		{
			id: 'data',
			tab: 'Real-time emotional data',
			hint: 'Three signals, one picture',
			description:
				'Mood tracking, clinic attendance, and Champion certifications aggregated and analysed by AI across a whole community.',
			pointsLabel: 'What it reads',
			points: [
				{ label: 'Mood tracking', value: 'Daily check-ins' },
				{ label: 'Clinic attendance', value: 'Monthly clinics' },
				{ label: 'Champion certification', value: 'Trained facilitators' }
			]
		},
		{
			id: 'verified',
			tab: 'Independently verified',
			hint: 'Impact you can audit',
			description:
				'Every Connection Mile is permanently recorded and never inflated. Organisations see verified impact, not vanity metrics.',
			pointsLabel: 'How miles are earned',
			points: [
				{ label: 'Attend a clinic', value: '1 mile' },
				{ label: 'Submit a mood check-in', value: '1 mile' },
				{ label: 'Facilitate a clinic', value: '5 miles' },
				{ label: 'Sponsor one complete kit', value: '10 miles' }
			]
		},
		{
			id: 'early',
			tab: 'Early detection',
			hint: 'Before it becomes a crisis',
			description:
				'The EWS activates when sufficient community participation occurs across mood tracking, Champion certification, and clinic attendance.',
			pointsLabel: 'It needs enough people in',
			points: [
				{ label: 'Mood tracking', value: 'Check-ins' },
				{ label: 'Champion certification', value: 'Certified Champions' },
				{ label: 'Clinic attendance', value: 'Clinic seats' }
			]
		},
		{
			id: 'miles',
			tab: 'Connection Miles',
			hint: 'The currency of the system',
			description:
				'Each Mile represents one life meaningfully impacted. Miles are earned through products sold, clinics hosted, and Champions trained, then used for platform access and ongoing support.',
			pointsLabel: 'Earned through',
			points: [
				{ label: 'Products sold', value: 'Toolkits' },
				{ label: 'Clinics hosted', value: 'Communities' },
				{ label: 'Champions trained', value: 'People' }
			]
		}
	];

	let active = $state(pillars[0].id);
	const current = $derived(pillars.find((p) => p.id === active) ?? pillars[0]);
	const currentIndex = $derived(pillars.indexOf(current));

	// Arrow keys move between tabs, as a tablist should.
	function onKeydown(event: KeyboardEvent) {
		const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
		if (!step) return;
		event.preventDefault();
		const next = pillars[(currentIndex + step + pillars.length) % pillars.length];
		active = next.id;
		document.getElementById(`pillar-tab-${next.id}`)?.focus();
	}

	const faqs = [
		{
			q: 'Is the Early Warning System live?',
			a: "Not yet, it is coming soon. When it launches, you will log in here to check your Connection Miles and follow your community's Early Warning System."
		},
		{
			q: 'Does it show how one person is feeling?',
			a: 'Organisations see patterns across a whole community. DCI uses wellbeing data in aggregate, non-identifying form, as set out in our privacy policy.'
		},
		{
			q: 'What does it need before it activates?',
			a: 'Enough people taking part across mood tracking, Champion certification, and clinic attendance. One signal on its own is not enough.'
		},
		{
			q: 'How do organisations pay for it?',
			a: 'Pay-as-you-go data tracking through Connection Miles, which compound with every toolkit sold, clinic hosted, and Champion trained.'
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
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="grid gap-10 rounded-4xl border border-dci-teal/15 bg-dci-cream/60 p-6 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-12"
	>
		<div>
			<SectionHeading eyebrow="How it works" title="From crisis reaction to early detection." />
			<div
				role="tablist"
				aria-orientation="vertical"
				aria-label="Early Warning System pillars"
				tabindex="-1"
				class="mt-10 grid gap-1.5"
				use:flowGroup={{ itemSelector: '[role="tab"]' }}
				style="--glide-r: 1rem; --hov-r: 1rem;"
				onkeydown={onKeydown}
			>
				{#each pillars as pillar, index (pillar.id)}
					{@const selected = pillar.id === active}
					<button
						type="button"
						role="tab"
						id={`pillar-tab-${pillar.id}`}
						aria-selected={selected}
						aria-controls="pillar-panel"
						tabindex={selected ? 0 : -1}
						onclick={() => (active = pillar.id)}
						class="relative z-10 grid grid-cols-[2.5rem_1fr] items-baseline gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors"
					>
						<span class={`font-serif text-lg ${selected ? 'text-dci-cream/75' : 'text-dci-teal'}`}>
							0{index + 1}
						</span>
						<span>
							<span
								class={`block text-base font-semibold ${selected ? 'text-dci-cream' : 'text-foreground'}`}
							>
								{pillar.tab}
							</span>
							<span
								class={`mt-0.5 block text-sm ${selected ? 'text-dci-cream/75' : 'text-muted-foreground'}`}
							>
								{pillar.hint}
							</span>
						</span>
					</button>
				{/each}
			</div>
		</div>

		<div
			id="pillar-panel"
			role="tabpanel"
			aria-labelledby={`pillar-tab-${current.id}`}
			class="relative flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-dci-teal/15 bg-dci-paper"
		>
			<CardWatermark text={`0${currentIndex + 1}`} tone="teal" />
			{#key current.id}
				<div class="relative z-10 flex flex-1 flex-col p-6 sm:p-8" in:fade={{ duration: 260 }}>
					<p class="type-eyebrow text-dci-teal">Pillar 0{currentIndex + 1}</p>
					<h3 class="type-title mt-3 max-w-md text-foreground">{current.tab}</h3>
					<p class="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
						{current.description}
					</p>

					<div class="mt-auto pt-8">
						<p class="type-eyebrow text-muted-foreground">{current.pointsLabel}</p>
						<dl class="mt-3 divide-y divide-dci-teal/15 border-y border-dci-teal/15">
							{#each current.points as point (point.label)}
								<div class="flex items-baseline justify-between gap-4 py-3">
									<dt class="text-sm font-semibold text-foreground">{point.label}</dt>
									<dd class="text-sm text-muted-foreground">{point.value}</dd>
								</div>
							{/each}
						</dl>
					</div>
				</div>
			{/key}
		</div>
	</div>
</Section>

<Section>
	<div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
		<SectionHeading eyebrow="Questions" title="Data, privacy, and when it switches on." />
		<div
			use:reveal={{ delay: 100, y: 18 }}
			class="divide-y divide-dci-teal/15 border-y border-dci-teal/15"
		>
			{#each faqs as faq (faq.q)}
				<details class="group py-5">
					<summary
						class="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-foreground [&::-webkit-details-marker]:hidden"
					>
						{faq.q}
						<span
							aria-hidden="true"
							class="grid size-8 shrink-0 place-items-center rounded-full border border-dci-teal/20 text-dci-teal transition-transform group-open:rotate-45"
							>+</span
						>
					</summary>
					<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">{faq.a}</p>
				</details>
			{/each}
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="For organisations"
	title="Bring early detection to your community."
	description="Partners fund the toolkits, clinics, and Champions that the Early Warning System reads, and see verified impact as it compounds."
>
	{#snippet actions()}
		<Button href="/partners" variant="inverse">
			See partnerships
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	{/snippet}
</CtaBand>
