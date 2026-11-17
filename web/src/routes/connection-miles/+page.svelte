<script lang="ts">
	import { flowGroup } from '$lib/actions/flow';
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import { reveal } from '$lib/actions/reveal';
	import { Button } from '$lib/components/ui/button';
	import { PageHero, Section, SectionHeading } from '$lib/components/sections';
	import { paymentLinks } from '$lib/payment-links';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';

	const campaignStats = [
		{
			label: 'Toolkits funded',
			value: '184',
			detail: 'Complete kits moving into clinics, schools, teams, and circles.'
		},
		{
			label: 'Connection miles',
			value: '3,920',
			detail: 'Earned through toolkit use, clinics, and sponsored kits.'
		},
		{
			label: 'Active field points',
			value: '12',
			detail: 'Communities reporting journal, tracker, and clinic activity.'
		}
	];

	// Real geographic coordinates (lat/lng) for each field location in Uganda.
	const mapLocations = [
		{ name: 'Kampala', toolkits: 58, miles: 1240, lat: 0.3476, lng: 32.5825, color: '#6F231E' },
		{ name: 'Wakiso', toolkits: 34, miles: 760, lat: 0.4044, lng: 32.4594, color: '#D49C70' },
		{ name: 'Jinja', toolkits: 21, miles: 410, lat: 0.4244, lng: 33.2041, color: '#2A6268' },
		{ name: 'Mbarara', toolkits: 18, miles: 360, lat: -0.6072, lng: 30.6545, color: '#6F231E' },
		{ name: 'Gulu', toolkits: 16, miles: 295, lat: 2.7746, lng: 32.299, color: '#2A6268' },
		{ name: 'Mbale', toolkits: 14, miles: 270, lat: 1.0644, lng: 34.1797, color: '#D49C70' }
	];

	let mapEl: HTMLDivElement;

	onMount(() => {
		let map: import('leaflet').Map | undefined;
		let cancelled = false;

		(async () => {
			const L = (await import('leaflet')).default;
			if (cancelled || !mapEl) return;

			map = L.map(mapEl, {
				scrollWheelZoom: false, // don't hijack page scroll
				zoomControl: true,
				attributionControl: true
			}).setView([1.3, 32.4], 7);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; OpenStreetMap contributors'
			}).addTo(map);

			for (const loc of mapLocations) {
				const icon = L.divIcon({
					className: 'dci-map-pin',
					html: `<span class="dci-pin-dot" style="--pin:${loc.color}"></span>`,
					iconSize: [32, 32],
					iconAnchor: [16, 16]
				});
				L.marker([loc.lat, loc.lng], { icon, title: loc.name })
					.addTo(map)
					.bindPopup(
						`<div class="dci-pin-pop"><p class="dci-pin-name">${loc.name}</p>` +
							`<p>${loc.toolkits} toolkits funded</p>` +
							`<p>${loc.miles} connection miles</p></div>`
					);
			}

			// Frame the view to the actual field points.
			const bounds = L.latLngBounds(mapLocations.map((l) => [l.lat, l.lng] as [number, number]));
			map.fitBounds(bounds, { padding: [48, 48] });
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	});

	const rubric = [
		{
			name: 'Card game',
			description: 'Used in Conversation Clinics.',
			items: [
				{ action: 'Attend a clinic', miles: '1 mile' },
				{ action: 'Facilitate a clinic', miles: '5 miles' }
			]
		},
		{
			name: 'Journal',
			description: 'Completed entries turn reflection into measurable connection.',
			items: [{ action: 'Complete one entry', miles: '1 mile' }]
		},
		{
			name: 'Mood tracker',
			description: 'Each check-in helps people notice emotional patterns early.',
			items: [{ action: 'Submit a mood check-in', miles: '1 mile' }]
		},
		{
			name: 'Sponsored toolkit',
			description: 'Funding a full toolkit into the field is counted separately from using it.',
			items: [{ action: 'Sponsor one complete kit', miles: '10 miles' }]
		}
	];

	// Public leaderboard - illustrative preview of what champions and partner
	// organizations see on their DCI dashboard. Ranked by total Connection Miles
	// (1 mile = 1 life meaningfully impacted). Real figures will come from the
	// platform; these are representative field numbers.
	type Leader = { name: string; meta: string; miles: number };

	const boards: Record<'champions' | 'organizations', { label: string; rows: Leader[] }> = {
		champions: {
			label: 'Champions',
			rows: [
				{ name: 'Aisha Namubiru', meta: 'Verified Champion · Kampala', miles: 624 },
				{ name: 'Daniel Okello', meta: 'Verified Champion · Gulu', miles: 512 },
				{ name: 'Grace Achan', meta: 'Professional Champion · Mbarara', miles: 448 },
				{ name: 'Samuel Kato', meta: 'Verified Champion · Jinja', miles: 361 },
				{ name: 'Patience Nakato', meta: 'Verified Champion · Wakiso', miles: 297 },
				{ name: 'Ronald Mugisha', meta: 'Verified Champion · Mbale', miles: 254 }
			]
		},
		organizations: {
			label: 'Organizations',
			rows: [
				{ name: 'Butabika Community Outreach', meta: 'Implementer · Kampala', miles: 1180 },
				{ name: 'UCU Wellness Circle', meta: 'Grassroots · Mukono', miles: 640 },
				{ name: 'Mbarara Hope Center', meta: 'Implementer · Mbarara', miles: 545 },
				{ name: 'Gulu Youth Minds', meta: 'Grassroots · Gulu', miles: 412 },
				{ name: 'Jinja Safe Space', meta: 'Grassroots · Jinja', miles: 330 }
			]
		}
	};

	let activeBoard = $state<'champions' | 'organizations'>('champions');
	const activeRows = $derived(boards[activeBoard].rows);
	const leaderMiles = $derived(activeRows[0].miles);
</script>

<PageHero
	eyebrow="Toolkit field tracker"
	title="Every toolkit can move connection further."
	description="Track how sponsored DCI toolkits, Conversation Clinics, journal entries, and mood check-ins are building measurable Connection Miles across the field."
>
	{#snippet actions()}
		<Button href={paymentLinks.toolkit} target="_blank" rel="noopener noreferrer">
			Buy a toolkit
			<ArrowUpRight weight="regular" />
		</Button>
		<Button
			href={paymentLinks.donation}
			target="_blank"
			rel="noopener noreferrer"
			variant="outline"
		>
			Sponsor a field kit
		</Button>
	{/snippet}
	{#snippet aside()}
		<dl
			class="grid divide-y divide-dci-teal/15 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-0"
		>
			{#each campaignStats as stat}
				<div class="py-6 sm:px-6 sm:py-8">
					<dt class="type-eyebrow text-dci-teal">{stat.label}</dt>
					<dd class="mt-3 font-serif text-3xl text-dci-teal-deep">{stat.value}</dd>
					<dd class="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.detail}</dd>
				</div>
			{/each}
		</dl>
	{/snippet}
</PageHero>

<Section class="pt-0 lg:pt-0">
	<SectionHeading
		eyebrow="Connection map"
		title="Where toolkits are moving into use."
		description="Each marker combines sponsored kits and reported Connection Miles from local activity."
		split
	/>

	<div
		bind:this={mapEl}
		class="dci-map relative z-0 mt-12 h-[420px] w-full overflow-hidden rounded-4xl border border-dci-teal/15 sm:h-[480px]"
		aria-label="Interactive map of DCI field activity across Uganda"
	></div>
</Section>

<Section>
	<SectionHeading
		eyebrow="The rubric"
		title="How Connection Miles are counted."
		description="Using a toolkit and sponsoring a toolkit are intentionally separate actions. Participants earn miles by engaging with the tools; sponsors earn miles by funding full kits into the field."
		split
	/>

	<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each rubric as item, index}
			<article
				use:reveal={{ delay: index * 70, y: 18 }}
				class="flex h-full flex-col rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8"
			>
				<h3 class="type-subtitle text-foreground">{item.name}</h3>
				<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
				<dl class="mt-auto divide-y divide-dci-teal/15 pt-6">
					{#each item.items as score}
						<div class="flex items-baseline justify-between gap-3 py-3">
							<dt class="text-sm text-foreground">{score.action}</dt>
							<dd class="shrink-0 font-serif text-lg text-dci-teal-deep">{score.miles}</dd>
						</div>
					{/each}
				</dl>
			</article>
		{/each}
	</div>
</Section>

<Section>
	<SectionHeading
		eyebrow="The leaderboard"
		title="Every mile is one life. Here's who's moving the most."
		description="Champions and partner organizations earn Connection Miles for every reflection, clinic, and kit that reaches the field. The public leaderboard mirrors what they see on their DCI dashboard: recognition that the quiet work is counted."
		split
	/>

	<div
		use:reveal={{ delay: 120, y: 18 }}
		class="mt-12 overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-paper/70"
	>
		<div
			class="flex flex-wrap items-center justify-between gap-4 border-b border-dci-teal/15 p-6 sm:px-8"
		>
			<div
				use:flowGroup
				class="inline-flex gap-1 rounded-full border border-dci-teal/15 bg-dci-cream p-1"
			>
				{#each Object.entries(boards) as [key, board]}
					<button
						type="button"
						aria-pressed={activeBoard === key}
						class="relative z-10 h-10 rounded-full px-5 text-sm font-semibold transition-colors {activeBoard ===
						key
							? 'text-dci-cream'
							: 'text-foreground'}"
						onclick={() => (activeBoard = key as 'champions' | 'organizations')}
					>
						{board.label}
					</button>
				{/each}
			</div>
			<p class="type-eyebrow text-muted-foreground">Total Connection Miles · this season</p>
		</div>

		<ol class="divide-y divide-dci-teal/15">
			{#each activeRows as row, index (activeBoard + row.name)}
				<li
					class="flex items-center gap-5 px-6 py-5 sm:px-8"
					use:reveal={{ delay: index * 60, y: 12 }}
				>
					<span class="w-6 shrink-0 font-serif text-lg text-dci-teal">{index + 1}</span>

					<div class="min-w-0 flex-1">
						<p class="truncate text-base font-semibold text-foreground sm:text-lg">{row.name}</p>
						<p class="truncate text-sm text-muted-foreground">{row.meta}</p>
						<div class="mt-3 h-1 w-full max-w-xs overflow-hidden rounded-full bg-dci-teal/10">
							<div
								class="h-full rounded-full bg-dci-teal transition-[width] duration-500"
								style={`width:${Math.round((row.miles / leaderMiles) * 100)}%`}
							></div>
						</div>
					</div>

					<div class="shrink-0 text-right">
						<p class="font-serif text-3xl text-dci-teal-deep">{row.miles.toLocaleString()}</p>
						<p class="type-eyebrow text-muted-foreground">miles</p>
					</div>
				</li>
			{/each}
		</ol>

		<p
			class="border-t border-dci-teal/15 px-6 py-4 text-xs leading-relaxed text-muted-foreground sm:px-8"
		>
			1 Connection Mile = 1 life meaningfully impacted. Figures shown are representative field
			numbers; live rankings open with the DCI platform.
		</p>
	</div>
</Section>

<!-- The tools live on the Toolkit page; this page only points there. -->
<Section tone="cream">
	<div
		use:reveal={{ delay: 0, y: 22 }}
		class="grid gap-8 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
	>
		<div>
			<h2 class="type-title text-foreground">The miles start with the kit.</h2>
			<p class="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
				Cards open conversation, journals shape reflection, and mood trackers help people notice
				patterns. Together they create the activity behind the Connection Miles.
			</p>
		</div>
		<Button href="/toolkit#toolkit-products" class="shrink-0">
			See the toolkit
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	</div>
</Section>

<style>
	/* Brand-styled Leaflet pins + popups.
	   These target Leaflet-injected DOM, so they must be :global. */
	:global(.dci-map .leaflet-container) {
		background: var(--dci-sand);
		font-family: var(--font-sans), system-ui, sans-serif;
	}

	:global(.dci-pin-dot) {
		display: block;
		margin: 6px;
		width: 20px;
		height: 20px;
		border-radius: 9999px;
		background: var(--pin, #2a6268);
		box-shadow: 0 0 0 4px var(--dci-paper);
	}

	:global(.leaflet-popup-content-wrapper) {
		border-radius: 1rem;
		background: var(--dci-cream);
		border: 1px solid rgba(42, 98, 104, 0.15);
		box-shadow: none;
	}
	:global(.leaflet-popup-tip) {
		background: var(--dci-cream);
	}
	:global(.dci-pin-pop .dci-pin-name) {
		font-weight: 600;
		color: var(--dci-teal-deep);
		font-size: 0.875rem;
	}
	:global(.dci-pin-pop p) {
		margin: 0.15rem 0 0;
		font-size: 0.75rem;
		color: var(--muted-foreground);
	}
</style>
