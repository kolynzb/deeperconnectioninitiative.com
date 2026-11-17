<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardCover, CardFooter } from '$lib/components/ui/card';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, FeatureCard, CtaBand } from '$lib/components/sections';

	// Apply links land on the contact form with the tier preselected, so the
	// applicant never has to explain what they are applying for.
	function applyHref(tier: string) {
		return `/contact?topic=${encodeURIComponent('Performance Blueprint application')}&about=${encodeURIComponent(`I would like to apply for the ${tier}.`)}`;
	}

	const facets = [
		{ title: 'How you think', description: 'The mental models running underneath every decision you make.' },
		{ title: 'How you recover', description: "What actually restores you, versus what you've mistaken for rest." },
		{ title: 'How you decide', description: 'The pattern behind your choices under pressure, not just the outcome.' },
		{ title: 'How you communicate', description: 'What you say when the stakes are high and the room is watching.' },
		{ title: 'How you lead', description: 'The version of you that shows up when people are depending on you.' }
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
			blurb: 'The flagship. 6–8 sessions over ~4 months, full assessment + re-assessment, between-session support.',
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
			motivation. The DCI Performance Blueprint works on the systems beneath your performance, how you
			think, recover, communicate, lead, and make decisions under pressure. We don't help you do more.
			We help you become someone who can sustain meaningful impact without burning out.
		</p>
	</div>
</Section>

<Section>
	<SectionHeading
		eyebrow="Five facets of one Blueprint"
		title="Under pressure, not in the abstract."
		class="mb-12"
	/>
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each facets as item, index}
			<div use:reveal={{ delay: index * 70, y: 22 }} class="h-full">
				<FeatureCard
					kicker={`Facet 0${index + 1}`}
					badge={`0${index + 1}`}
					title={item.title}
					description={item.description}
				/>
			</div>
		{/each}
		<div use:reveal={{ delay: facets.length * 70, y: 22 }} class="h-full">
			<FeatureCard
				kicker="Who it's for"
				badge="06"
				title="You're not underperforming. You're exhausted from fighting yourself."
				description="Founders navigating uncertainty. Executives leading teams. Emerging leaders whose own thinking has become their biggest obstacle."
			/>
		</div>
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
					class={tier.popular ? 'border-dci-burgundy/30' : ''}
				>
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

<Section>
	<SectionHeading
		eyebrow="Who's behind the Blueprint"
		title="The coach who's been where you are, and the specialist who can go where it hurts."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-2">
		<article use:reveal={{ delay: 0, y: 22 }} class="flex flex-col gap-6 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:flex-row sm:p-8">
			<img src="/photos/emily.webp" alt="Emily" class="size-28 shrink-0 rounded-2xl object-cover" />
			<div>
				<h3 class="type-subtitle text-foreground">Emily</h3>
				<p class="mt-3 text-sm leading-relaxed text-muted-foreground">
					Co-founder of Utalii Creative, DCI Wellness, and Akatuuti. Built three ventures through
					burnout, anxiety, grief, and self-sabotage, and redesigned the systems beneath her own
					performance to survive it. Lived experience, and systems design.
				</p>
			</div>
		</article>
		<article use:reveal={{ delay: 90, y: 22 }} class="flex flex-col gap-6 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:flex-row sm:p-8">
			<img src="/photos/ann-banya.webp" alt="Ann Banya" class="size-28 shrink-0 rounded-2xl object-cover" />
			<div>
				<h3 class="type-subtitle text-foreground">Ann</h3>
				<p class="mt-3 text-sm leading-relaxed text-muted-foreground">
					40+ years as an Early Childhood Development and behavioural specialist. Four decades of
					practice, brought to every engagement she leads or supports.
				</p>
			</div>
		</article>
	</div>
</Section>

<CtaBand
	eyebrow="DCI Inner Circle™ · coming soon"
	title="Growth is better shared."
	description="The Blueprint is where you redesign how you perform. The DCI Inner Circle is where you sustain it, a private circle of high performers on the same path. Coaching clients are first in."
>
	{#snippet actions()}
		<Button variant="inverse"
			href={`/contact?topic=${encodeURIComponent('Performance Blueprint application')}&about=${encodeURIComponent('Please add me to the DCI Inner Circle waitlist.')}`}
		>
			Join the waitlist
		</Button>
	{/snippet}
</CtaBand>
