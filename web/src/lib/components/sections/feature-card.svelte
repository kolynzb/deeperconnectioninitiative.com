<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		icon: Icon,
		kicker,
		title,
		description,
		accent = '#2A6268',
		class: className,
		children
	}: {
		icon?: any;
		kicker?: string;
		title: string;
		description?: string;
		accent?: string;
		class?: string;
		children?: import('svelte').Snippet;
	} = $props();
</script>

<article
	class={cn(
		'flex h-full flex-col rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8',
		className
	)}
>
	{#if Icon}
		<div
			class="mb-6 flex size-11 items-center justify-center rounded-full bg-dci-teal/8"
			style={`color:${accent}`}
		>
			<Icon class="size-5" weight="regular" aria-hidden="true" />
		</div>
	{/if}
	{#if kicker}
		<p class="type-eyebrow mb-2 text-dci-teal">{kicker}</p>
	{/if}
	<h3 class="type-subtitle text-foreground">{title}</h3>
	{#if description}
		<p class="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>
	{/if}
	{#if children}
		<div class="mt-5">
			{@render children()}
		</div>
	{/if}
</article>
