<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { paymentLinks } from '$lib/payment-links';
	import { PageHero, Section, SectionHeading, FeatureCard } from '$lib/components/sections';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';

	const roles = [
		{
			title: 'Clinic Support',
			description: 'Help set up conversation spaces, welcome participants, and support smooth sessions.'
		},
		{
			title: 'Community Champion',
			description: 'Train to facilitate DCI toolkit conversations in your neighborhood, school, or venue.'
		},
		{
			title: 'Referral Steward',
			description: 'Support responsible signposting to trained providers and crisis-safe resources.'
		},
		{
			title: 'Venue Connector',
			description: 'Help identify cafes, studios, schools, and community spaces that can host DCI work.'
		}
	];
</script>

<PageHero
	eyebrow="Volunteer with DCI"
	title="Help make emotional support easier to reach."
	description="DCI volunteers help create warm, grounded, and practical spaces where people can talk, reflect, learn, and find the next right support."
>
	{#snippet actions()}
		<Button href="/contact">
			Apply to volunteer
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
		<Button
			href="/trainings"
			variant="outline"
		>
			See trainings
		</Button>
	{/snippet}
	{#snippet aside()}
		<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:ml-auto lg:max-w-lg">
			<p class="type-subtitle text-foreground">
				Volunteer orientation is the first step before facilitating or supporting a DCI clinic.
			</p>
			<p class="mt-4 text-sm leading-relaxed text-muted-foreground">
				We match people based on availability, care experience, language, location, and comfort
				with group support work.
			</p>
		</div>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading eyebrow="Roles" title="Four ways to help." class="mb-10" />
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
		{#each roles as role, index}
			<div use:reveal={{ delay: index * 70, y: 18 }} class="h-full">
				<FeatureCard title={role.title} description={role.description} />
			</div>
		{/each}
	</div>

	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8"
	>
		<div>
			<h3 class="type-subtitle text-foreground">DCI Angels Shirt</h3>
			<p class="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
				Wear it. You become the signal. Mental health is talked about openly here, and
				you're the reason someone feels safe enough to start.
			</p>
			<p class="mt-4 font-serif text-3xl text-dci-teal-deep">UGX 50,000</p>
		</div>
		<Button href={paymentLinks.tShirt} target="_blank" rel="noopener noreferrer">
			Get the shirt
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	</div>
</Section>
