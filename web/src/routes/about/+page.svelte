<script lang="ts">
	import { ArrowRightIcon as ArrowRight, ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { paymentLinks } from '$lib/payment-links';
	import { Button } from '$lib/components/ui/button';
	import { CtaBand, PageHero, Section, SectionHeading } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';

	// Each offering links to the page that serves it; the library has none yet.
	const ecosystem: { title: string; subtitle: string; description: string; href?: string }[] = [
		{
			title: 'DCI Offline Toolkit',
			subtitle: 'Physical Tools & Guides',
			description:
				'Journal + Mood tracker + Conversation cards. Low-tech, high-impact tools for daily reflection and community conversation.',
			href: '/toolkit'
		},
		{
			title: 'Digital Wellness Library',
			subtitle: 'Self-Led Learning',
			description:
				'Short, low-data learning modules building emotional literacy and coping skills for self-led mental wellbeing.'
		},
		{
			title: 'Conversation Clinics',
			subtitle: 'Wellness Meet-ups',
			description:
				'Facilitated peer-support spaces for storytelling and reflection to reduce isolation using the DCI card-game.',
			href: '/clinics'
		},
		{
			title: 'Community Champions',
			subtitle: "Partner Trainings (T.O.T's)",
			description:
				'Training local leaders to use DCI tools, fostering emotional safety and community support without professional reliance.',
			href: '/champions'
		},
		{
			title: 'Program Design',
			subtitle: 'Implementation Support',
			description:
				'Helping organizations design and implement sustainable mental wellness programs grounded in cultural context.',
			href: '/partners'
		},
		{
			title: 'DCI Angels',
			subtitle: 'Volunteer Squad',
			description:
				'Volunteers supporting wellness through monthly missions via community outreaches in everyday spaces.',
			href: '/volunteering'
		},
		{
			title: 'Provider Network',
			subtitle: 'Mental Health Services',
			description:
				'Responsible referral options for professional support, complementing self-led and community-based approaches.',
			href: '/contact?topic=Provider%20network'
		},
		{
			title: 'Connection Miles',
			subtitle: 'Venue Partners',
			description:
				'Transform your venue into a certified wellness hub. Drive traffic. Build community impact. Create recurring revenue.',
			href: '/connection-miles'
		}
	];

	const layers = [
		{
			title: 'Tools layer',
			description: 'Physical toolkits and digital resources that make self-reflection accessible.'
		},
		{
			title: 'Conversation layer',
			description:
				'Facilitated clinics and trained champions turning individual awareness into group support.'
		},
		{
			title: 'Referral layer',
			description: 'Responsible pathways to professional care when community support is not enough.'
		}
	];

	const affiliations = [
		'UPFMH',
		'Butabika National Referral Hospital',
		'Ministry of Education Uganda'
	];
</script>

<PageHero
	eyebrow="The DCI Ecosystem"
	description="DCI exists to shift mental health from a passive service model to an active, self-led journey."
>
	{#snippet title()}Built for the places care <em>already happens.</em>{/snippet}
	{#snippet actions()}
		<Button href={paymentLinks.donation} target="_blank" rel="noopener noreferrer">
			Sponsor a toolkit
		</Button>
		<p class="max-w-xs self-center text-sm leading-relaxed text-muted-foreground">
			10% of each toolkit sold funds community champion trainings and donations.
		</p>
	{/snippet}
	{#snippet aside()}
		<div class="grid gap-6 sm:grid-cols-3">
			{#each layers as layer (layer.title)}
				<div class="border-t border-dci-teal/25 pt-4">
					<p class="type-eyebrow text-dci-teal">{layer.title}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
				</div>
			{/each}
		</div>
	{/snippet}
</PageHero>

<!-- Spaziobianco's hairline grid: every cell is a door to the page that serves it. -->
<Section id="about" class="pt-0 lg:pt-0">
	<SectionHeading
		eyebrow="Eight ways in"
		title="One ecosystem, many doors."
		description="Tools, conversations, and referrals, each run by the community it serves."
		split
	/>
	<ul
		role="list"
		class="mt-12 grid gap-px overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-teal/15 sm:grid-cols-2 lg:grid-cols-4"
	>
		{#each ecosystem as item, index (item.title)}
			<li use:reveal={{ delay: index * 45, y: 14 }} class="bg-background">
				<svelte:element
					this={item.href ? 'a' : 'div'}
					href={item.href}
					class="group flex h-full min-h-72 flex-col p-6 transition-colors sm:p-7 {item.href
						? 'hover:bg-dci-paper'
						: ''}"
				>
					<span class="font-serif text-3xl leading-none text-dci-teal/60">0{index + 1}</span>
					<p class="type-eyebrow mt-8 text-dci-teal">{item.subtitle}</p>
					<h3 class="type-subtitle mt-2 text-foreground">{item.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
					{#if item.href}
						<span class="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-dci-teal">
							Learn more
							<ArrowRight
								class="size-4 transition-transform duration-300 group-hover:translate-x-1"
								weight="regular"
							/>
						</span>
					{/if}
				</svelte:element>
			</li>
		{/each}
	</ul>
</Section>

<!-- Scarlet's story split: the person on one side, the idea on the other. -->
<Section>
	<div class="grid gap-2 lg:grid-cols-2">
		<figure
			use:reveal={{ delay: 0, y: 18 }}
			class="relative aspect-[4/5] overflow-hidden rounded-4xl sm:aspect-[4/3] lg:aspect-auto lg:min-h-[40rem]"
		>
			<img
				src="/photos/ann-banya.webp"
				alt="Ann Banya, Early Child Development Specialist"
				loading="lazy"
				class="absolute inset-0 size-full object-cover object-top"
			/>
			<!-- The notch: a page-coloured corner carrying the caption. -->
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
				<span class="block text-sm text-muted-foreground">The founder</span>
				<span class="block font-serif text-xl text-foreground">Ann Banya</span>
			</figcaption>
		</figure>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="flex flex-col justify-between gap-14 rounded-4xl bg-dci-cream p-6 sm:p-10 lg:p-12"
		>
			<blockquote class="type-headline text-balance text-foreground">
				DCI is to mental health what Airbnb is to hospitality: we don't provide the support
				directly. We build what community support <em class="text-dci-burgundy">runs on.</em>
			</blockquote>
			<div>
				<div class="space-y-5 text-lg leading-relaxed text-muted-foreground">
					<p>
						DCI is built on four decades of behavioural practice, not an emerging idea. Every
						toolkit, clinic, and training carries that experience behind it.
					</p>
					<p>
						Ann Banya brings 40+ years as an Early Childhood Development and behavioural specialist
						to the work.
					</p>
				</div>
				<p class="type-eyebrow mt-10 text-muted-foreground">Trusted alongside</p>
				<ul role="list" class="mt-3 grid gap-6 sm:grid-cols-3">
					{#each affiliations as name (name)}
						<li
							class="border-t border-dci-teal/15 pt-4 font-serif text-lg leading-snug text-foreground"
						>
							{name}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="Support access"
	title="Put a toolkit in someone's hands."
	description="10% of each toolkit sold funds community champion trainings and toolkit donations via monthly missions."
>
	{#snippet actions()}
		<Button
			href={paymentLinks.donation}
			target="_blank"
			rel="noopener noreferrer"
			variant="inverse"
		>
			Sponsor a toolkit
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	{/snippet}
</CtaBand>
