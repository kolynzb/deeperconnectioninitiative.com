<script lang="ts">
	import { ArrowUpRightIcon as ArrowUpRight } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button';
	import { reveal } from '$lib/actions/reveal';
	import { PageHero, Section, SectionHeading, CtaBand } from '$lib/components/sections';

	const does = [
		{
			title: 'Run Conversation Clinics',
			description:
				'Peer-led wellness meetups in your community, school, or organisation. No clinician required, just a trained Champion and the toolkit.'
		},
		{
			title: 'Monitor mood data',
			description:
				'Read patterns across your community and get a quiet alert when something needs attention, before it becomes a crisis.'
		},
		{
			title: 'Hold space that matters',
			description:
				'Create room for the honest conversations most groups never have the structure to start.'
		}
	];

	// The four certification modules. Details stay to what DCI already says about
	// clinics, the Mood Tracker and Connection Miles elsewhere on the site.
	const modules = [
		{
			title: 'How to run a Conversation Clinic from start to finish',
			body: 'Setting up a small group, letting a card from the DCI game open the conversation, and closing so people leave with something practical.'
		},
		{
			title: 'How to read the Mood Tracker and Early Warning System signals',
			body: 'Reading patterns across your community, and knowing what a quiet alert means when something needs attention, before it becomes a crisis.'
		},
		{
			title: 'How to hold space without needing to be a clinician',
			body: 'Making room for honest conversations where nobody is put on the spot and listening counts as taking part. Clinics are peer-led; they are not therapy.'
		},
		{
			title: 'How Connection Miles work, and how yours compound as your community grows',
			body: 'Facilitating a clinic earns 5 miles. Every clinic you run, and every person you train, keeps adding to them.'
		}
	];
</script>

<PageHero
	eyebrow="Community Champions"
	title="Become the infrastructure in your community."
	description="A certified DCI facilitator trained through the Training of Trainers program to run clinics, hold space, and monitor mood data across their community."
>
	{#snippet actions()}
		<Button href="/contact?topic=Community%20Champion%20application"
			>Apply for the next cohort</Button
		>
		<Button href="/trainings" variant="outline">See training tiers</Button>
	{/snippet}
	{#snippet aside()}
		<img
			src="/photos/champion-training-hero.webp"
			alt="A Community Champion training a room of young people"
			class="aspect-[4/3] w-full rounded-4xl object-cover"
		/>
	{/snippet}
</PageHero>

<Section>
	<SectionHeading
		eyebrow="Training of Trainers"
		title="One certified Champion changes the texture of a whole community."
		description="The certification is a single program: what you will do as a Champion, and the four modules that prepare you for it."
	/>

	<div class="mt-12 grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
		<!-- The program card: price up top, the job underneath. -->
		<article
			use:reveal={{ delay: 0, y: 18 }}
			class="overflow-hidden rounded-4xl border border-dci-teal/15 bg-dci-paper lg:sticky lg:top-28 lg:col-span-5"
		>
			<div class="bg-dci-teal-deep p-6 text-dci-cream sm:p-8">
				<p class="type-eyebrow text-dci-cream/75">Champion certification</p>
				<p class="mt-3 font-serif text-5xl leading-none sm:text-6xl">UGX 500,000</p>
				<p class="mt-3 text-sm text-dci-cream/75">
					Per person · one certified Champion · 50+ compounding miles
				</p>
			</div>

			<div class="p-6 sm:p-8">
				<p class="type-eyebrow text-dci-teal">What a Champion does</p>
				<ul class="mt-3 divide-y divide-dci-teal/15">
					{#each does as item (item.title)}
						<li class="py-4">
							<p class="text-base font-semibold text-foreground">{item.title}</p>
							<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
								{item.description}
							</p>
						</li>
					{/each}
				</ul>
				<Button href="/contact?topic=Community%20Champion%20application" class="mt-6 w-full">
					Apply for the next cohort
				</Button>
			</div>
		</article>

		<!-- The modules, numbered, each opening to say what it covers. -->
		<div use:reveal={{ delay: 120, y: 18 }} class="lg:col-span-7">
			<p class="type-eyebrow text-dci-teal">What the certification covers</p>
			<ol class="mt-3 divide-y divide-dci-teal/15 border-y border-dci-teal/15">
				{#each modules as module, index (module.title)}
					<li>
						<details class="group" open={index === 0}>
							<summary
								class="grid cursor-pointer list-none grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 py-6 [&::-webkit-details-marker]:hidden"
							>
								<span class="font-serif text-3xl leading-none text-dci-teal/60">
									0{index + 1}
								</span>
								<span class="type-subtitle text-foreground">{module.title}</span>
								<span
									aria-hidden="true"
									class="grid size-8 place-items-center self-center rounded-full border border-dci-teal/20 text-dci-teal transition-transform group-open:rotate-45"
									>+</span
								>
							</summary>
							<p class="-mt-2 pb-6 pl-[4.5rem] text-base leading-relaxed text-muted-foreground">
								{module.body}
							</p>
						</details>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</Section>

<CtaBand
	eyebrow="Ready to lead?"
	title="Apply to the next Community Champion cohort."
	description="You don't just help one person, you change the texture of a whole community. And your miles keep compounding as it grows."
>
	{#snippet actions()}
		<Button href="/contact?topic=Community%20Champion%20application" variant="inverse">
			Submit application
			<ArrowUpRight class="size-4" weight="regular" />
		</Button>
	{/snippet}
</CtaBand>
