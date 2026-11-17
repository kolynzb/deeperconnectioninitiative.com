<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

	let {
		appearance = 'inset',
		label,
		id,
		hint,
		error,
		multiline = false,
		rows = 4,
		value = $bindable(''),
		ref = $bindable<HTMLInputElement | HTMLTextAreaElement | undefined>(undefined),
		class: className,
		inputClass,
		children,
		...restProps
	}: {
		appearance?: 'inset' | 'contour' | 'editorial';
		label?: string;
		id?: string;
		hint?: string;
		error?: string;
		multiline?: boolean;
		rows?: number;
		value?: string;
		ref?: HTMLInputElement | HTMLTextAreaElement | undefined;
		class?: string;
		inputClass?: string;
		children?: Snippet;
	} & Omit<HTMLInputAttributes & HTMLTextareaAttributes, 'value'> = $props();
</script>

{#if appearance === 'inset'}
	<div class={cn('space-y-1.5', className)}>
		<label
			for={id}
			class={cn(
				// v-igroup: inside a `use:fieldGlide` form, Cojeev's fill glides to the focused well.
				'v-igroup group flex flex-col rounded-2xl border border-dci-teal/15 bg-dci-cream/85 px-4 py-3 transition focus-within:border-dci-teal/50 focus-within:bg-transparent',
				error && 'border-dci-burgundy/45 focus-within:border-dci-burgundy'
			)}
		>
			{#if label}
				<span class="type-eyebrow text-dci-teal transition group-focus-within:text-dci-teal-deep">
					{label}
				</span>
			{/if}
			{#if children}
				<div class="mt-1">
					{@render children()}
				</div>
			{:else if multiline}
				<textarea
					bind:this={ref}
					bind:value
					{id}
					{rows}
					class={cn(
						'mt-1.5 w-full resize-y bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground',
						inputClass
					)}
					{...restProps}
				></textarea>
			{:else}
				<input
					bind:this={ref}
					bind:value
					{id}
					class={cn(
						'mt-1 h-7 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground',
						inputClass
					)}
					{...restProps}
				/>
			{/if}
		</label>
		{#if error}
			<p class="px-1 text-xs font-medium text-dci-burgundy">{error}</p>
		{:else if hint}
			<p class="px-1 text-xs text-muted-foreground">{hint}</p>
		{/if}
	</div>
{:else if appearance === 'editorial'}
	<div class={cn('space-y-1.5', className)}>
		<label for={id} class="dci-field-editorial block border-b border-dci-teal/25 pb-2.5">
			{#if label}
				<span class="type-eyebrow block text-dci-teal">{label}</span>
			{/if}
			{#if children}
				<div class="mt-1.5">
					{@render children()}
				</div>
			{:else if multiline}
				<textarea
					bind:this={ref}
					bind:value
					{id}
					{rows}
					class={cn(
						'mt-1.5 w-full resize-y bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground',
						inputClass
					)}
					{...restProps}
				></textarea>
			{:else}
				<input
					bind:this={ref}
					bind:value
					{id}
					class={cn(
						'mt-1.5 h-8 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground',
						inputClass
					)}
					{...restProps}
				/>
			{/if}
		</label>
		{#if error}
			<p class="text-xs font-medium text-dci-burgundy">{error}</p>
		{:else if hint}
			<p class="text-xs text-muted-foreground">{hint}</p>
		{/if}
	</div>
{:else}
	<div class={cn('space-y-2', className)}>
		{#if label}
			<label for={id} class="block text-sm font-semibold text-foreground">{label}</label>
		{/if}
		{#if children}
			{@render children()}
		{:else if multiline}
			<textarea
				bind:this={ref}
				bind:value
				{id}
				{rows}
				class={cn(
					'w-full rounded-2xl border border-dci-teal/15 bg-dci-paper p-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10',
					inputClass
				)}
				{...restProps}
			></textarea>
		{:else}
			<input
				bind:this={ref}
				bind:value
				{id}
				class={cn(
					'h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10',
					inputClass
				)}
				{...restProps}
			/>
		{/if}
		{#if error}
			<p class="text-xs font-medium text-dci-burgundy">{error}</p>
		{:else if hint}
			<p class="text-xs text-muted-foreground">{hint}</p>
		{/if}
	</div>
{/if}
