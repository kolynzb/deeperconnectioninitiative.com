<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<!--
	The homepage's last word before the footer: the hero's two actions again.
	Burgundy and inset, so it never runs into the teal footer below.
-->
<section class="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
	<div
		class="mx-auto max-w-6xl rounded-4xl bg-dci-burgundy px-6 py-16 text-center text-dci-cream sm:px-10 lg:py-24"
		use:reveal={{ delay: 0, y: 18 }}
	>
		<h2 class="mx-auto max-w-3xl text-5xl leading-[1.04] font-normal tracking-tight text-balance sm:text-6xl">
			Ready to <em class="text-dci-clay">start talking?</em>
		</h2>
		<p class="mx-auto mt-6 max-w-lg text-base leading-relaxed text-dci-cream/75 sm:text-lg">
			Get a toolkit for yourself, or put one in the hands of someone who can't buy their own.
		</p>
		<div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
			<a
				href="/toolkit#toolkit-products"
				class="inline-flex h-12 items-center justify-center rounded-full bg-dci-cream px-8 text-sm font-semibold text-dci-burgundy transition hover:bg-dci-paper active:scale-[0.98]"
			>
				Buy a toolkit
			</a>
			<a
				href="/checkout/donate"
				class="inline-flex h-12 items-center justify-center rounded-full border border-dci-cream/40 px-8 text-sm font-semibold text-dci-cream transition hover:bg-dci-cream/10 active:scale-[0.98]"
			>
				Sponsor a toolkit
			</a>
		</div>
	</div>
</section>
