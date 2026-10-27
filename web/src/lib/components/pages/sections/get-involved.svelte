<script>
	import { paymentLinks } from '$lib/payment-links';
	import { reveal } from '$lib/actions/reveal';
	import { Section, SectionHeading } from '$lib/components/sections';
</script>

<Section id="get-involved">
	<SectionHeading
		eyebrow="Get involved"
		split
		description="Whether you are a venue owner, mental health professional, volunteer, or sponsor, there is a place for you in the DeeperConnection ecosystem."
	>
		{#snippet title()}There is a place <em>for you</em> here{/snippet}
	</SectionHeading>

	<div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<div
			use:reveal={{ delay: 0, y: 18 }}
			class="flex h-full flex-col overflow-hidden rounded-2xl border border-dci-teal/15 bg-dci-paper/70"
		>
			<img
				src="/photos/section7-venue.jpg"
				alt="A wellness hub hosting a DCI clinic"
				loading="lazy"
				class="block h-40 w-full object-cover"
			/>
			<div class="flex flex-1 flex-col p-6">
				<h3 class="type-subtitle text-foreground">Venue Partner</h3>
				<p class="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
					Turn your café, studio, or space into a certified wellness hub hosting DCI clinics.
				</p>
				<span class="mt-5 text-sm font-semibold text-dci-teal">Apply now &rarr;</span>
			</div>
		</div>

		<div
			use:reveal={{ delay: 70, y: 18 }}
			class="flex h-full flex-col overflow-hidden rounded-2xl border border-dci-teal/15 bg-dci-paper/70"
		>
			<img
				src="/photos/champion-training-hero.jpg"
				alt="DCI Angels supporting a clinic"
				loading="lazy"
				class="block h-40 w-full object-cover"
			/>
			<div class="flex flex-1 flex-col p-6">
				<h3 class="type-subtitle text-foreground">DCI Angel</h3>
				<p class="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
					Join monthly missions, support clinics, and help deliver emotional first aid.
				</p>
				<span class="mt-5 text-sm font-semibold text-dci-teal">Join squad &rarr;</span>
			</div>
		</div>

		<div
			use:reveal={{ delay: 140, y: 18 }}
			class="flex h-full flex-col overflow-hidden rounded-2xl border border-dci-teal/15 bg-dci-paper/70"
		>
			<img
				src="/photos/section7-clinics.jpg"
				alt="A Conversation Clinic in session"
				loading="lazy"
				class="block h-40 w-full object-cover"
			/>
			<div class="flex flex-1 flex-col p-6">
				<h3 class="type-subtitle text-foreground">Provider Network</h3>
				<p class="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
					Join our responsible referral network and collaborate on trauma-aware care.
				</p>
				<span class="mt-5 text-sm font-semibold text-dci-teal">Join network &rarr;</span>
			</div>
		</div>

		<div
			use:reveal={{ delay: 210, y: 18 }}
			class="flex h-full flex-col rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6"
		>
			<h3 class="type-subtitle text-foreground">Sponsor</h3>
			<p class="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
				Fund toolkits and clinics so more people can access mental health support.
			</p>
			<a
				href={paymentLinks.donation}
				target="_blank"
				rel="noopener noreferrer"
				class="mt-5 text-sm font-semibold text-dci-teal underline-offset-4 hover:underline"
			>
				Sponsor a kit &rarr;
			</a>
		</div>
	</div>
</Section>
