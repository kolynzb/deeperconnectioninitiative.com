<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '@/lib/actions/reveal';

	let svg: SVGSVGElement;
	// SMIL marquees ignore CSS, so stop them in script for reduced motion.
	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) svg.pauseAnimations();
	});

	// Worries drift in from the left and disappear into the head; good thoughts
	// come out the other side along the band. Both lines start or end at the
	// head, so the head never sits on top of a readable word.
	//
	// HEAD_CY is the single source of truth: the head is centred on it and both
	// lines meet it there.
	const HEAD_CX = 1000;
	const HEAD_CY = 215;
	const HEAD_SIZE = 360;

	// The head does not sit in the middle of its own PNG: crown at row 63 and
	// neck at row 361 of dci-mark-2026.png, so its centre is 0.424 down the frame.
	const HEAD_CENTRE_FRAC = 0.424;

	const BAND_W = 64;

	// Out of the head and straight off to the right.
	const GOOD_PATH = `M ${HEAD_CX} ${HEAD_CY} L 2300 ${HEAD_CY}`;
	// One gentle wave in from the left, levelling out into the head.
	const BAD_PATH = `M -300 110 C 100 40, 380 330, 640 260 C 800 216, 880 ${HEAD_CY}, ${HEAD_CX} ${HEAD_CY}`;

	const badPhrase =
		'stress · a way through · isolation · someone noticed · always busy · one honest hour · not sleeping · a place to start · ';
	const goodPhrase =
		'clarity · connection · hope · belonging · healing · supported · seen · I’m not alone · ';

	const badText = badPhrase.repeat(12);
	const goodText = goodPhrase.repeat(12);
</script>

<section
	class="dci-thoughts relative w-full overflow-hidden"
	aria-label="What people carry in, and what they carry out"
	use:reveal={{ delay: 0, y: 24 }}
>
	<!--
		preserveAspectRatio slice: on narrow screens the composition crops at the
		sides instead of shrinking, so the head stays a readable size and the band
		stays legible. xMid keeps the head centred while it crops.
	-->
	<svg
		bind:this={svg}
		class="dci-thoughts__svg"
		viewBox="0 0 2000 420"
		preserveAspectRatio="xMidYMid slice"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<path id="dci-curve-bad" d={BAD_PATH} fill="none" />
			<path id="dci-curve-good" d={GOOD_PATH} fill="none" />
		</defs>

		<!-- 1. Bad thoughts, furthest back -->
		<g class="dci-thoughts__bad">
			<text x="-6000">
				<textPath href="#dci-curve-bad">{badText}</textPath>
				<animate attributeName="x" dur="44s" values="-6000; 0" repeatCount="indefinite" />
			</text>
		</g>

		<!-- 2. The strip, flat along HEAD_CY, behind the head -->
		<path d={GOOD_PATH} fill="none" stroke="#1A3C40" stroke-width={BAND_W} stroke-linecap="butt" />
		<g class="dci-thoughts__good">
			<text x="-7000">
				<textPath href="#dci-curve-good">{goodText}</textPath>
				<animate attributeName="x" dur="54s" values="-7000; 0" repeatCount="indefinite" />
			</text>
		</g>

		<!-- 3. The head, in front, so the face is never covered -->
		<image
			href="/photos/dci-mark-2026.png"
			x={HEAD_CX - HEAD_SIZE / 2}
			y={HEAD_CY - HEAD_SIZE * HEAD_CENTRE_FRAC}
			width={HEAD_SIZE}
			height={HEAD_SIZE}
			preserveAspectRatio="xMidYMid meet"
		/>
	</svg>
</section>

<style>
	.dci-thoughts {
		/* Height drives how much of the 2000 unit width is visible. */
		height: clamp(150px, 17vw, 250px);
	}

	.dci-thoughts__svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* Worries: ghostly, thin */
	.dci-thoughts__bad text {
		font-family: var(--font-sans);
		font-size: 40px;
		font-weight: 300;
		fill: #1a3c40;
		fill-opacity: 0.4;
		dominant-baseline: central;
	}

	/* Good thoughts: serif italic in cream, riding the strip */
	.dci-thoughts__good text {
		font-family: var(--font-serif);
		font-size: 40px;
		font-style: italic;
		font-weight: 400;
		fill: #f6ecd9;
		dominant-baseline: central;
	}

</style>
