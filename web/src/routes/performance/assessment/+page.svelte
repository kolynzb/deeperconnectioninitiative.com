<script lang="ts">
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import Logo from '@/lib/components/layout/logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		facets,
		statements,
		scale,
		bandFor,
		bandLabels,
		interpretations,
		scoreAnswers,
		type FacetKey
	} from './assessment';

	let { form } = $props();

	// Flow: 'intro' → facet index 0..4 → 'lead-capture' → 'result'.
	type Step = 'intro' | 'lead-capture' | 'result' | { facetIndex: number };
	let step = $state<Step>('intro');

	let answers = $state<Record<string, number>>({});
	let name = $state('');
	let email = $state('');
	let role = $state('');
	let company = $state('');
	let submitting = $state(false);
	let scores = $state<Record<FacetKey, number> | null>(null);

	const totalSteps = facets.length + 2;
	let progress = $derived.by(() => {
		let position: number;
		if (step === 'intro') position = 0;
		else if (step === 'lead-capture') position = facets.length;
		else if (step === 'result') position = totalSteps;
		else position = step.facetIndex;
		return Math.round((position / totalSteps) * 100);
	});

	let facetIndex = $derived(typeof step === 'object' ? step.facetIndex : -1);
	let currentFacet = $derived(typeof step === 'object' ? facets[step.facetIndex] : null);
	let currentStatements = $derived(
		currentFacet ? statements.filter((s) => s.facet === currentFacet!.key) : []
	);
	let facetComplete = $derived(
		currentStatements.every((s) => typeof answers[s.id] === 'number')
	);

	function goToFacet(index: number) {
		if (index < 0) step = 'intro';
		else if (index >= facets.length) step = 'lead-capture';
		else step = { facetIndex: index };
	}

	// Serialized scores travel with the lead form so DCI gets the snapshot too.
	let scoresPayload = $derived(JSON.stringify(scoreAnswers(answers)));
</script>

<div class="flex min-h-screen flex-col bg-dci-cream">
	<!-- Minimal, distraction-free header for the assessment flow. -->
	<header class="border-b border-dci-teal/10">
		<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
			<Logo isLink />
			<span class="type-eyebrow text-dci-burgundy">Performance Blueprint™</span>
		</div>
	</header>

	<!-- Progress bar (hidden on the intro screen). -->
	{#if step !== 'intro'}
		<div class="h-1 w-full bg-dci-teal/10">
			<div
				class="h-full bg-dci-burgundy transition-all duration-500 ease-out"
				style={`width:${progress}%`}
			></div>
		</div>
	{/if}

	<main class="flex flex-1 flex-col items-center px-4 py-14 sm:px-6 sm:py-20">
		<!-- Intro -->
		{#if step === 'intro'}
			<div in:fade={{ duration: 300 }} class="mx-auto max-w-2xl text-center">
				<p class="type-eyebrow text-dci-burgundy">The Blueprint Assessment</p>
				<h1 class="type-headline mt-5 text-foreground">
					Discover the hidden patterns shaping your performance.
				</h1>
				<p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
					Free. About 10 minutes. Twenty short statements across five facets of how you operate: how
					you think, recover, decide, communicate, and lead under pressure. At the end, you'll get a
					personal Blueprint snapshot to keep.
				</p>
				<Button variant="accent" onclick={() => goToFacet(0)} class="mt-10">Begin</Button>
				<p class="mx-auto mt-9 max-w-md text-sm leading-relaxed text-muted-foreground">
					This is a reflection tool, not a clinical assessment. If you're struggling, DCI can point
					you to real support.
				</p>
			</div>

			<!-- Facet questions -->
		{:else if typeof step === 'object' && currentFacet}
			{#key facetIndex}
				<div in:fade={{ duration: 250 }} class="mx-auto w-full max-w-2xl">
					<p class="type-eyebrow text-dci-burgundy">Facet {facetIndex + 1} of {facets.length}</p>
					<h2 class="type-title mt-3 text-foreground">
						{currentFacet.label}
					</h2>

					<div class="mt-10 space-y-10">
						{#each currentStatements as statement (statement.id)}
							<div>
								<p class="text-lg leading-relaxed text-foreground">{statement.prompt}</p>
								<div class="mt-4 flex gap-2">
									{#each scale as option (option.value)}
										<button
											type="button"
											aria-label={option.label}
											onclick={() => (answers = { ...answers, [statement.id]: option.value })}
											aria-pressed={answers[statement.id] === option.value}
											class={`flex h-10 flex-1 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
												answers[statement.id] === option.value
													? 'border-dci-burgundy bg-dci-burgundy text-dci-cream'
													: 'border-dci-teal/15 text-muted-foreground hover:border-dci-burgundy/40'
											}`}
										>
											{option.value}
										</button>
									{/each}
								</div>
								<div class="mt-2 flex justify-between text-xs text-muted-foreground">
									<span>{scale[0].label}</span>
									<span>{scale[scale.length - 1].label}</span>
								</div>
							</div>
						{/each}
					</div>

					<div class="mt-12 flex items-center justify-between">
						<Button variant="link" onclick={() => goToFacet(facetIndex - 1)}>← Back</Button>
						<Button
							variant="accent"
							disabled={!facetComplete}
							onclick={() => goToFacet(facetIndex + 1)}
						>
							Next
						</Button>
					</div>
				</div>
			{/key}

			<!-- Lead capture -->
		{:else if step === 'lead-capture'}
			<div in:fade={{ duration: 250 }} class="mx-auto w-full max-w-md text-center">
				<p class="type-eyebrow text-dci-burgundy">Almost there</p>
				<h2 class="type-title mt-3 text-foreground">
					Save your Blueprint and get your results.
				</h2>
				<p class="mt-4 text-base leading-relaxed text-muted-foreground">
					We'll send you a copy and show you your personal snapshot right now.
				</p>

				<form
					method="POST"
					class="mt-8 space-y-3 text-left"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							// Compute and reveal results regardless of email delivery.
							scores = scoreAnswers(answers);
							await update({ reset: false });
							submitting = false;
							step = 'result';
						};
					}}
				>
					<!-- Honeypot -->
					<input
						autocomplete="off"
						name="company_url"
						type="text"
						tabindex="-1"
						aria-hidden="true"
						class="hidden"
					/>
					<input type="hidden" name="scores" value={scoresPayload} />

					<input
						bind:value={name}
						name="name"
						type="text"
						autocomplete="name"
						required
						placeholder="Your name"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>
					<input
						bind:value={email}
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="you@email.com"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>
					<input
						bind:value={role}
						name="role"
						type="text"
						placeholder="Role (optional)"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>
					<input
						bind:value={company}
						name="company"
						type="text"
						placeholder="Company (optional)"
						class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:ring-4 focus:ring-dci-teal/10"
					/>

					{#if form?.errors?.email}
						<p class="text-sm text-dci-burgundy">{form.errors.email}</p>
					{/if}
					{#if form?.errors?.name}
						<p class="text-sm text-dci-burgundy">{form.errors.name}</p>
					{/if}

					<Button type="submit" variant="accent" disabled={submitting} class="mt-2 w-full">
						{submitting ? 'Preparing your Blueprint...' : 'Show my results'}
					</Button>
				</form>

				<Button variant="link" onclick={() => goToFacet(facets.length - 1)} class="mt-6">
					← Back
				</Button>
			</div>

			<!-- Result -->
		{:else if step === 'result' && scores}
			<div in:fade={{ duration: 300 }} class="mx-auto w-full max-w-2xl">
				<div class="text-center">
					<p class="type-eyebrow text-dci-burgundy">Your Blueprint snapshot</p>
					<h2 class="type-title mt-3 text-foreground">
						Here's how your system currently operates.
					</h2>
				</div>

				<div class="mt-12 space-y-6">
					{#each facets as facet (facet.key)}
						{@const value = scores[facet.key]}
						{@const band = bandFor(value)}
						<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8">
							<div class="flex items-start justify-between gap-4">
								<h3 class="type-subtitle text-foreground">{facet.label}</h3>
								<span class="type-eyebrow text-dci-teal">{bandLabels[band]}</span>
							</div>
							<div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-dci-teal/10">
								<div
									class="h-full rounded-full bg-dci-burgundy"
									style={`width:${(value / 5) * 100}%`}
								></div>
							</div>
							<p class="mt-4 text-sm leading-relaxed text-muted-foreground">
								{interpretations[facet.key][band]}
							</p>
						</div>
					{/each}
				</div>

				<div
					class="mt-14 rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 text-center sm:p-8"
				>
					<p class="type-subtitle text-foreground">This is the map.</p>
					<p class="type-subtitle text-foreground">Coaching is where you redesign it.</p>
					<Button href="/performance#tiers" class="mt-6">
						Explore coaching
						<ArrowUpRight weight="regular" />
					</Button>
				</div>

				<p class="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
					This is a reflection tool, not a clinical assessment. If you're struggling, DCI can point
					you to real support.
				</p>
			</div>
		{/if}
	</main>
</div>
