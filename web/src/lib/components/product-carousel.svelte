<script lang="ts">
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		images,
		alt,
		interval = 4200,
		showDots = true,
		class: className = ''
	}: {
		images: string[];
		alt: string;
		interval?: number;
		showDots?: boolean;
		class?: string;
	} = $props();

	let index = $state(0);
	// Broken images are dropped rather than shown as empty frames.
	const failed = new SvelteSet<number>();

	const usable = $derived(images.map((_, i) => i).filter((i) => !failed.has(i)));

	function onError(i: number) {
		failed.add(i);
		if (index === i && usable.length) index = usable[0];
	}

	function show(i: number) {
		index = i;
	}

	onMount(() => {
		// Rotation is skipped under reduced motion and in background tabs.
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

		const timer = setInterval(() => {
			if (motion.matches || document.visibilityState !== 'visible') return;
			if (usable.length < 2) return;
			index = usable[(usable.indexOf(index) + 1) % usable.length];
		}, interval);
		return () => clearInterval(timer);
	});
</script>

<div class={`relative overflow-hidden bg-dci-cream ${className}`}>
	{#each images as src, i (src)}
		<img
			{src}
			alt={i === index ? alt : ''}
			aria-hidden={i === index ? undefined : 'true'}
			loading="lazy"
			onerror={() => onError(i)}
			class="absolute inset-0 h-full w-full object-contain p-1 transition-opacity duration-700 ease-in-out"
			style:opacity={i === index ? 1 : 0}
		/>
	{/each}

	{#if showDots && usable.length > 1}
		<!-- Clickable, so the other photos are reachable even when auto-rotation
		     is off for reduced motion or a background tab. -->
		<div class="absolute inset-x-0 bottom-1 flex justify-center gap-1.5">
			{#each usable as i (i)}
				<button
					type="button"
					onclick={() => show(i)}
					aria-label={`Show photo ${usable.indexOf(i) + 1} of ${usable.length}`}
					aria-current={i === index ? 'true' : undefined}
					class="group flex h-4 items-center px-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dci-teal"
				>
					<span
						class={`h-1 rounded-full transition-all duration-300 ${
							i === index
								? 'w-3 bg-dci-teal-deep/70'
								: 'w-1 bg-dci-teal-deep/25 group-hover:bg-dci-teal-deep/50'
						}`}
					></span>
				</button>
			{/each}
		</div>
	{/if}
</div>
