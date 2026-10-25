<script lang="ts">
	import { cn } from '$lib/utils';
	import { PlayIcon } from 'phosphor-svelte';

	// Responsive 16:9 YouTube embed. Shows the poster and a play button first, and only
	// loads the player (youtube-nocookie) once someone presses play, so the page does not
	// pull in YouTube's scripts for visitors who never watch.
	let {
		videoId,
		title,
		class: className
	}: { videoId: string; title: string; class?: string } = $props();

	let playing = $state(false);

	// Keyboard focus would otherwise fall to <body> when the button is replaced.
	function focusOnMount(node: HTMLElement) {
		node.focus();
	}
</script>

<div
	class={cn(
		'relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-dci-panel',
		className
	)}
	class:video-attract={!playing}
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
			<!-- Above the fold, so it loads eagerly. sddefault is 640px; hqdefault is
			     the fallback for videos that never had an SD thumbnail. -->
			<img
				src="https://i.ytimg.com/vi/{videoId}/sddefault.jpg"
				alt=""
				width="640"
				height="480"
				fetchpriority="high"
				onerror={(e) => {
					const img = e.currentTarget as HTMLImageElement;
					if (!img.src.includes('hqdefault')) img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
				}}
				class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
			/>
			<span class="absolute inset-0 bg-black/20 transition group-hover:bg-black/10"></span>
			<span
				class="play-ripple absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-dci-burgundy text-white shadow-lg transition group-hover:scale-110 sm:size-20"
			>
				<PlayIcon weight="fill" class="ml-1 size-7 sm:size-9" />
			</span>
		</button>
	{/if}
</div>

<style>
	/* Draws the eye on arrival: the box rises in, then a glow ring pulses out of it a few
	   times and settles. Finite on purpose: endless motion beside the headline needs a
	   pause control under WCAG 2.2.2 and repaints box-shadow every frame on phones.
	   No opacity in the rise, so the poster paints immediately. Only runs before play. */
	.video-attract {
		animation:
			video-rise 800ms cubic-bezier(0.2, 0.7, 0.2, 1) both,
			video-glow 2.4s ease-out 1.1s 4;
	}

	@keyframes video-rise {
		from {
			transform: translateY(18px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes video-glow {
		0% {
			box-shadow:
				0 28px 90px -60px rgba(0, 0, 0, 0.75),
				0 0 0 0 rgba(111, 35, 30, 0.45);
		}
		70%,
		100% {
			box-shadow:
				0 28px 90px -60px rgba(0, 0, 0, 0.75),
				0 0 0 22px rgba(111, 35, 30, 0);
		}
	}

	/* Two staggered rings spreading out from the play button, in step with the glow. */
	.play-ripple::before,
	.play-ripple::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		border: 2px solid rgba(255, 255, 255, 0.85);
		opacity: 0;
		pointer-events: none;
		animation: play-ripple 2.4s ease-out 1.1s 4;
	}

	.play-ripple::after {
		animation-delay: 2.3s;
	}

	@keyframes play-ripple {
		0% {
			transform: scale(1);
			opacity: 0.8;
		}
		100% {
			transform: scale(1.9);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.video-attract {
			animation: none;
		}
		.play-ripple::before,
		.play-ripple::after {
			animation: none;
		}
	}
</style>
