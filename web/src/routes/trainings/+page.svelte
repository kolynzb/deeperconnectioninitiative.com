<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardCover, CardFooter } from '$lib/components/ui/card';
	import { paymentLinks } from '$lib/payment-links';
	import { reveal } from '$lib/actions/reveal';
	import {
		CheckList,
		CtaBand,
		PageHero,
		Section,
		SectionHeading
	} from '$lib/components/sections';
	import { coursesStructuredData } from '$lib/config/structured-data';

	const tiers = [
		{
			name: 'Foundation Level',
			subtitle: 'Community Champion Certification',
			price: 'UGX 500,000',
			duration: '2-day training',
			bestFor: 'Individuals, venue teams, volunteers',
			paymentLink: paymentLinks.certifications.foundationLevelCommunityChampionCertification,
			includes: [
				'T.O.T manual in digital and print formats',
				'DCI Card Game facilitation practice',
				'Conversation Clinic setup guide',
				'Access to the low-data digital library',
				'Public Champion directory listing'
			],
			outcomes: [
				'Facilitate weekly community circles',
				'Use the toolkit with confidence',
				'Support 30-50 people per session'
			]
		},
		{
			name: 'Advanced Level',
			subtitle: 'Institutional Scale Certification',
			price: 'UGX 1,500,000',
			duration: '3-day training + follow-up',
			bestFor: 'Schools, NGOs, rehabs, corporates',
			popular: true,
			paymentLink: paymentLinks.certifications.advancedLevelInstitutionalChampionCertification,
			includes: [
				'Everything in Foundation Level',
				'Train up to 3 Champions in one cohort',
				'Institutional customization workshop',
				'Mood tracker training for support teams',
				'Impact measurement tools and check-ins'
			],
			outcomes: [
				'Launch an internal wellness program',
				'Adapt tools for a specific population',
				'Integrate DCI with existing services'
			]
		},
		{
			name: 'Master Trainer',
			subtitle: 'Certified Trainer Certification',
			price: 'UGX 3,000,000',
			duration: '5-day intensive + practicum',
			bestFor: 'Mental health professionals, facilitators, founders',
			paymentLink: paymentLinks.certifications.masterTrainerCertification,
			includes: [
				'Everything in Advanced Level',
				'Train-the-trainer methodology',
				'Curriculum delivery certification',
				'Independent training rights',
				'Official DCI trainer listing'
			],
			outcomes: [
				'Train Champions independently',
				'Build a regional support network',
				'Deliver DCI programs with quality guardrails'
			]
		}
	];

	const processSteps = [
		{
			title: 'Apply',
			description: 'Tell us who you serve, where you work, and which certification path fits.'
		},
		{
			title: 'Confirm',
			description: 'Complete payment and receive the training brief, schedule, and preparation pack.'
		},
		{
			title: 'Prepare',
			description: 'Review the manual, toolkit materials, and facilitation expectations before training.'
		},
		{
			title: 'Train',
			description: 'Practice trauma-aware facilitation, group setup, referral boundaries, and tool use.'
		},
		{
			title: 'Activate',
			description: 'Launch your DCI clinic, champion circle, or institutional wellness program.'
		}
	];
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${coursesStructuredData(tiers)}</script>`}
</svelte:head>

<PageHero
	eyebrow="Training of Trainers"
	title="Train the people who keep care moving."
	description="DCI certifications equip community champions, institutions, and trainers to facilitate grounded mental health conversations with practical tools and clear referral boundaries."
>
	{#snippet actions()}
		<Button href="#tiers">Compare tiers</Button>
		<Button href="/contact" variant="outline">Talk to DCI</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/section7-champions.webp"
			alt="A DCI trainer holding the reflection journal while leading a session with young people"
			class="aspect-[4/3] w-full rounded-4xl object-cover"
		/>
		<div class="mt-6 grid grid-cols-3 gap-6 border-t border-dci-teal/15 pt-6">
			<div>
				<p class="font-serif text-3xl text-dci-teal-deep">2-5</p>
				<p class="mt-1 text-sm text-muted-foreground">training days by tier</p>
			</div>
			<div>
				<p class="font-serif text-3xl text-dci-teal-deep">3</p>
				<p class="mt-1 text-sm text-muted-foreground">certification paths</p>
			</div>
			<div>
				<p class="font-serif text-3xl text-dci-teal-deep">10%</p>
				<p class="mt-1 text-sm text-muted-foreground">supports donated kits</p>
			</div>
		</div>
	{/snippet}
</PageHero>

<Section id="tiers">
	<SectionHeading
		eyebrow="Certification tiers"
		title="Choose the training depth that matches your setting."
		split
		description="Designed for offline-first settings, youth groups, schools, clinics, recovery spaces, and neighborhood venues where care needs to be practical before it can be formal."
	/>

	<div class="mt-12 grid gap-6 lg:grid-cols-3">
		{#each tiers as tier, index}
			<div use:reveal={{ delay: index * 80, y: 22 }} class="h-full">
				<Card
					appearance="editorial"
					tone="paper"
					class={tier.popular ? 'border-dci-burgundy/30' : ''}
				>

					<CardCover tint={tier.popular ? 'blush' : 'cream'}>
						<div class="flex items-center justify-between gap-3">
							<p class={`type-eyebrow ${tier.popular ? 'text-dci-burgundy' : 'text-dci-teal'}`}>
								{tier.popular ? 'Most requested' : tier.subtitle}
							</p>
							<span
								class={`dci-pebble inline-flex size-8 items-center justify-center font-serif text-xs ${tier.popular ? 'bg-dci-burgundy text-dci-cream' : 'bg-dci-mist text-dci-teal-deep'}`}
							>
								0{index + 1}
							</span>
						</div>
						<h3 class="type-title mt-2 text-foreground">{tier.name}</h3>
						{#if tier.popular}
							<p class="type-eyebrow mt-1 text-muted-foreground">{tier.subtitle}</p>
						{/if}
						<div class="mt-5 flex items-baseline justify-between gap-4 border-t border-dci-teal/12 pt-4">
							<p class="font-serif text-3xl text-dci-teal-deep">{tier.price}</p>
							<p class="text-xs font-medium text-muted-foreground">{tier.duration}</p>
						</div>
					</CardCover>

					<div class="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
						<p class="text-sm leading-relaxed text-muted-foreground">
							<span class="font-semibold text-foreground">Best for:</span> {tier.bestFor}
						</p>

						<div class="mt-6 grid gap-6 border-t border-dci-teal/12 pt-6">
							<div>
								<p class="type-eyebrow mb-3 text-dci-teal">Includes</p>
								<CheckList items={tier.includes} />
							</div>
							<div>
								<p class="type-eyebrow mb-3 text-dci-burgundy">Outcomes</p>
								<CheckList items={tier.outcomes} accent="#6F231E" />
							</div>
						</div>
					</div>

					<CardFooter>
						<Button href={tier.paymentLink} target="_blank" rel="noopener noreferrer" class="w-full">
							Start this tier
							<ArrowUpRight weight="regular" />
						</Button>
					</CardFooter>
				</Card>
			</div>
		{/each}
	</div>
</Section>

<Section tone="dark">
	<SectionHeading
		eyebrow="How it works"
		title="A practical path from application to activation."
		tone="dark"
	/>

	<ol class="mt-12 grid gap-x-8 md:grid-cols-5">
		{#each processSteps as step, index}
			<li
				class="border-t border-dci-cream/25 pt-6 pb-8 md:pb-0"
				use:reveal={{ delay: index * 70, y: 18 }}
			>
				<p class="font-serif text-lg text-dci-cream/75">0{index + 1}</p>
				<h3 class="type-subtitle mt-3 text-dci-cream">{step.title}</h3>
				<p class="mt-3 text-sm leading-relaxed text-dci-cream/75">{step.description}</p>
			</li>
		{/each}
	</ol>
</Section>

<CtaBand
	eyebrow="Need help choosing?"
	title="We can help match the certification to your community context."
	description="Use the contact page if you are training a team, sponsoring Champions, or adapting the model for a school, clinic, recovery space, or venue."
>
	{#snippet actions()}
		<Button href="/contact" variant="inverse">Contact DCI</Button>
	{/snippet}
</CtaBand>
