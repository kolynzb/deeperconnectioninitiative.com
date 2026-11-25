<script lang="ts">
	import {
		ArrowUpRightIcon as ArrowUpRight,
		CalendarDotsIcon as CalendarDays,
		MapPinIcon as MapPin
	} from 'phosphor-svelte';
	import { Button } from './ui/button';

	type EventProps = {
		url: string;
		title: string;
		description: string;
		startDate: string;
		endDate: string;
		location: string;
		type: string;
		price?: string;
		miles?: string;
		cta?: string;
	};

	let { event }: { event: EventProps } = $props();

	const startDate = $derived(new Date(event.startDate));
	const endDate = $derived(new Date(event.endDate));
	const monthLabel = $derived(startDate.toLocaleDateString('en-US', { month: 'short' }));
	const dayLabel = $derived(startDate.getDate());
	const timeLabel = $derived(
		`${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
	);
</script>

<article
	class="flex h-full flex-col justify-between rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8"
>
	<div>
		<div class="flex items-end gap-4">
			<div class="w-14 shrink-0 text-center">
				<p class="type-eyebrow text-dci-teal">{monthLabel}</p>
				<p class="font-serif text-3xl leading-none text-foreground">{dayLabel}</p>
			</div>
			<div>
				<p class="type-eyebrow text-dci-burgundy">{event.type}</p>
				<p class="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
					<CalendarDays class="size-3.5" weight="regular" />
					{timeLabel}
				</p>
			</div>
		</div>

		<h3 class="type-subtitle mt-8 text-foreground">{event.title}</h3>
		<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
		<p class="mt-5 flex items-start gap-2 text-sm font-medium text-dci-teal-deep">
			<MapPin class="mt-0.5 size-4 shrink-0" weight="regular" />
			<span>{event.location}</span>
		</p>
		{#if event.price}
			<p class="mt-5 font-serif text-3xl text-dci-teal-deep">{event.price}</p>
		{/if}
		{#if event.miles}
			<p class="mt-1 text-sm text-muted-foreground">{event.miles}</p>
		{/if}
	</div>

	<Button
		href={event.url}
		variant={event.cta ? 'default' : 'outline'}
		class="mt-8 self-start"
		title={`${event.cta ?? 'View event'}: ${event.title}`}
		aria-label={`${event.cta ?? 'View event'}: ${event.title}`}
	>
		{event.cta ?? 'View event'}
		<ArrowUpRight class="size-4" weight="regular" />
	</Button>
</article>
