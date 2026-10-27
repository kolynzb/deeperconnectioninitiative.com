<script lang="ts">
	import EventsCard from '$lib/components/events-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { PageHero, Section, SectionHeading } from '$lib/components/sections';
	import { eventsStructuredData } from '$lib/config/structured-data';

	const events = [
		{
			title: 'Wellness Wednesday Conversation Clinic',
			description:
				'A peer-led wellness meetup with a trained Champion, DCI toolkit, and willing participants. Booking pays for your seat and checks you in on arrival.',
			url: '/checkout/clinic',
			cta: 'Book your seat',
			startDate: '2026-08-26T17:30:00',
			endDate: '2026-08-26T19:00:00',
			location: 'Partner venue, Kampala',
			type: 'Clinic',
			price: 'UGX 20,000',
			miles: 'Earns Connection Miles'
		},
		{
			title: 'Wellness Wednesday Conversation Clinic',
			description:
				'A peer-led wellness meetup with a trained Champion, DCI toolkit, and willing participants.',
			url: '/checkout/clinic',
			startDate: '2026-07-29T17:30:00',
			endDate: '2026-07-29T19:00:00',
			location: 'Partner venue, Kampala',
			type: 'Clinic',
			price: 'UGX 20,000',
			miles: 'Earns Connection Miles'
		},
		{
			title: 'Community Champion Orientation',
			description:
				'An introduction for volunteers, venue partners, and facilitators interested in supporting DCI clinics.',
			url: '/volunteering',
			startDate: '2026-08-07T10:00:00',
			endDate: '2026-08-07T12:00:00',
			location: 'Acacia Avenue, Kampala',
			type: 'Training'
		},
		{
			title: 'Toolkit Demo for Schools and Youth Groups',
			description:
				'A practical walkthrough of the card game, reflection journal, mood tracker, and referral workflow.',
			url: '/trainings',
			startDate: '2026-08-19T14:00:00',
			endDate: '2026-08-19T16:00:00',
			location: 'Hybrid session',
			type: 'Demo'
		}
	];

	// Split into upcoming vs past so the listing self-maintains as dates roll by.
	const now = Date.now();
	const upcoming = events
		.filter((e) => new Date(e.endDate).getTime() >= now)
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
	const past = events
		.filter((e) => new Date(e.endDate).getTime() < now)
		.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

	const gallery = Array.from({ length: 8 }, (_, i) => `/photos/events/event-${i + 1}.webp`);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${eventsStructuredData(events)}</script>`}
</svelte:head>

<PageHero
	eyebrow="Events and clinics"
	title="Places to practice connection in real life."
	description="DCI events are built around practical mental wellness: conversation clinics, facilitator orientations, toolkit demos, and partner sessions."
>
	{#snippet aside()}
		<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:ml-auto lg:max-w-lg">
			<p class="type-eyebrow text-dci-teal">Host a DCI session</p>
			<p class="type-subtitle mt-4 text-foreground">
				Bring a clinic, demo, or champion orientation into your school, venue, clinic, or youth
				group.
			</p>
			<Button href="/contact?topic=Community%20clinic%20or%20event" class="mt-7">
				Request an event
				<ArrowUpRight class="size-4" weight="regular" />
			</Button>
		</div>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading title="Upcoming sessions" />
	{#if upcoming.length > 0}
		<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each upcoming as event, index}
				<div use:reveal={{ delay: index * 80, y: 20 }}>
					<EventsCard {event} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="mt-12 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 text-muted-foreground sm:p-8">
			<p class="type-subtitle text-foreground">No sessions on the calendar right now.</p>
			<p class="mt-2 max-w-xl">
				New clinics and demos are added regularly. Want to host one, or hear when the next is
				scheduled? <a href="/contact" class="font-semibold text-dci-teal underline underline-offset-4">Get in touch</a>.
			</p>
		</div>
	{/if}

	{#if past.length > 0}
		<SectionHeading title="Past sessions" class="mt-24" />
		<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each past as event, index}
				<div use:reveal={{ delay: index * 80, y: 20 }} class="opacity-75">
					<EventsCard {event} />
				</div>
			{/each}
		</div>
	{/if}
</Section>

<Section>
	<SectionHeading
		eyebrow="From the field"
		title="Moments from recent clinics and gatherings"
		description="Real sessions, real conversations. This is what connection looks like when a community holds space for itself."
	/>

	<div class="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
		{#each gallery as src, index}
			<img
				{src}
				alt={`DCI community moment ${index + 1}`}
				loading="lazy"
				class="w-full break-inside-avoid rounded-2xl object-cover"
			/>
		{/each}
	</div>
</Section>
