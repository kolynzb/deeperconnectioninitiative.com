<script lang="ts">
	import { enhance } from '$app/forms';
	import { flowGroup, fieldGlide } from '$lib/actions/flow';
	import { Button } from '@/lib/components/ui/button';
	import { Field } from '$lib/components/ui/field';
	import { LockSimpleIcon as LockSimple, ShieldCheckIcon as ShieldCheck } from 'phosphor-svelte';

	let { data, form } = $props();
	let submitting = $state(false);

	const donationPresets = [20_000, 69_000, 200_000];
	let donationAmount = $state('');

	const formatUgx = (n: number) => `${n.toLocaleString('en-US')} UGX`;
</script>

<svelte:head>
	<title>Checkout: {data.product.name} | DCI Wellness</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto w-full max-w-xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="relative overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-paper">
			<!-- Recessed Cojeev product summary cover -->
			<div
				class="m-2.5 mb-0 space-y-3 rounded-2xl border border-dci-teal/12 bg-dci-cream p-6 sm:p-8"
			>
				<p class="type-eyebrow text-dci-teal">Secure checkout</p>
				<h1 class="type-title text-foreground">
					{data.product.name}
				</h1>
				<p class="text-base leading-relaxed text-muted-foreground">{data.product.description}</p>

				{#if data.clinicDateLabel}
					<!-- Confirms exactly which session is being paid for, before payment. -->
					<div class="rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 py-3">
						<p class="type-eyebrow text-dci-teal">You are booking</p>
						<p class="mt-1 font-serif text-xl leading-tight text-foreground">
							{data.clinicDateLabel}
						</p>
						<p class="mt-1 text-sm text-muted-foreground">{data.clinicVenue}</p>
					</div>
				{/if}

				{#if data.product.amount !== null}
					<p class="pt-1 font-serif text-3xl text-dci-teal-deep">
						{formatUgx(data.product.amount)}
					</p>
				{/if}
			</div>

			<div class="p-6 sm:p-8">
				{#if form?.errors?.form}
					<div
						class="mb-6 rounded-2xl border border-dci-burgundy/25 bg-dci-burgundy/8 px-5 py-4 text-sm text-dci-burgundy"
						role="alert"
					>
						{form.errors.form}
					</div>
				{/if}

				<form
					use:fieldGlide
					class="space-y-5"
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
				>
					<input
						autocomplete="off"
						name="company"
						type="text"
						tabindex="-1"
						aria-hidden="true"
						class="hidden"
					/>

					{#if data.clinicDate}
						<input type="hidden" name="date" value={data.clinicDate} />
					{/if}

					{#if data.product.amount === null}
						<div class="space-y-3">
							<span class="type-eyebrow block text-dci-teal">Choose an amount (UGX)</span>
							<div
								use:flowGroup
								class="inline-flex flex-wrap gap-1.5 rounded-full border border-dci-teal/15 bg-dci-cream p-1"
							>
								{#each donationPresets as preset}
									{@const active = donationAmount === String(preset)}
									<button
										type="button"
										aria-pressed={active}
										class="relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors {active
											? 'text-dci-cream'
											: 'text-foreground'}"
										onclick={() => (donationAmount = String(preset))}
									>
										{preset.toLocaleString('en-US')}
									</button>
								{/each}
							</div>

							<Field
								appearance="inset"
								id="amount"
								name="amount"
								label="Amount in UGX"
								type="text"
								inputmode="numeric"
								required
								bind:value={donationAmount}
								aria-invalid={form?.errors?.amount ? 'true' : undefined}
								error={form?.errors?.amount}
								placeholder="Enter amount in UGX"
							/>
						</div>
					{/if}

					<!-- svelte-ignore a11y_autofocus -- single-purpose checkout page; the email field is the page's one task -->
					<Field
						appearance="inset"
						id="email"
						name="email"
						label="Email for your receipt"
						type="email"
						autocomplete="email"
						required
						autofocus
						value={form?.values?.email ?? ''}
						aria-invalid={form?.errors?.email ? 'true' : undefined}
						error={form?.errors?.email}
						placeholder="you@example.com"
					/>

					<Button type="submit" disabled={submitting} class="w-full">
						<LockSimple class="size-4" weight="bold" />
						{submitting
							? 'Preparing payment…'
							: data.product.amount !== null
								? `Pay ${formatUgx(data.product.amount)}`
								: 'Continue to payment'}
					</Button>

					<p
						class="flex items-center justify-center gap-2 text-sm leading-relaxed text-muted-foreground"
					>
						<ShieldCheck class="size-4 shrink-0 text-dci-teal" weight="duotone" />
						Mobile Money or card, on Flutterwave's secure page.
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
