<script lang="ts">
	import CheckoutDrawer from '$lib/components/checkout-drawer.svelte';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import { SectionHeading } from '$lib/components/sections';

	import {
		ArrowRightIcon,
		ArrowUpRightIcon,
		BookOpenTextIcon,
		BuildingsIcon,
		GraduationCapIcon,
		HandshakeIcon,
		PlayIcon
	} from 'phosphor-svelte';

	// Buying happens in place: the drawer posts straight to the product's
	// checkout action, so the next page a buyer sees is Flutterwave itself.
	let buying = $state<{ slug: string; name: string; price: string } | null>(null);

	// Organisational enquiries go to WhatsApp rather than the contact form,
	// because the form silently drops messages while Resend is unconfigured.
	const WHATSAPP_ORG =
		'https://wa.me/256773855144?text=' +
		encodeURIComponent(
			'Hello DCI. I am enquiring on behalf of an organisation and would like to book a call.'
		);

	// The explainer plays on demand, so no YouTube request is made on page load.
	let playing = $state(false);
	// Reset when moving between doors, so the video never follows you.
	function selectPath(path: Pathway) {
		activePath = path;
		playing = false;
	}

	const pathways = [
		{
			id: 'tools',
			label: 'I want tools',
			kicker: 'Own your healing',
			icon: BookOpenTextIcon,
			title: 'I am ready to own my healing.',
			description:
				'Three paper tools that give you somewhere to start. A conversation can happen anywhere, with anyone, without waiting for an appointment.',
			steps: ['Draw a card and start talking', 'Track your mood each day', 'Write it out in the journal'],
			helper: 'The full toolkit is 200,000 UGX and earns 10 Connection Miles.',
			href: '#toolkit',
			cta: 'See the toolkit',
			accent: '#2A6268'
		},
		{
			id: 'lead',
			label: 'I want to lead',
			kicker: 'Become a champion',
			icon: GraduationCapIcon,
			title: 'I am a mental health advocate.',
			description:
				'There will never be enough counsellors. There are already enough people who care.',
			// One offer, rendered inline instead of the three step labels.
			steps: [],
			offer: {
				name: 'Community Champion certification',
				body: 'Training of Trainers certifies you to facilitate a session safely, use the toolkit with a group, recognise when someone needs more than you can give, and follow the referral procedure.',
				total: '500,000 UGX',
				deposit: '150,000 UGX',
				depositNote: 'A 30 per cent deposit reserves your place on the waitlist. The balance of 350,000 UGX is due before training begins.',
			},
			helper: 'Training days are announced at the next Conversation Clinic.',
			href: '/checkout/champion-deposit',
			cta: 'Pay deposit and join the waitlist',
			accent: '#6F231E'
		},
		{
			id: 'organisation',
			label: 'I run an organisation',
			kicker: 'Early Warning System',
			icon: BuildingsIcon,
			title: 'I am an organisation or a funder.',
			description:
				'You can count who showed up. We help you see what changed. Participants complete a paper mood tracker themselves, trained champions collect them, and we turn them into cohort-level measures with a documented referral procedure attached. You see the pattern. Never the person.',
			steps: [],
			video: {
				id: 'wMUYQ6uZn0Q',
				title: 'How DCI works with organisations'
			},
			helper:
				"The Early Warning System earns no Connection Miles of its own. It is what makes everyone else's countable.",
			href: WHATSAPP_ORG,
			cta: 'Talk to us on WhatsApp',
			accent: '#2A6268'
		},
		{
			id: 'support',
			label: 'I want to support',
			kicker: 'Sponsor access',
			icon: HandshakeIcon,
			title: "I want to fund someone else's start.",
			description:
				'Two ways in. Show up as a volunteer, or fund the tools and training for someone who cannot pay for them.',
			// Two routes, rendered inline instead of the three step labels.
			steps: [],
			options: [
				{
					name: 'Become a DCI Angel',
					body: 'Volunteers carry the card game and wear the shirt, so a conversation can start anywhere and people know who to approach. Buying both adds you to the DCI Angels WhatsApp group, where missions are organised.',
					price: '119,000 UGX',
					note: 'DCI Card Game and shirt together. Earns 9 Connection Miles.',
					slug: 'angel-kit',
					cta: 'Join the Angels'
				},
				{
					name: 'Sponsor someone else',
					body: 'Fund a complete toolkit for a person who cannot buy one, or a full Champion scholarship so a community gains a trained facilitator.',
					price: '200,000 UGX',
					note: 'A full toolkit is 10 Connection Miles. A Champion scholarship is 500,000 UGX.',
					slug: 'sponsor-toolkit',
					cta: 'Sponsor a toolkit'
				}
			],
			helper:
				'Ten per cent of every toolkit sold already funds Champion training. Venue partners, DCI Angels and the provider network start at Volunteering.',
			href: '/checkout/sponsor-scholarship',
			cta: 'Fund a scholarship',
			accent: '#6F231E'
		}
	] as const;

	type Pathway = (typeof pathways)[number];

	let activePath = $state<Pathway>(pathways[0]);
</script>

<!--
	A dark band of four numbered doors, the homepage's one place to join or sponsor. The open door unfolds its detail
	(offer, video or options) directly beneath its row. The band
	tucks up behind the hero video, so it starts with a negative margin.
-->
<section
	id="find-your-path"
	class="relative -mt-40 scroll-mt-28 bg-dci-teal-deep px-4 pt-56 pb-20 text-dci-cream sm:px-6 lg:-mt-64 lg:px-8 lg:pt-80 lg:pb-28"
>
	<div class="mx-auto max-w-7xl">
		<SectionHeading
			eyebrow="Find your path"
			tone="dark"
			description="DCI can be tools for yourself, a training path, a measurement system, or a way to sponsor access. Choose the entry point that matches what brought you here."
		>
			{#snippet title()}Start <em>where you are.</em>{/snippet}
		</SectionHeading>

		<ol class="mt-14 border-t border-dci-cream/15">
			{#each pathways as path, index (path.id)}
				{@const open = activePath.id === path.id}
				<li class="border-b border-dci-cream/15">
					<button
						type="button"
						class="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[3.5rem_1fr_1fr_auto] lg:py-7"
						aria-expanded={open}
						aria-controls={`door-${path.id}`}
						onclick={() => selectPath(path)}
					>
						<span class="font-serif text-lg text-dci-cream/75">0{index + 1}</span>
						<span
							class={cn(
								'font-serif text-2xl transition sm:text-3xl',
								open ? 'text-dci-cream' : 'text-dci-cream/80 group-hover:text-dci-cream'
							)}
						>
							{path.label}
						</span>
						<span class="hidden text-base text-dci-cream/75 sm:block">{path.kicker}</span>
						<ArrowRightIcon
							class={cn(
								'size-6 transition duration-300',
								open ? 'rotate-90 text-dci-clay' : 'text-dci-cream/75'
							)}
							weight="regular"
						/>
					</button>
					{#if open}
						<div id={`door-${path.id}`} class="pb-8">
							{@render detail()}
						</div>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</section>

{#snippet detail()}
	<div class="relative overflow-hidden rounded-4xl bg-dci-cream p-6 text-foreground sm:p-8 lg:p-10">
		<div class="relative z-10 max-w-3xl">
			<h3 class="type-title max-w-xl">
				{activePath.title}
			</h3>
			<p class="type-lede mt-4 max-w-xl text-muted-foreground">
				{activePath.description}
			</p>
			<div class="mt-8">
				{#if 'options' in activePath && activePath.options}
					<!-- Two routes in, each buyable in place. -->
					<div class="grid gap-3 sm:grid-cols-2">
						{#each activePath.options as option (option.slug)}
							<article
								class="flex flex-col justify-between rounded-2xl border border-dci-teal/12 bg-dci-paper/65 p-4"
							>
								<div>
									<p class="text-sm font-semibold leading-tight text-foreground">{option.name}</p>
									<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{option.body}</p>
									<p class="mt-3 text-base font-bold text-dci-teal-deep">{option.price}</p>
									<p class="mt-1 text-xs text-muted-foreground">{option.note}</p>
								</div>
								<div class="mt-4 space-y-2">
									<Button
										variant="outline"
										size="sm"
										class="w-full"
										onclick={() => (buying = { slug: option.slug, name: option.name, price: option.price })}
									>
										{option.cta}
									</Button>
								</div>
							</article>
						{/each}
					</div>
				{:else if 'video' in activePath && activePath.video}
					<!-- Click to play, so no YouTube request is made until it is wanted. -->
					<div class="max-w-md overflow-hidden rounded-2xl border border-dci-teal/12 bg-dci-ink">
						{#if playing}
							<div class="aspect-video w-full">
								<iframe
									src={`https://www.youtube-nocookie.com/embed/${activePath.video.id}?autoplay=1&rel=0`}
									title={activePath.video.title}
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
									class="h-full w-full"
								></iframe>
							</div>
						{:else}
							<button
								type="button"
								onclick={() => (playing = true)}
								aria-label={`Play video: ${activePath.video.title}`}
								class="group relative flex aspect-video w-full items-center justify-center"
							>
								<img
									src="/photos/ann-banya.jpg"
									alt=""
									loading="lazy"
									class="absolute inset-0 h-full w-full object-cover opacity-70 transition group-hover:opacity-80"
								/>
								<span
									class="relative flex size-14 items-center justify-center rounded-full bg-dci-cream text-dci-teal-deep transition group-hover:bg-dci-paper"
								>
									<PlayIcon class="ml-0.5 size-6" weight="fill" />
								</span>
								<span class="absolute bottom-3 left-4 right-4 text-left text-sm font-semibold text-dci-cream">
									{activePath.video.title}
								</span>
							</button>
						{/if}
					</div>
				<p class="mt-2 text-xs text-muted-foreground">
					Video not loading?
					<a
						href={`https://www.youtube.com/watch?v=${activePath.video.id}`}
						target="_blank"
						rel="noopener noreferrer"
						class="font-semibold text-dci-teal underline underline-offset-4"
					>Watch it on YouTube</a>
				</p>
				{:else if 'offer' in activePath && activePath.offer}
					<article class="rounded-2xl border border-dci-teal/15 bg-dci-paper/65 p-5">
						<div class="min-w-0">
							<p class="text-sm font-semibold leading-tight text-foreground">
								{activePath.offer.name}
							</p>
							<p class="mt-2 text-xs leading-relaxed text-muted-foreground">{activePath.offer.body}</p>
							<p class="mt-3 text-sm font-semibold text-dci-teal-deep">
								{activePath.offer.deposit} deposit
								<span class="font-normal text-muted-foreground">of {activePath.offer.total}</span>
							</p>
							<p class="mt-1 text-xs leading-snug text-muted-foreground">
								{activePath.offer.depositNote}
							</p>
						</div>
					</article>
				{:else}
					<div class="grid gap-3 sm:grid-cols-3">
						{#each activePath.steps as step, index (step)}
							<div class="rounded-2xl border border-dci-teal/12 bg-dci-paper/65 p-4">
								<p class="text-xs font-semibold text-dci-burgundy/70">0{index + 1}</p>
								<p class="mt-3 text-sm font-semibold leading-snug text-dci-teal-deep">{step}</p>
							</div>
						{/each}
					</div>
				{/if}

				<div class="mt-8 flex flex-col gap-3 border-t border-dci-teal/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<div class="max-w-sm space-y-2">
						<p class="text-sm leading-relaxed text-muted-foreground">{activePath.helper}</p>
						<p class="text-sm leading-relaxed text-muted-foreground">
							Not sure where to start?
							<a href="/performance/assessment" class="font-semibold text-dci-teal underline underline-offset-4">
								Take the free Blueprint Assessment
							</a>
							and see what the patterns say.
						</p>
					</div>
					<Button
						variant="accent"
						href={activePath.href}
						target={activePath.href.startsWith('http') ? '_blank' : undefined}
						rel={activePath.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					>
						{activePath.cta}
						<ArrowUpRightIcon weight="regular" />
					</Button>
				</div>
			</div>
		</div>
	</div>
{/snippet}

<CheckoutDrawer bind:product={buying} />
