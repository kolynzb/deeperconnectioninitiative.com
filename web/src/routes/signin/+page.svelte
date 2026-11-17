<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Field } from '$lib/components/ui/field';
	import { Section } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';

	// Accounts are not open yet - prevent the form from submitting (a plain
	// <form> with no method would GET, exposing the password in the URL).
	let notice = $state(false);
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		notice = true;
	}
</script>

<Section class="pt-44 lg:pt-52">
	<div class="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
		<div use:reveal={{ delay: 0, y: 18 }} class="space-y-6">
			<p class="type-eyebrow text-dci-teal">DCI access</p>
			<h1 class="type-headline max-w-lg text-foreground">Sign in to continue your DCI work.</h1>
			<p class="type-lede max-w-lg text-muted-foreground">
				Access profile details, training materials, toolkit resources, and community program
				follow-ups from one place.
			</p>
		</div>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="overflow-hidden rounded-2xl border border-dci-teal/15 bg-dci-paper"
		>
			<div class="m-2.5 mb-0 rounded-2xl border border-dci-teal/12 bg-dci-cream p-6 sm:p-8">
				<p class="type-eyebrow text-dci-teal">Welcome back</p>
				<h2 class="type-title mt-1.5 text-foreground">Use your email and password.</h2>
			</div>

			<form class="space-y-5 p-6 sm:p-8 lg:p-10" onsubmit={handleSubmit}>
				{#if notice}
					<p
						class="rounded-2xl border border-dci-teal/20 bg-dci-teal/5 px-4 py-3 text-sm text-dci-teal-deep"
						role="status"
					>
						Accounts aren't open yet. The DCI platform is coming soon.
						<a href="/platform" class="font-semibold underline underline-offset-4">Learn more</a>.
					</p>
				{/if}

				<Field
					appearance="inset"
					id="email"
					name="email"
					label="Email address"
					type="email"
					autocomplete="email"
					required
					placeholder="you@example.com"
				/>

				<Field
					appearance="inset"
					id="password"
					name="password"
					label="Password"
					type="password"
					autocomplete="current-password"
					required
					placeholder="Your password"
				/>

				<div
					class="-mx-6 -mb-6 flex flex-col gap-4 border-t border-dci-teal/12 bg-dci-cream/55 px-6 py-5 sm:-mx-8 sm:-mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:-mx-10 lg:-mb-10 lg:px-10"
				>
					<p class="text-sm text-muted-foreground">
						New here?
						<a href="/signup" class="font-semibold text-dci-teal underline underline-offset-4">
							Create a profile
						</a>
					</p>
					<Button type="submit">
						Sign in
						<ArrowUpRight weight="regular" />
					</Button>
				</div>
			</form>
		</div>
	</div>
</Section>
