<script lang="ts">
	import { cn } from '$lib/utils';
	import { CheckIcon } from 'phosphor-svelte';

	export type CardStepItem =
		| string
		| {
				label: string;
				detail?: string;
				done?: boolean;
		  };

	let {
		steps = [],
		tone = 'teal',
		class: className
	}: {
		steps: readonly CardStepItem[];
		tone?: 'teal' | 'burgundy' | 'dark';
		class?: string;
	} = $props();
</script>

<ol
	class={cn(
		'divide-y border-t',
		tone === 'dark'
			? 'divide-dci-cream/15 border-dci-cream/15'
			: tone === 'burgundy'
				? 'divide-dci-burgundy/15 border-dci-burgundy/15'
				: 'divide-dci-teal/12 border-dci-teal/12',
		className
	)}
>
	{#each steps as raw, idx (idx)}
		{@const item = typeof raw === 'string' ? { label: raw, done: true } : raw}
		<li class="flex items-start gap-3.5 py-3 text-sm leading-snug">
			<span
				class={cn(
					'dci-pebble mt-0.5 flex size-6 shrink-0 items-center justify-center text-xs font-semibold',
					tone === 'dark'
						? 'bg-dci-cream/15 text-dci-cream'
						: tone === 'burgundy'
							? 'bg-dci-blush text-dci-burgundy'
							: 'bg-dci-mist text-dci-teal-deep'
				)}
				aria-hidden="true"
			>
				{#if item.done !== false}
					<CheckIcon class="size-3.5" weight="bold" />
				{:else}
					0{idx + 1}
				{/if}
			</span>
			<div class="min-w-0 flex-1">
				<p
					class={cn(
						'font-medium',
						tone === 'dark' ? 'text-dci-cream' : 'text-foreground'
					)}
				>
					{item.label}
				</p>
				{#if item.detail}
					<p
						class={cn(
							'mt-0.5 text-xs leading-relaxed',
							tone === 'dark' ? 'text-dci-cream/75' : 'text-muted-foreground'
						)}
					>
						{item.detail}
					</p>
				{/if}
			</div>
		</li>
	{/each}
</ol>
