<script lang="ts">
	// Header lockup. Pass compact from the compact-header observer.
	let {
		compact = false,
		href = '/',
		showWord = true
	}: { compact?: boolean; href?: string; showWord?: boolean } = $props();
</script>

<a {href} class={`dci-mark${compact ? ' is-compact' : ''}`} aria-label="DCI Wellness, home">
	<span class="dci-mark__head">
		<img class="dci-mark__img" src="/photos/dci-mark-2026.webp" width="128" height="128" alt="" />
	</span>
	{#if showWord}
		<span class="dci-mark__words">
			<span class="dci-mark__word">DCI Wellness</span>
			<span class="dci-mark__sub">Deeper Connection Initiative</span>
		</span>
	{/if}
</a>
