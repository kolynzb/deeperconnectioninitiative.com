<script lang="ts">
	import { Dialog } from 'bits-ui';
	import {
		XIcon as X,
		LockSimpleIcon as LockSimple,
		ShieldCheckIcon as ShieldCheck
	} from 'phosphor-svelte';
	import { Field } from '$lib/components/ui/field';

	export type DrawerProduct = { slug: string; name: string; price: string };

	let { product = $bindable<DrawerProduct | null>(null) }: { product?: DrawerProduct | null } =
		$props();

	let emailField: HTMLInputElement | HTMLTextAreaElement | undefined = $state();
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
			class="fixed inset-x-0 bottom-0 z-[80] mx-auto w-full max-w-md rounded-t-4xl border border-dci-teal/15 bg-dci-paper p-6 shadow-dci-overlay sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-4xl sm:p-8"
		>
			{#if product}
				<Dialog.Close
					aria-label="Close"
					class="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-dci-teal/8 hover:text-foreground"
				>
					<X class="size-4" weight="bold" />
				</Dialog.Close>

				<!-- Recessed Cojeev product summary header -->
				<div class="rounded-2xl border border-dci-teal/12 bg-dci-cream p-5 pr-12">
					<p class="type-eyebrow text-dci-teal">Secure checkout</p>
					<Dialog.Title class="mt-1.5 font-serif text-2xl leading-tight text-foreground">
						{product.name}
					</Dialog.Title>
					<p class="mt-2 font-serif text-3xl text-dci-teal-deep">{product.price}</p>
				</div>

				<form
					method="POST"
					action={`/checkout/${product.slug}`}
					class="mt-5 space-y-4"
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

					<Field
						bind:ref={emailField}
						appearance="inset"
						id="drawer-email"
						label="Email for your receipt"
						name="email"
						type="email"
						autocomplete="email"
						required
						placeholder="you@example.com"
					/>

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
