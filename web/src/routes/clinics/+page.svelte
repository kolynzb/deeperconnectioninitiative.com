<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PageHero, Section, SectionHeading } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';
	import {
		MapPinIcon as MapPin,
		ClockIcon as Clock,
		ArrowUpRightIcon as ArrowUpRight,
		ArrowRightIcon as ArrowRight
	} from 'phosphor-svelte';
	import {
		CLINIC_END,
		CLINIC_PRICE_UGX,
		CLINIC_START,
		CLINIC_VENUE,
		clinicKey,
		formatClinicDate
	} from '$lib/clinics';

	let { data } = $props();

	const dates = $derived(data.clinics.map((iso: string) => new Date(iso)));
	const next = $derived(dates[0]);

	const price = `${CLINIC_PRICE_UGX.toLocaleString('en-US')} UGX`;

	const howItWorks = [
		{
			title: 'You arrive and you sit down',
			body: 'A small group, a trained Champion holding the room, and a set of cards on the table. Nobody is put on the spot.'
		},
		{
			title: 'A card opens the conversation',
			body: 'Someone draws a question. You answer if you want to. Listening counts as taking part, and plenty of people start there.'
		},
		{
			title: 'You leave with something practical',
			body: 'A way of naming what you are carrying, and people who now know your name. Many come back the following month.'
		}
	];

	const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_VENUE)}`;

	const gettingThere = [
		{ title: 'Venue', body: CLINIC_VENUE },
		{ title: 'When', body: `The last Wednesday of every month, ${CLINIC_START} to ${CLINIC_END}.` },
		{ title: 'Your seat', body: `${price}, includes the session. Pay by Mobile Money or card.` }
	];
</script>

<PageHero
	eyebrow="Every last Wednesday"
	title="A room where the conversation is already started."
	description="The Conversation Clinic is a monthly meet-up in Kampala. A trained Champion, the DCI card game, and a small group of people who came for the same reason you did. You do not need the right words. The cards do that part."
>
	{#snippet aside()}
		<div
			class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:ml-auto lg:max-w-md"
		>
			<p class="type-eyebrow text-dci-teal">Next clinic</p>
			<p class="type-title mt-3 text-foreground">{formatClinicDate(next)}</p>

			<div class="mt-6 space-y-3 border-t border-dci-teal/15 pt-5 text-sm text-muted-foreground">
				<p class="flex items-center gap-2.5">
					<Clock class="size-4 shrink-0" weight="regular" />
					{CLINIC_START} to {CLINIC_END}
				</p>
				<p class="flex items-start gap-2.5">
					<MapPin class="mt-0.5 size-4 shrink-0" weight="regular" />
					{CLINIC_VENUE}
				</p>
			</div>

			<div class="mt-6 border-t border-dci-teal/15 pt-5">
				<p class="font-serif text-3xl text-dci-teal-deep">{price}</p>
				<p class="mt-1 text-sm text-muted-foreground">Per seat, includes the session.</p>
			</div>

			<Button href={`/checkout/clinic?date=${clinicKey(next)}`} class="mt-6 w-full">
				Book your seat
			</Button>
			<p class="mt-3 text-center text-xs text-muted-foreground">
				Pay by Mobile Money or card. Seats are limited.
			</p>
		</div>
	{/snippet}
</PageHero>

<Section>
	<div
		use:reveal={{ delay: 0, y: 18 }}
		class="grid gap-12 rounded-4xl bg-dci-teal-deep px-6 py-14 text-dci-cream sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-20"
	>
		<div class="flex flex-col justify-between gap-10">
			<SectionHeading
				tone="dark"
				eyebrow="What actually happens"
				title="Ninety minutes of your month."
			/>
			<p class="max-w-sm text-sm leading-relaxed text-dci-cream/75">
				Conversation Clinics are peer-led. They are not therapy and do not replace care from a
				professional.
			</p>
		</div>
		<ol class="divide-y divide-dci-cream/20 border-y border-dci-cream/20">
			{#each howItWorks as step, index (step.title)}
				<li class="grid grid-cols-[4rem_1fr] gap-4 py-7 sm:grid-cols-[5rem_1fr]">
					<span class="font-serif text-4xl leading-none text-dci-cream/75">0{index + 1}</span>
					<div>
						<h3 class="type-subtitle text-dci-cream">{step.title}</h3>
						<p class="mt-2 text-base leading-relaxed text-dci-cream/75">{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</Section>

<Section>
	<SectionHeading eyebrow="Attend a clinic" title="Upcoming clinics." class="mb-10" />
	<div class="space-y-3">
		{#each dates as date, index (date.getTime())}
			<article
				use:reveal={{ delay: index * 60, y: 18 }}
				class="grid gap-4 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-6"
			>
				<div class="w-16 shrink-0 text-center">
					<p class="type-eyebrow text-dci-teal">
						{date.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })}
					</p>
					<p class="font-serif text-3xl leading-none text-foreground">{date.getUTCDate()}</p>
				</div>

				<div class="min-w-0">
					{#if index === 0}
						<p class="type-eyebrow mb-1 text-dci-burgundy">Next</p>
					{/if}
					<p class="type-subtitle text-foreground">{formatClinicDate(date)}</p>
					<p class="mt-1 text-sm text-muted-foreground">
						{CLINIC_START} to {CLINIC_END} · {CLINIC_VENUE}
					</p>
					<p class="mt-1 text-sm text-muted-foreground">
						{price} · earns 1 Connection Mile, issued when you check in on the day.
					</p>
				</div>

				<Button href={`/checkout/clinic?date=${clinicKey(date)}`} class="w-full shrink-0 sm:w-auto">
					Book this date
				</Button>
			</article>
		{/each}
	</div>
</Section>

<!-- Getting here: Scarlet's split, details on one side, the room on the other. -->
<Section class="pt-0 lg:pt-0">
	<div class="grid gap-2 lg:grid-cols-2">
		<div
			use:reveal={{ delay: 0, y: 18 }}
			class="flex flex-col justify-between gap-12 rounded-4xl bg-dci-cream p-6 sm:p-10 lg:p-12"
		>
			<h2 class="type-headline text-foreground">
				Getting <em class="text-dci-burgundy">there.</em>
			</h2>
			<dl class="grid gap-x-8 gap-y-8 sm:grid-cols-2">
				{#each gettingThere as detail (detail.title)}
					<div class="border-t border-dci-teal/15 pt-5">
						<dt class="type-subtitle text-foreground">{detail.title}</dt>
						<dd class="mt-2 text-base leading-relaxed text-muted-foreground">{detail.body}</dd>
					</div>
				{/each}
				<div class="border-t border-dci-teal/15 pt-5">
					<dt class="type-subtitle text-foreground">Bringing a group</dt>
					<dd class="mt-2 text-base leading-relaxed text-muted-foreground">
						Want a clinic at your school, workplace, or venue?
						<a
							href="/contact?topic=Community%20clinic%20or%20event"
							class="font-semibold text-dci-teal underline underline-offset-4"
							>Talk to us about hosting one.</a
						>
					</dd>
				</div>
			</dl>
		</div>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="relative aspect-[4/3] overflow-hidden rounded-4xl lg:aspect-auto lg:min-h-[34rem]"
		>
			<img
				src="/photos/section7-venue.webp"
				alt="Two people at a Conversation Clinic, one reading a card from the DCI game"
				loading="lazy"
				class="absolute inset-0 size-full object-cover"
			/>
			<!-- The notch: a page-coloured corner carrying the directions link. -->
			<a
				href={directions}
				target="_blank"
				rel="noopener"
				class="group absolute right-0 bottom-0 flex items-center gap-5 rounded-tl-4xl bg-background pt-3 pl-7"
			>
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
				<span>
					<span class="block text-sm text-muted-foreground">Yujo Izakaya, Kampala</span>
					<span class="block font-serif text-xl text-foreground">Get directions</span>
				</span>
				<span
					class="grid size-14 place-items-center rounded-full bg-dci-teal-deep text-dci-cream transition-colors group-hover:bg-dci-teal-mid"
				>
					<ArrowRight
						class="size-5 transition-transform duration-300 group-hover:-rotate-45"
						weight="regular"
					/>
				</span>
			</a>
		</div>
	</div>
</Section>

<Section tone="cream">
	<div
		use:reveal={{ delay: 0, y: 22 }}
		class="grid gap-8 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
	>
		<div>
			<h2 class="type-title text-foreground">Take the conversation home.</h2>
			<p class="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
				The card game on the table at every clinic is the same one you can take home. Most people
				meet it here first, then keep using it with the people they live with.
			</p>
		</div>
		<Button href="/toolkit#toolkit-products" class="shrink-0">
			See the toolkit
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	</div>
</Section>
