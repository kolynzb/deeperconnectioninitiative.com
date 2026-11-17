<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { FeatureCard, Section, SectionHeading } from '$lib/components/sections';

	const fieldNotes = [
		{
			label: 'School group',
			badge: '01',
			title: 'A counselor opens a circle without asking students to explain everything at once.',
			body: 'The card prompts create enough structure for quiet students to participate without turning the room into a formal therapy session.',
			meta: 'Card Game · Guided circle'
		},
		{
			label: 'Recovery space',
			badge: '02',
			title: 'A weekly check-in becomes easier to repeat.',
			body: 'Mood tracking gives the team a shared language for patterns, triggers, and small shifts that might otherwise go unnoticed.',
			meta: 'Mood Tracker · Weekly rhythm'
		}
	];
</script>

<Section id="stories" class="scroll-mt-28">
	<SectionHeading
		eyebrow="What this makes possible"
		split
		description="DCI works best when it gives people a concrete way to begin: a prompt, a page, a check-in, or a trained person who knows how to hold the space responsibly."
	>
		{#snippet title()}Small tools, <em>real moments</em> of connection.{/snippet}
	</SectionHeading>

	<div class="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
		<article
			use:reveal={{ delay: 0, y: 22 }}
			class="relative flex min-h-[32rem] items-end overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-teal-deep p-6 text-dci-cream sm:p-8 lg:p-10"
		>
			<img
				src="/photos/champion-training-hero.webp"
				alt="A Community Champion training a group"
				loading="lazy"
				class="pointer-events-none absolute inset-0 h-full w-full object-cover"
			/>
			<div
				class="pointer-events-none absolute inset-0 bg-gradient-to-t from-dci-teal-deep via-dci-teal-deep/70 to-transparent"
			></div>
			<div class="relative max-w-lg">
				<p class="type-eyebrow text-dci-cream/75">Field note</p>
				<h3 class="type-title mt-4 text-dci-cream">
					Support feels less abstract when people can <em class="text-dci-clay">hold the next step.</em>
				</h3>
			</div>
		</article>

		<div class="flex flex-col gap-5">
			{#each fieldNotes as note, index (note.label)}
				<div use:reveal={{ delay: index * 90, y: 18 }}>
					<FeatureCard
						kicker={note.label}
						badge={note.badge}
						title={note.title}
						description={note.body}
						footerMeta={note.meta}
					/>
				</div>
			{/each}

			<Button href="/events" variant="outline" class="self-start">
				See clinics and community sessions
				<ArrowUpRightIcon weight="regular" />
			</Button>
		</div>
	</div>
</Section>
