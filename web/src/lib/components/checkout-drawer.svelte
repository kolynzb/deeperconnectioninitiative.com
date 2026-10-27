<script lang="ts">
	import { Dialog } from 'bits-ui';
	import {
		XIcon as X,
		LockSimpleIcon as LockSimple,
		ShieldCheckIcon as ShieldCheck
	} from 'phosphor-svelte';

	export type DrawerProduct = { slug: string; name: string; price: string };

	let { product = $bindable<DrawerProduct | null>(null) }: { product?: DrawerProduct | null } =
		$props();

	let emailField: HTMLInputElement | undefined = $state();
	let submitting = $state(false);

	// Dialog handles the focus trap, scroll lock, Escape, and returning focus to
	// the Buy button that opened it.
	function onOpenChange(open: boolean) {
		if (!open) {
			product = null;
			submitting = false;
		}
	}
</script>

<!-- Coming back from Flutterwave restores this page from the back/forward cache
     with the button still disabled, so reset it. -->
<svelte:window onpageshow={(e) => e.persisted && (submitting = false)} />

<Dialog.Root open={product !== null} {onOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-[80] bg-dci-ink/45 backdrop-blur-sm" />
		<!--
			The form posts natively to the product's own checkout action, which
			redirects straight to Flutterwave. That keeps the buyer on this page until
			the payment page itself, and still works with JavaScript disabled.
		-->
		<Dialog.Content
			onOpenAutoFocus={(e) => {
				e.preventDefault();
				emailField?.focus();
			}}
			class="fixed inset-x-0 bottom-0 z-[80] mx-auto w-full max-w-md rounded-t-4xl border border-dci-teal/15 bg-dci-cream p-6 shadow-dci-overlay sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-4xl sm:p-8"
		>
			{#if product}
				<Dialog.Close
					aria-label="Close"
					class="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-dci-teal/8 hover:text-foreground"
				>
					<X class="size-4" weight="bold" />
				</Dialog.Close>

				<p class="text-xs font-semibold uppercase tracking-wide text-dci-teal">Secure checkout</p>
				<Dialog.Title class="mt-2 pr-10 text-2xl font-semibold leading-tight text-foreground">
					{product.name}
				</Dialog.Title>
				<p class="mt-2 text-2xl font-bold text-dci-teal-deep">{product.price}</p>

				<form
					method="POST"
					action={`/checkout/${product.slug}`}
					class="mt-6 space-y-4"
					onsubmit={() => (submitting = true)}
				>
					<input
						autocomplete="off"
						name="company"
						type="text"
						tabindex="-1"
						aria-hidden="true"
						class="hidden"
					/>

					<div class="space-y-2">
						<label for="drawer-email" class="text-sm font-semibold text-foreground">
							Email for your receipt
						</label>
						<input
							bind:this={emailField}
							id="drawer-email"
							name="email"
							type="email"
							autocomplete="email"
							required
							placeholder="you@example.com"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
					</div>

					<button
						type="submit"
						disabled={submitting}
						class="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-dci-teal-deep text-sm font-semibold text-dci-cream transition hover:bg-dci-teal-mid active:scale-[0.99] disabled:opacity-70"
					>
						<LockSimple class="size-4" weight="bold" />
						{submitting ? 'Taking you to payment…' : `Pay ${product.price}`}
					</button>

					<p class="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
						<ShieldCheck class="size-4 shrink-0 text-dci-teal" weight="duotone" />
						Mobile Money or card, on Flutterwave's secure page.
					</p>
				</form>
			{/if}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
