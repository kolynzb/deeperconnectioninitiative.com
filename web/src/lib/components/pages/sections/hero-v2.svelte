<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
	import { reveal } from '@/lib/actions/reveal';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const badPhrase =
		'stress \u00b7 anxiety \u00b7 isolation \u00b7 burnout \u00b7 why me \u00b7 not sleeping \u00b7 always busy \u00b7 can\u2019t cope \u00b7 ';
	const goodPhrase =
		'clarity \u00b7 connection \u00b7 hope \u00b7 belonging \u00b7 healing \u00b7 supported \u00b7 seen \u00b7 I\u2019m not alone \u00b7 ';

	const badText = badPhrase.repeat(8);
	const goodText = goodPhrase.repeat(8);

	let svgEl: SVGSVGElement | undefined;

	onMount(() => {
		if (!browser || !svgEl) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		const ctx = gsap.context(() => {
			// Input stream: path goes head→right, scrolling x 0→-5000
			// makes text visually flow from right toward the head
			gsap.fromTo(
				'#input-text',
				{ attr: { x: 0 } },
				{ attr: { x: -5000 }, duration: 55, ease: 'none', repeat: -1 }
			);

			// Output stream: path goes left→head, scrolling x 0→-5000
			// makes text visually flow from head toward the left
			gsap.fromTo(
				'#output-text',
				{ attr: { x: 0 } },
				{ attr: { x: -5000 }, duration: 50, ease: 'none', repeat: -1 }
			);
		}, svgEl);

		return () => {
			ctx.revert();
		};
	});
</script>

<section
	class="relative w-full overflow-hidden px-4 pt-32 pb-0 sm:px-6 lg:px-8 lg:pt-40 lg:pb-0"
>
	<div class="pointer-events-none absolute top-28 left-0 hidden w-[42vw] opacity-45 lg:block">
		<AnimateSvg
			width="100%"
			height="100%"
			viewBox="0 0 560 240"
			path="M8 70 C112 16, 178 206, 272 142 C343 93, 374 36, 452 58 C500 72, 529 110, 552 155"
			strokeColor="oklch(0.35 0.12 25 / 0.48)"
			strokeWidth={3}
			strokeLinecap="round"
			animationDuration={1.8}
		/>
	</div>

	<div
		class="mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center"
		use:reveal={{ delay: 0, y: 18 }}
	>
		<div
			class="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1"
		>
			<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
			<span class="text-xs font-semibold tracking-tight text-accent">Own your healing</span>
		</div>

		<div class="space-y-5">
			<h1
				class="text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
			>
				Tools that put healing back in
				<span class="relative inline-block pb-3 text-accent sm:pb-4">
					your hands
					<span
						class="pointer-events-none absolute -bottom-1 left-[-0.04em] h-[0.32em] w-[108%] sm:-bottom-1.5"
					>
						<AnimateSvg
							width="100%"
							height="100%"
							viewBox="0 0 340 42"
							paths={[
								{
									d: 'M10 25 C58 34, 117 34, 169 28 C216 22, 267 19, 328 25',
									stroke: 'oklch(0.35 0.12 25)',
									strokeWidth: 5,
									strokeLinecap: 'round'
								},
								{
									d: 'M18 31 C76 38, 132 37, 184 31 C230 26, 278 26, 319 31',
									stroke: 'oklch(0.35 0.12 25 / 0.42)',
									strokeWidth: 2.5,
									strokeLinecap: 'round'
								}
							]}
							strokeLinecap="round"
							staggerDelay={0.12}
							animationDuration={1.25}
						/>
					</span>
				</span>
			</h1>

			<p class="mx-auto max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
				A mental health initiative helping people build emotional strength through tactile
				toolkits, guided reflection, storytelling, and community connection.
			</p>
		</div>

		<div class="flex flex-col justify-center gap-3 sm:flex-row">
			<Button href="#toolkit" class={cn(buttonVariants({ size: 'lg' }), 'bg-primary px-7')}>
				Buy or sponsor a toolkit
			</Button>

			<Button
				href="#ecosystem"
				class={cn(
					buttonVariants({ variant: 'outline', size: 'lg' }),
					'border-primary/30 bg-transparent px-7 text-primary hover:bg-primary/5'
				)}
			>
				Explore the ecosystem
			</Button>
		</div>
	</div>

	<!-- Flowing thoughts animation — directly below buttons, no gap -->
	<div class="mx-auto mt-6 w-full max-w-6xl lg:mt-8" use:reveal={{ delay: 200, y: 30 }}>
		<div class="relative w-full" style="aspect-ratio: 1200 / 600;">
			<svg
				bind:this={svgEl}
				viewBox="0 0 1200 600"
				class="h-full w-full overflow-visible"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
			>
				<defs>
					<!-- Glow behind the head -->
					<radialGradient id="head-glow" cx="50%" cy="42%" r="25%">
						<stop offset="0%" stop-color="#2A6268" stop-opacity="0.18" />
						<stop offset="50%" stop-color="#F6ECD9" stop-opacity="0.08" />
						<stop offset="100%" stop-color="#F6ECD9" stop-opacity="0" />
					</radialGradient>
				</defs>

				<!-- INPUT PATH: head → upper-right (text reads naturally left-to-right).
				     Dramatic sweeping arc from head area up and out to the right. -->
				<path
					id="input-path"
					d="M580 260 C620 240, 680 200, 760 180 C860 155, 960 170, 1060 220 C1160 270, 1260 360, 1400 440"
					fill="none"
					stroke="#6F231E"
					stroke-width="1.5"
					stroke-opacity="0.1"
				/>

				<!-- OUTPUT PATH visual band: thick dark stroke creates the ribbon effect -->
				<path
					d="M-300 420 C-150 400, 0 380, 120 350 C260 315, 380 290, 480 275 C540 266, 570 262, 600 260"
					fill="none"
					stroke="#1A3C40"
					stroke-width="42"
					stroke-linecap="round"
					stroke-opacity="0.92"
				/>

				<!-- OUTPUT PATH: left → head (reversed for natural text direction) -->
				<path
					id="output-path"
					d="M-300 420 C-150 400, 0 380, 120 350 C260 315, 380 290, 480 275 C540 266, 570 262, 600 260"
					fill="none"
					stroke="none"
				/>

				<!-- Subtle glow behind the head -->
				<ellipse cx="590" cy="260" rx="180" ry="180" fill="url(#head-glow)" />

				<!-- Input stream: bad thoughts (thin, ghostly, burgundy) -->
				<text
					id="input-text"
					x="0"
					font-family="'Outfit', sans-serif"
					font-weight="500"
					font-size="28"
					fill="#6F231E"
					fill-opacity="0.4"
				>
					<textPath href="#input-path">{badText}</textPath>
				</text>

				<!-- Output stream: good thoughts (white on dark band) -->
				<text
					id="output-text"
					x="0"
					font-family="'Outfit', sans-serif"
					font-weight="600"
					font-size="28"
					fill="#F6ECD9"
					fill-opacity="0.95"
				>
					<textPath href="#output-path">{goodText}</textPath>
				</text>

				<!-- Head icon (no circle clip — mix-blend-mode removes white bg) -->
				<image
					href="/photos/head-icon.jpg"
					x="480"
					y="130"
					width="220"
					height="260"
					preserveAspectRatio="xMidYMid meet"
					style="mix-blend-mode: multiply;"
				/>
			</svg>
		</div>
	</div>
</section>
