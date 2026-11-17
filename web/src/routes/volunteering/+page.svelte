<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { paymentLinks } from '$lib/payment-links';
	import { PageHero, Section, SectionHeading } from '$lib/components/sections';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';

	const roles = [
		{
			title: 'Clinic Support',
			description:
				'Help set up conversation spaces, welcome participants, and support smooth sessions.'
		},
		{
			title: 'Community Champion',
			description:
				'Train to facilitate DCI toolkit conversations in your neighborhood, school, or venue.'
		},
		{
			title: 'Referral Steward',
			description: 'Support responsible signposting to trained providers and crisis-safe resources.'
		},
		{
			title: 'Venue Connector',
			description:
				'Help identify cafes, studios, schools, and community spaces that can host DCI work.'
		}
	];

	const apply = '/contact?topic=Volunteer%20inquiry';

	// Two columns, the second set lower, after Spaziobianco's about mosaic.
	const photos = [
		{
			src: '/photos/events/event-4.webp',
			alt: 'People handing round DCI materials at a community event'
		},
		{ src: '/photos/events/event-6.webp', alt: 'A small group in conversation around a table' },
		{ src: '/photos/events/event-5.webp', alt: 'A parent and child reading a DCI card together' },
		{ src: '/photos/events/event-8.webp', alt: 'Students in a DCI session at a school' }
	];
</script>

<PageHero
	eyebrow="Volunteer with DCI"
	title="Help make emotional support easier to reach."
	description="DCI volunteers help create warm, grounded, and practical spaces where people can talk, reflect, learn, and find the next right support."
>
	{#snippet actions()}
		<Button href={apply}>
			Apply to volunteer
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
		<Button href="/trainings" variant="outline">See trainings</Button>
	{/snippet}
</PageHero>

<Section class="pt-0 lg:pt-0">
	<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
		<div use:reveal={{ delay: 0, y: 18 }} class="grid grid-cols-2 gap-3 sm:gap-4">
			{#each [0, 1] as column (column)}
				<div
					class={column === 1 ? 'mt-12 space-y-3 sm:mt-20 sm:space-y-4' : 'space-y-3 sm:space-y-4'}
				>
					{#each photos.filter((_, i) => i % 2 === column) as photo (photo.src)}
						<img
							src={photo.src}
							alt={photo.alt}
							loading="lazy"
							class="aspect-[4/5] w-full rounded-2xl object-cover"
						/>
					{/each}
				</div>
			{/each}
		</div>

		<div use:reveal={{ delay: 120, y: 18 }}>
			<SectionHeading eyebrow="Before you start" title="Orientation comes first." />
			<p class="type-lede mt-6 max-w-lg text-foreground">
				Volunteer orientation is the first step before facilitating or supporting a DCI clinic.
			</p>
			<p class="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
				We match people based on availability, care experience, language, location, and comfort with
				group support work.
			</p>
			<Button href={apply} class="mt-8">
				Apply to volunteer
				<ArrowUpRight class="size-4" weight="regular" />
			</Button>
		</div>
	</div>
</Section>

<Section>
	<!-- Scarlet's tips panel: the heading in a third, the four roles in a 2x2. -->
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="grid gap-10 rounded-4xl bg-dci-cream p-6 sm:p-10 lg:grid-cols-3 lg:gap-16 lg:p-14"
	>
		<SectionHeading eyebrow="Roles" title="Four ways to help." />
		<div class="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-2">
			{#each roles as role, index (role.title)}
				<div class="border-t border-dci-teal/20 pt-6">
					<span class="font-serif text-3xl leading-none text-dci-teal/60">0{index + 1}</span>
					<h3 class="type-subtitle mt-4 text-foreground">{role.title}</h3>
					<p class="mt-2 text-base leading-relaxed text-muted-foreground">{role.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8"
	>
		<div>
			<h3 class="type-subtitle text-foreground">DCI Angels Shirt</h3>
			<p class="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
				Wear it. You become the signal. Mental health is talked about openly here, and you're the
				reason someone feels safe enough to start.
			</p>
			<p class="mt-4 font-serif text-3xl text-dci-teal-deep">UGX 50,000</p>
		</div>
		<Button href={paymentLinks.tShirt} target="_blank" rel="noopener noreferrer">
			Get the shirt
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	</div>
</Section>
