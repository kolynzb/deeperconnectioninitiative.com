<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		text,
		tone = 'teal',
		class: className
	}: {
		text: string;
		tone?: 'teal' | 'burgundy' | 'cream';
		class?: string;
	} = $props();

	const toneClasses = {
		teal: 'text-dci-teal',
		burgundy: 'text-dci-burgundy',
		cream: 'text-dci-cream'
	};
</script>

<!-- Faded serif numeral behind the card's corner; decoration only. -->
<span
	aria-hidden="true"
	class={cn(
		'pointer-events-none absolute -top-5 right-3 z-0 font-serif text-[8.5rem] leading-none opacity-[0.06] select-none',
		toneClasses[tone],
		className
	)}
>
	{text}
</span>
