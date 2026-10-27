<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon } from 'phosphor-svelte';

	const fieldNotes = [
		{
			label: 'School group',
			title: 'A counselor opens a circle without asking students to explain everything at once.',
			body: 'The card prompts create enough structure for quiet students to participate without turning the room into a formal therapy session.'
		},
		{
			label: 'Recovery space',
			title: 'A weekly check-in becomes easier to repeat.',
			body: 'Mood tracking gives the team a shared language for patterns, triggers, and small shifts that might otherwise go unnoticed.'
		}
	];
</script>

<section id="stories" class="relative scroll-mt-28 overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
	<div class="mx-auto max-w-7xl">
		<div class="mb-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
			<div class="space-y-4" use:reveal={{ delay: 0, y: 18 }}>
				<div
					class="inline-flex items-center rounded-full border border-dci-teal/20 bg-dci-teal/5 px-3 py-1"
				>
					<span class="text-xs font-semibold uppercase tracking-wide text-dci-teal">
						What this makes possible
					</span>
				</div>
				<h2 class="max-w-3xl text-5xl sm:text-6xl font-normal tracking-tight leading-[1.04] text-balance text-foreground">
					Small tools, <em class="text-dci-burgundy">real moments</em> of connection.
				</h2>
			</div>
			<p
				use:reveal={{ delay: 100, y: 18 }}
				class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
			>
				DCI works best when it gives people a concrete way to begin: a prompt, a page, a
				check-in, or a trained person who knows how to hold the space responsibly.
			</p>
		</div>

		<div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
			<article
				use:reveal={{ delay: 0, y: 22 }}
				class="relative min-h-[34rem] overflow-hidden rounded-4xl bg-dci-teal-deep p-6 text-dci-cream shadow-dci-panel sm:p-8 lg:p-10"
			>
				<img
					src="/photos/champion-training-hero.jpg"
					alt="A Community Champion training a group"
					loading="lazy"
					class="pointer-events-none absolute inset-0 h-full w-full object-cover"
				/>
				<div
					class="pointer-events-none absolute inset-0 bg-gradient-to-t from-dci-teal-deep via-dci-teal-deep/85 to-dci-teal-deep/10"
				></div>
				<div class="relative z-10 flex min-h-[30rem] max-w-xl flex-col justify-end">
					<div>
						<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">
							Field note
						</p>
						<h3 class="mt-4 max-w-lg text-4xl font-normal leading-[1.04] tracking-tight text-dci-cream sm:text-5xl">
							Support feels less abstract when people can <em class="text-dci-clay">hold the next step.</em>
						</h3>
					</div>

					<div class="mt-10 grid gap-3 border-t border-dci-cream/15 pt-6 sm:grid-cols-3">
						<div>
							<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">Before</p>
							<p class="mt-2 text-sm leading-relaxed text-dci-cream/72">
								People know something feels heavy.
							</p>
						</div>
						<div>
							<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">During</p>
							<p class="mt-2 text-sm leading-relaxed text-dci-cream/72">
								A card, page, or trained guide gives the moment shape.
							</p>
						</div>
						<div>
							<p class="text-xs font-semibold uppercase tracking-wide text-dci-cream/70">After</p>
							<p class="mt-2 text-sm leading-relaxed text-dci-cream/72">
								The next support step becomes easier to name.
							</p>
						</div>
					</div>
				</div>
			</article>

			<div class="grid gap-5">
				{#each fieldNotes as note, index (note.label)}
					<article
						use:reveal={{ delay: index * 90, y: 18 }}
						class="dci-soft-hover rounded-4xl border border-dci-teal/12 bg-dci-cream p-6 shadow-dci-lift"
					>
						<p class="mb-4 text-xs font-semibold uppercase tracking-wide text-dci-teal">{note.label}</p>
						<h3 class="text-2xl font-normal leading-tight text-foreground">{note.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
					</article>
				{/each}

				<a
					href="/events"
					use:reveal={{ delay: 280, y: 18 }}
					class="group flex items-center justify-between gap-4 rounded-4xl border border-dci-burgundy/15 bg-dci-paper/75 p-6 text-dci-teal-deep transition hover:bg-dci-cream"
				>
					<span>
						<span class="block text-sm font-semibold uppercase tracking-wide text-dci-burgundy">
							See it in practice
						</span>
						<span class="mt-2 block font-serif text-2xl leading-tight text-foreground">
							Clinics, demos, and community sessions
						</span>
					</span>
					<ArrowUpRightIcon
						class="size-5 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						weight="regular"
					/>
				</a>
			</div>
		</div>
	</div>
</section>
