<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import {
		CheckCircleIcon as CheckCircle,
		WarningCircleIcon as WarningCircle,
		ArrowCounterClockwiseIcon as ArrowCounterClockwise
	} from 'phosphor-svelte';

	let { data } = $props();

	const formatUgx = (n: number) => `${n.toLocaleString('en-US')} UGX`;
</script>

<svelte:head>
	<title>Payment status | DCI Wellness</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="relative overflow-hidden pt-28">
	<div class="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
		<div
			class="relative overflow-hidden rounded-4xl border border-dci-teal/12 bg-dci-cream p-8 text-center sm:p-12"
		>
			{#if data.state === 'success'}
				<CheckCircle class="mx-auto size-16 text-dci-teal" weight="duotone" />
				<h1 class="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					Payment received. Thank you.
				</h1>
				<p class="mt-4 text-base leading-relaxed text-muted-foreground">
					{#if data.productName}
						Your payment for <span class="font-semibold text-foreground">{data.productName}</span>
						{#if data.amount}({formatUgx(data.amount)}){/if} went through successfully.
					{:else}
						Your payment went through successfully.
					{/if}
					A confirmation from Flutterwave is on its way to your email. We will follow up with the
					next steps shortly.
				</p>
				{#if data.txRef}
					<p class="mt-3 text-xs text-muted-foreground">Reference: {data.txRef}</p>
				{/if}
				<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Button href="/">Back to home</Button>
					<Button href="/toolkit" variant="outline">
						Explore the toolkit
					</Button>
				</div>
			{:else if data.state === 'cancelled'}
				<ArrowCounterClockwise class="mx-auto size-16 text-muted-foreground" weight="duotone" />
				<h1 class="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					Payment cancelled
				</h1>
				<p class="mt-4 text-base leading-relaxed text-muted-foreground">
					No charge was made. You can pick up where you left off whenever you are ready.
				</p>
				<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Button href="/toolkit">Back to the toolkit</Button>
					<Button href="/contact" variant="outline">
						Need help? Contact us
					</Button>
				</div>
			{:else}
				<WarningCircle class="mx-auto size-16 text-dci-burgundy" weight="duotone" />
				<h1 class="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					We could not confirm your payment
				</h1>
				<p class="mt-4 text-base leading-relaxed text-muted-foreground">
					If money left your account, do not worry: it is safe with the payment provider and we
					will reconcile it. Please contact us with your reference below and we will sort it out.
				</p>
				{#if data.txRef}
					<p class="mt-3 text-xs text-muted-foreground">Reference: {data.txRef}</p>
				{/if}
				<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Button href="/contact">Contact us</Button>
					<Button href="/" variant="outline">Back to home</Button>
				</div>
			{/if}
		</div>
	</div>
</section>
