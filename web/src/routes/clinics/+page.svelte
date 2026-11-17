<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { PageHero, Section, SectionHeading, FeatureCard } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';
	import {
		MapPinIcon as MapPin,
		ClockIcon as Clock,
		ArrowUpRightIcon as ArrowUpRight
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
</script>

<PageHero
	eyebrow="Every last Wednesday"
	title="A room where the conversation is already started."
	description="The Conversation Clinic is a monthly meet-up in Kampala. A trained Champion, the DCI card game, and a small group of people who came for the same reason you did. You do not need the right words. The cards do that part."
>
	{#snippet aside()}
		<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:ml-auto lg:max-w-md">
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

<Section tone="cream">
	<SectionHeading
		eyebrow="What actually happens"
		title="Ninety minutes of your month."
		class="mb-12"
	/>
	<div class="grid gap-6 md:grid-cols-3">
		{#each howItWorks as step, index (step.title)}
			<div use:reveal={{ delay: index * 80, y: 22 }} class="h-full">
				<FeatureCard
					kicker={`Step 0${index + 1}`}
					badge={`0${index + 1}`}
					title={step.title}
					description={step.body}
				/>
			</div>
		{/each}
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

				<Button
					href={`/checkout/clinic?date=${clinicKey(date)}`} class="w-full shrink-0 sm:w-auto"
				>
					Book this date
				</Button>
			</article>
		{/each}
	</div>
	<p class="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
		Conversation Clinics are peer-led. They are not therapy and do not replace care from a
		professional.
	</p>
	<p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
		Bringing a group, or want a clinic hosted at your school, workplace, or venue?
		<a
			href="/contact?topic=Community%20clinic%20or%20event"
			class="font-semibold text-dci-teal underline underline-offset-4"
			>Talk to us about hosting one.</a
		>
	</p>
</Section>

<Section tone="cream">
	<div
		use:reveal={{ delay: 0, y: 22 }}
		class="grid gap-8 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
	>
		<div>
			<h2 class="type-title text-foreground">
				Take the conversation home.
			</h2>
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
