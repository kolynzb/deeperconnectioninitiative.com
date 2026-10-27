<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Section } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';
	import {
		ArrowUpRightIcon as ArrowUpRight,
		EnvelopeIcon as Mail,
		UserCircleIcon as UserRound
	} from 'phosphor-svelte';

	// Accounts are not open yet - prevent the form from submitting (a plain
	// <form> with no method would GET, exposing entered fields in the URL).
	let notice = $state(false);
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		notice = true;
	}
</script>

<Section class="pt-44 lg:pt-52">
	<div class="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
		<div use:reveal={{ delay: 0, y: 18 }} class="space-y-6">
			<p class="type-eyebrow text-dci-teal">Join DCI</p>
			<h1 class="type-headline max-w-lg text-foreground">Create your DCI Wellness profile.</h1>
			<p class="type-lede max-w-lg text-muted-foreground">
				Use this when you are joining as a Champion, volunteer, partner, or toolkit supporter. We
				will connect your profile to the right DCI pathway.
			</p>
		</div>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:p-10"
		>
			<div class="mb-8 space-y-3">
				<p class="type-eyebrow text-dci-teal">Account details</p>
				<h2 class="type-title text-foreground">Start with your basic information.</h2>
			</div>

			<form class="space-y-6" onsubmit={handleSubmit}>
				{#if notice}
					<p class="rounded-2xl border border-dci-teal/20 bg-dci-teal/5 px-4 py-3 text-sm text-dci-teal-deep" role="status">
						Accounts aren't open yet. The DCI platform is coming soon. <a href="/platform" class="font-semibold underline underline-offset-4">Learn more</a>.
					</p>
				{/if}

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="name" class="text-sm font-semibold text-foreground">Full name</label>
						<div class="relative">
							<UserRound class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dci-teal" weight="regular" aria-hidden="true" />
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								required
								placeholder="Your name"
								class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper pl-11 pr-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							/>
						</div>
					</div>
					<div class="space-y-2">
						<label for="email" class="text-sm font-semibold text-foreground">Email address</label>
						<div class="relative">
							<Mail class="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dci-teal" weight="regular" aria-hidden="true" />
							<input
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								required
								placeholder="you@example.com"
								class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper pl-11 pr-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
							/>
						</div>
					</div>
				</div>

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="password" class="text-sm font-semibold text-foreground">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="new-password"
							required
							placeholder="Create a password"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
					</div>
					<div class="space-y-2">
						<label for="pathway" class="text-sm font-semibold text-foreground">Pathway</label>
						<select
							id="pathway"
							name="pathway"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						>
							<option>Community Champion</option>
							<option>Volunteer</option>
							<option>Venue Partner</option>
							<option>Provider Network</option>
							<option>Sponsor</option>
						</select>
					</div>
				</div>

				<div class="flex flex-col gap-4 border-t border-dci-teal/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-sm text-muted-foreground">
						Already have a profile? <a href="/signin" class="font-semibold text-dci-teal underline underline-offset-4">Sign in</a>
					</p>
					<Button type="submit">
						Create profile
						<ArrowUpRight weight="regular" />
					</Button>
				</div>
			</form>
		</div>
	</div>
</Section>
