<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	// The site's only buttons. Every CTA is a pill in one of these variants and two
	// sizes; pass layout classes (w-full, mt-*) through class, never colours or sizes.
	export const buttonVariants = tv({
		base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				// Teal: the everyday primary action.
				default: 'bg-dci-teal-deep text-dci-cream hover:bg-dci-teal-mid',
				// Burgundy: the one spotlight action in a view.
				accent: 'bg-dci-burgundy text-dci-cream hover:bg-dci-burgundy/90',
				outline: 'border border-dci-teal-deep/25 text-dci-teal-deep hover:bg-dci-teal/5',
				// For dark (teal or burgundy) backgrounds.
				inverse: 'bg-dci-cream text-dci-teal-deep hover:bg-dci-paper',
				'inverse-outline': 'border border-dci-cream/40 text-dci-cream hover:bg-dci-cream/10',
				destructive: 'bg-destructive text-dci-cream hover:bg-destructive/90',
				secondary: 'bg-dci-cream text-foreground hover:bg-dci-paper',
				ghost: 'hover:bg-dci-teal/5',
				link: 'rounded-none text-dci-teal underline underline-offset-4 hover:text-dci-teal-deep'
			},
			size: {
				default: 'h-12 px-7 text-sm',
				sm: 'h-10 px-5 text-sm',
				// Kept so older call sites resolve; same as default.
				lg: 'h-12 px-7 text-sm',
				xl: 'h-12 px-7 text-sm',
				icon: 'size-10',
				'icon-sm': 'size-9',
				'icon-lg': 'size-12'
			}
		},
		compoundVariants: [{ variant: 'link', class: 'h-auto px-0' }],
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? 'link' : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
