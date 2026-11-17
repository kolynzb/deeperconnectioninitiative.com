<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardCover, CardFooter, CardWatermark } from '$lib/components/ui/card';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, CtaBand } from '$lib/components/sections';

	// Apply links land on the contact form with the tier preselected, so the
	// applicant never has to explain what they are applying for.
	function applyHref(tier: string) {
		return `/contact?topic=${encodeURIComponent('Performance Blueprint application')}&about=${encodeURIComponent(`I would like to apply for the ${tier}.`)}`;
	}

	const facets = [
		{
			title: 'How you think',
			description: 'The mental models running underneath every decision you make.'
		},
		{
			title: 'How you recover',
			description: "What actually restores you, versus what you've mistaken for rest."
		},
		{
			title: 'How you decide',
			description: 'The pattern behind your choices under pressure, not just the outcome.'
		},
		{
			title: 'How you communicate',
			description: 'What you say when the stakes are high and the room is watching.'
		},
		{
			title: 'How you lead',
			description: 'The version of you that shows up when people are depending on you.'
		}
	];

	const tiers: {
		name: string;
		price: string;
		lead: string;
		blurb: string;
		cta: string;
		href?: string;
		popular?: boolean;
		featured?: boolean;
	}[] = [
		{
			name: 'Blueprint Assessment',
			price: 'Free',
			lead: 'Self-guided',
			blurb: 'Discover the hidden patterns shaping your performance.',
			cta: 'Start the assessment',
			href: '/performance/assessment'
		},
		{
			name: 'Guided Toolkit Experience',
			price: 'UGX 800,000',
			lead: 'Ann Banya, solo',
			blurb: 'Wellbeing frame. The accessible entry rung. 4 weekly sessions + full DCI toolkit.',
			cta: 'Apply',
			href: applyHref('Guided Toolkit Experience (UGX 800,000)'),
			featured: true
		},
		{
			name: 'Performance Blueprint Coaching',
			price: 'UGX 3,500,000',
			lead: 'Emily leads, Ann as principal',
			blurb:
				'The flagship. 6–8 sessions over ~4 months, full assessment + re-assessment, between-session support.',
			cta: 'Apply',
			href: applyHref('Performance Blueprint Coaching (UGX 3,500,000)'),
			popular: true
		},
		{
			name: 'Executive Performance Blueprint',
			price: 'From UGX 7,000,000',
			lead: 'Ann leads, Emily supporting',
			blurb: 'Bespoke, for founders & C-suite. 4–6 months, highest touch. By quotation.',
			cta: 'Request a conversation',
			href: applyHref('Executive Performance Blueprint (from UGX 7,000,000)')
		}
	];
	// The two coaches, each told as a story row. Facts come from their bios and
	// from who leads which tier above.
	const coaches = [
		{
			name: 'Emily',
			photo: '/photos/emily.webp',
			alt: 'Emily, coach and co-founder of DCI Wellness',
			role: 'The coach who has been where you are',
			headline: 'Lived experience, and systems design.',
			body: 'Co-founder of Utalii Creative, DCI Wellness, and Akatuuti. Built three ventures through burnout, anxiety, grief, and self-sabotage, and redesigned the systems beneath her own performance to survive it.',
			factsLabel: 'Co-founded',
			facts: ['Utalii Creative', 'DCI Wellness', 'Akatuuti']
		},
		{
			name: 'Ann Banya',
			photo: '/photos/ann-banya.webp',
			alt: 'Ann Banya, Early Childhood Development and behavioural specialist',
			role: 'The specialist who can go where it hurts',
			headline: '40+ years of behavioural practice.',
			body: '40+ years as an Early Childhood Development and behavioural specialist. Four decades of practice, brought to every engagement she leads or supports.',
			factsLabel: 'In the Blueprint',
			facts: [
				'Leads the Guided Toolkit Experience',
				'Principal on Performance Blueprint Coaching',
				'Leads the Executive Performance Blueprint'
			]
		}
	];

	// The entry rung headlines the page; the rest sit below it.
	const featured = tiers.find((t) => t.featured)!;
	const otherTiers = tiers.filter((t) => !t.featured);
</script>

<PageHero
	eyebrow="Performance Blueprint™"
	title="Sustainable performance happens when you stop fighting yourself."
	description="Discover the system behind how you think, lead, and perform. For founders and leaders who are winning on the outside and fighting themselves on the inside."
>
	{#snippet actions()}
		<Button href={featured.href ?? '/contact'}>Apply for the Guided Toolkit</Button>
		<Button href="/performance/assessment" variant="outline">Take the free assessment</Button>
	{/snippet}
	{#snippet aside()}
		<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8">
			<p class="type-eyebrow text-dci-teal">Start here</p>
			<h2 class="type-title mt-4 text-foreground">{featured.name}</h2>
			<p class="mt-4 font-serif text-3xl text-dci-teal-deep">{featured.price}</p>
			<p class="mt-1 text-sm text-muted-foreground">Led by {featured.lead}</p>
			<p class="mt-5 text-sm leading-relaxed text-muted-foreground">{featured.blurb}</p>
			<Button variant="outline" href={featured.href ?? '/contact'} class="mt-7 w-full">
				{featured.cta}
				<ArrowUpRight weight="regular" />
			</Button>
			<p class="mt-4 text-xs leading-relaxed text-muted-foreground">
				Applications begin with a fit conversation, not instant checkout.
			</p>
		</div>
	{/snippet}
</PageHero>

<Section tone="dark">
	<div class="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
		<SectionHeading
			tone="dark"
			eyebrow="The thesis"
			title="The greatest performance bottlenecks are rarely technical."
		/>
		<p use:reveal={{ delay: 120, y: 18 }} class="text-base leading-relaxed text-dci-cream/75">
			They're emotional, cognitive, behavioural, and spiritual. Most coaching works on goals and
			motivation. The DCI Performance Blueprint works on the systems beneath your performance, how
			you think, recover, communicate, lead, and make decisions under pressure. We don't help you do
			more. We help you become someone who can sustain meaningful impact without burning out.
		</p>
	</div>
</Section>

<!-- Ellamae's sticky split: the idea holds still while the facets pass by. -->
<Section>
	<div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
		<div class="lg:sticky lg:top-28 lg:self-start">
			<SectionHeading
				eyebrow="Five facets of one Blueprint"
				title="Under pressure, not in the abstract."
			/>
			<div class="mt-10 border-t border-dci-teal/15 pt-6">
				<p class="type-eyebrow text-dci-burgundy">Who it's for</p>
				<p class="type-title mt-3 text-foreground">
					You're not underperforming. You're exhausted from fighting yourself.
				</p>
				<p class="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
					Founders navigating uncertainty. Executives leading teams. Emerging leaders whose own
					thinking has become their biggest obstacle.
				</p>
				<Button href="/performance/assessment" variant="outline" class="mt-8">
					Take the free assessment
				</Button>
			</div>
		</div>

		<ol class="divide-y divide-dci-teal/15 border-y border-dci-teal/15">
			{#each facets as facet, index (facet.title)}
				<li
					use:reveal={{ delay: 0, y: 18 }}
					class="grid grid-cols-[4rem_1fr] gap-4 py-10 sm:grid-cols-[5rem_1fr] lg:py-14"
				>
					<span class="font-serif text-4xl leading-none text-dci-teal/60">0{index + 1}</span>
					<div>
						<h3 class="type-title text-foreground">{facet.title}</h3>
						<p class="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
							{facet.description}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</Section>

<Section id="tiers" tone="cream">
	<SectionHeading
		eyebrow="Where you start depends on what you need"
		title="Identity → Performance → Belonging."
		class="mb-12"
	/>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each otherTiers as tier, index (tier.name)}
			<div use:reveal={{ delay: index * 70, y: 22 }} class="h-full">
				<Card
					appearance="editorial"
					tone="paper"
					lift
					class={tier.popular ? 'border-dci-burgundy/30' : ''}
				>
					<CardWatermark text={`0${index + 1}`} tone={tier.popular ? 'burgundy' : 'teal'} />
					<CardCover tint={tier.popular ? 'blush' : 'cream'}>
						<div class="flex items-center justify-between gap-3">
							<p class={`type-eyebrow ${tier.popular ? 'text-dci-burgundy' : 'text-dci-teal'}`}>
								{tier.popular ? 'Most chosen' : `Tier 0${index + 1}`}
							</p>
							<span
								class={`dci-pebble inline-flex size-8 items-center justify-center font-serif text-xs ${tier.popular ? 'bg-dci-burgundy text-dci-cream' : 'bg-dci-mist text-dci-teal-deep'}`}
							>
								0{index + 1}
							</span>
						</div>
						<h3 class="type-subtitle mt-2 text-foreground">{tier.name}</h3>
						<p class="mt-4 font-serif text-3xl text-dci-teal-deep">{tier.price}</p>
						<p class="mt-1 text-xs font-medium text-muted-foreground">{tier.lead}</p>
					</CardCover>

					<div class="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
						<p class="text-sm leading-relaxed text-muted-foreground">{tier.blurb}</p>
					</div>

					<CardFooter>
						<Button href={tier.href ?? '/contact'} class="w-full">
							{tier.cta}
							<ArrowUpRight weight="regular" />
						</Button>
					</CardFooter>
				</Card>
			</div>
		{/each}
	</div>
	<p class="mt-6 max-w-3xl text-sm text-muted-foreground">
		Prices shown are per engagement. The premium tiers begin with an application and a fit
		conversation, not instant checkout. This is coaching, not a substitute for therapy.
	</p>
</Section>

<!-- Scarlet's story rows: portrait and panel, the second one mirrored. -->
<Section>
	<SectionHeading
		eyebrow="Who's behind the Blueprint"
		title="The coach who's been where you are, and the specialist who can go where it hurts."
	/>
	<div class="mt-12 space-y-2">
		{#each coaches as coach, index (coach.name)}
			<div class="grid gap-2 lg:grid-cols-2">
				<figure
					use:reveal={{ delay: 0, y: 18 }}
					class="relative aspect-[4/5] overflow-hidden rounded-4xl sm:aspect-[4/3] lg:aspect-auto lg:min-h-[34rem] {index %
					2
						? 'lg:order-2'
						: ''}"
				>
					<img
						src={coach.photo}
						alt={coach.alt}
						loading="lazy"
						class="absolute inset-0 size-full object-cover object-top"
					/>
					<figcaption class="absolute right-0 bottom-0 rounded-tl-4xl bg-background pt-4 pr-2 pl-7">
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							class="absolute right-full bottom-0 size-8 text-background"
							fill="currentColor"><path d="M0 24A24 24 0 0 0 24 0V24Z" /></svg
						>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							class="absolute right-0 bottom-full size-8 text-background"
							fill="currentColor"><path d="M0 24A24 24 0 0 0 24 0V24Z" /></svg
						>
						<span class="block text-sm text-muted-foreground">Coach 0{index + 1}</span>
						<span class="block font-serif text-xl text-foreground">{coach.name}</span>
					</figcaption>
				</figure>

				<div
					use:reveal={{ delay: 120, y: 18 }}
					class="flex flex-col justify-between gap-12 rounded-4xl bg-dci-cream p-6 sm:p-10 lg:p-12"
				>
					<div>
						<p class="type-eyebrow text-dci-teal">{coach.role}</p>
						<h3 class="type-headline mt-4 text-balance text-foreground">{coach.headline}</h3>
					</div>
					<div>
						<p class="text-lg leading-relaxed text-muted-foreground">{coach.body}</p>
						<p class="type-eyebrow mt-10 text-muted-foreground">{coach.factsLabel}</p>
						<ul role="list" class="mt-3 grid gap-6 sm:grid-cols-3">
							{#each coach.facts as fact (fact)}
								<li
									class="border-t border-dci-teal/15 pt-4 font-serif text-lg leading-snug text-foreground"
								>
									{fact}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Section>

<CtaBand
	eyebrow="DCI Inner Circle™ · coming soon"
	title="Growth is better shared."
	description="The Blueprint is where you redesign how you perform. The DCI Inner Circle is where you sustain it, a private circle of high performers on the same path. Coaching clients are first in."
>
	{#snippet actions()}
		<Button
			variant="inverse"
			href={`/contact?topic=${encodeURIComponent('Performance Blueprint application')}&about=${encodeURIComponent('Please add me to the DCI Inner Circle waitlist.')}`}
		>
			Join the waitlist
		</Button>
	{/snippet}
</CtaBand>
