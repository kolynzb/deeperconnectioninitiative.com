<script lang="ts">
	import { cn } from '@/lib/utils';
	import Button, { buttonVariants } from '../../ui/button/button.svelte';
	import AnimateSvg from '@/lib/components/animate-svg.svelte';
	import { reveal } from '@/lib/actions/reveal';
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let animationCtx: gsap.Context | undefined;

	onMount(() => {
		if (!browser) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		animationCtx = gsap.context(() => {
			// Input stream: flows right-to-left (text flowing into the head)
			// Two textPaths offset by 50% for seamless looping coverage
			gsap.to('#input-text-1', {
				attr: { startOffset: '-100%' },
				duration: 28,
				ease: 'none',
				repeat: -1
			});
			gsap.to('#input-text-2', {
				attr: { startOffset: '-50%' },
				duration: 28,
				ease: 'none',
				repeat: -1
			});

			// Output stream: flows left (away from the head)
			gsap.to('#output-text-1', {
				attr: { startOffset: '100%' },
				duration: 25,
				ease: 'none',
				repeat: -1
			});
			gsap.to('#output-text-2', {
				attr: { startOffset: '150%' },
				duration: 25,
				ease: 'none',
				repeat: -1
			});
		});

		return () => {
			animationCtx?.revert();
		};
	});
</script>

<section class="relative w-full overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-8">
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

		<div class="grid w-full max-w-xl grid-cols-3 gap-3 pt-4 text-xs text-foreground/70">
			<div class="border-t border-primary/25 pt-3">Community-rooted</div>
			<div class="border-t border-accent/25 pt-3">Offline-first</div>
			<div class="border-t border-foreground/20 pt-3">Trauma-aware</div>
		</div>
	</div>

	<!-- Animation container — built in Task 2 -->
	<div
		class="mx-auto mt-12 max-w-5xl lg:mt-16"
		use:reveal={{ delay: 200, y: 30 }}
	>
		<div class="relative aspect-[12/7] w-full">
			<svg
				viewBox="0 0 1200 700"
				class="h-full w-full"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
			>
				<defs>
					<!-- Input path: curves from right edge into the back of the head -->
					<path
						id="input-path"
						d="M1250 480 C1100 380, 1000 280, 880 260 C780 245, 720 300, 670 350"
						fill="none"
					/>
					<!-- Output path: curves from the face outward to the left -->
					<path
						id="output-path"
						d="M530 320 C470 280, 400 250, 320 260 C220 275, 120 340, -50 400"
						fill="none"
					/>

					<!-- Mask for input text: visible on right, fades near head -->
					<linearGradient id="input-fade" x1="100%" y1="0%" x2="40%" y2="0%">
						<stop offset="0%" stop-color="white" />
						<stop offset="70%" stop-color="white" />
						<stop offset="100%" stop-color="black" />
					</linearGradient>
					<mask id="input-mask">
						<rect x="0" y="0" width="1200" height="700" fill="url(#input-fade)" />
					</mask>

					<!-- Mask for output text: fades near head, visible on left -->
					<linearGradient id="output-fade" x1="0%" y1="0%" x2="60%" y2="0%">
						<stop offset="0%" stop-color="white" />
						<stop offset="30%" stop-color="white" />
						<stop offset="100%" stop-color="black" />
					</linearGradient>
					<mask id="output-mask">
						<rect x="0" y="0" width="1200" height="700" fill="url(#output-fade)" />
					</mask>

					<!-- Glow behind the head -->
					<radialGradient id="head-glow" cx="50%" cy="45%" r="35%">
						<stop offset="0%" stop-color="#2A6268" stop-opacity="0.12" />
						<stop offset="60%" stop-color="#F6ECD9" stop-opacity="0.06" />
						<stop offset="100%" stop-color="#F6ECD9" stop-opacity="0" />
					</radialGradient>
				</defs>

				<!-- Subtle glow behind the head -->
				<ellipse cx="600" cy="340" rx="280" ry="260" fill="url(#head-glow)" />

				<!-- Head motif -->
				<image
					href="/photos/head-motif.png"
					x="430"
					y="60"
					width="340"
					height="480"
					preserveAspectRatio="xMidYMid meet"
				/>

				<!-- Input stream (bad thoughts) -->
				<g mask="url(#input-mask)">
					<text
						font-family="'Outfit', sans-serif"
						font-weight="600"
						font-size="22"
						fill="#6F231E"
						fill-opacity="0.7"
					>
						<textPath
							id="input-text-1"
							href="#input-path"
							startOffset="0%"
						>
							stress &#x2022; anxiety &#x2022; isolation &#x2022; burnout &#x2022; I can't cope &#x2022; why me &#x2022; not sleeping &#x2022; always busy &#x2022;
						</textPath>
					</text>
					<text
						font-family="'Outfit', sans-serif"
						font-weight="600"
						font-size="22"
						fill="#6F231E"
						fill-opacity="0.7"
					>
						<textPath
							id="input-text-2"
							href="#input-path"
							startOffset="50%"
						>
							stress &#x2022; anxiety &#x2022; isolation &#x2022; burnout &#x2022; I can't cope &#x2022; why me &#x2022; not sleeping &#x2022; always busy &#x2022;
						</textPath>
					</text>
				</g>

				<!-- Output stream (good thoughts) -->
				<g mask="url(#output-mask)">
					<text
						font-family="'Outfit', sans-serif"
						font-weight="500"
						font-size="22"
						fill="#2A6268"
					>
						<textPath
							id="output-text-1"
							href="#output-path"
							startOffset="0%"
						>
							clarity &#x2022; connection &#x2022; hope &#x2022; belonging &#x2022; I'm not alone &#x2022; healing &#x2022; supported &#x2022; seen &#x2022;
						</textPath>
					</text>
					<text
						font-family="'Outfit', sans-serif"
						font-weight="500"
						font-size="22"
						fill="#2A6268"
					>
						<textPath
							id="output-text-2"
							href="#output-path"
							startOffset="50%"
						>
							clarity &#x2022; connection &#x2022; hope &#x2022; belonging &#x2022; I'm not alone &#x2022; healing &#x2022; supported &#x2022; seen &#x2022;
						</textPath>
					</text>
				</g>
			</svg>
		</div>
	</div>
</section>
