<script lang="ts">
	import { cn } from '$lib/utils';

	// A small uppercase label above a heading. Plain text: no pill, no icon.
	let {
		label,
		tone = 'light',
		class: className
	}: {
		label: string;
		/** Kept for older call sites; eyebrows no longer show icons. */
		icon?: unknown;
		tone?: 'light' | 'dark';
		class?: string;
	} = $props();
</script>

<p class={cn('type-eyebrow', tone === 'dark' ? 'text-dci-cream/75' : 'text-dci-teal', className)}>
	{label}
</p>
