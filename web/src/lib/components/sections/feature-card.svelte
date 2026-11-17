<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import {
		Card,
		CardCover,
		CardFooter,
		CardStepList,
		type CardStepItem
	} from '$lib/components/ui/card';

	let {
		kicker,
		badge,
		title,
		description,
		appearance = 'editorial',
		tone = 'paper',
		coverTint,
		steps,
		footerMeta,
		class: className,
		cover,
		footer,
		children
	}: {
		kicker?: string;
		badge?: string;
		title: string;
		description?: string;
		appearance?: 'editorial' | 'project' | 'collection';
		tone?: 'paper' | 'cream' | 'dark';
		coverTint?: 'cream' | 'mist' | 'blush' | 'oat' | 'dark';
		steps?: readonly CardStepItem[];
		footerMeta?: string;
		class?: string;
		cover?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	} = $props();
</script>

<Card {appearance} {tone} class={className}>
	{#if cover}
		<CardCover tint={coverTint ?? 'cream'}>
			{@render cover()}
		</CardCover>
	{:else if kicker || badge}
		<div
			class={cn(
				'flex items-center justify-between gap-3 border-b px-6 py-3.5 sm:px-8',
				tone === 'dark'
					? 'border-dci-cream/15 bg-dci-ink/20'
					: 'border-dci-teal/10 bg-dci-cream/60'
			)}
		>
			{#if kicker}
				<p class={cn('type-eyebrow', tone === 'dark' ? 'text-dci-cream/80' : 'text-dci-teal')}>
					{kicker}
				</p>
			{:else}
				<span></span>
			{/if}
			{#if badge}
				<span
					class={cn(
						'dci-pebble inline-flex size-8 shrink-0 items-center justify-center font-serif text-sm',
						tone === 'dark'
							? 'bg-dci-cream/15 text-dci-cream'
							: 'bg-dci-mist text-dci-teal-deep'
					)}
				>
					{badge}
				</span>
			{/if}
		</div>
	{/if}

	<div class="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
		<h3 class={cn('type-subtitle', tone === 'dark' ? 'text-dci-cream' : 'text-foreground')}>
			{title}
		</h3>
		{#if description}
			<p
				class={cn(
					'mt-3 text-base leading-relaxed',
					tone === 'dark' ? 'text-dci-cream/75' : 'text-muted-foreground'
				)}
			>
				{description}
			</p>
		{/if}
		{#if steps && steps.length > 0}
			<CardStepList
				{steps}
				tone={tone === 'dark' ? 'dark' : 'teal'}
				class="mt-5"
			/>
		{/if}
		{#if children}
			<div class="mt-5">
				{@render children()}
			</div>
		{/if}
	</div>

	{#if footer || footerMeta}
		<CardFooter meta={footerMeta} tone={tone === 'dark' ? 'dark' : 'light'}>
			{@render footer?.()}
		</CardFooter>
	{/if}
</Card>
