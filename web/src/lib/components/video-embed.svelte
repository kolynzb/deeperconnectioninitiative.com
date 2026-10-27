<script lang="ts">
	import { cn } from '$lib/utils';
	import { PlayIcon } from 'phosphor-svelte';

	// Responsive 16:9 YouTube embed. Shows the poster and a play button first, and only
	// loads the player (youtube-nocookie) once someone presses play, so the page does not
	// pull in YouTube's scripts for visitors who never watch.
	let {
		videoId,
		title,
		poster,
		class: className
	}: { videoId: string; title: string; poster?: string; class?: string } = $props();

	let playing = $state(false);

	// Keyboard focus would otherwise fall to <body> when the button is replaced.
	function focusOnMount(node: HTMLElement) {
		node.focus();
	}
</script>

<div
	class={cn(
		'relative aspect-video w-full overflow-hidden rounded-2xl bg-dci-ink',
		className
	)}
>
	{#if playing}
		<iframe
			src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0"
			{title}
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			class="absolute inset-0 h-full w-full"
			use:focusOnMount
		></iframe>
	{:else}
		<button
			type="button"
			onclick={() => (playing = true)}
			class="group absolute inset-0 h-full w-full cursor-pointer"
			aria-label={`Play video: ${title}`}
		>
			<!-- Above the fold, so it loads eagerly. Without our own poster, YouTube's
			     sddefault (640px) is used, falling back to hqdefault for videos that
			     never had an SD thumbnail. -->
			<img
				src={poster ?? `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`}
				alt=""
				width="1100"
				height="733"
				fetchpriority="high"
				onerror={(e) => {
					const img = e.currentTarget as HTMLImageElement;
					if (!poster && !img.src.includes('hqdefault'))
						img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
				}}
				class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
			/>
			<span class="absolute inset-0 bg-dci-ink/20 transition group-hover:bg-dci-ink/10"></span>
			<span
				class="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-dci-cream text-dci-teal-deep transition group-hover:bg-dci-paper sm:size-20"
			>
				<PlayIcon weight="fill" class="ml-1 size-7 sm:size-9" />
			</span>
		</button>
	{/if}
</div>

