<script lang="ts">
	import { paymentLinks } from '$lib/payment-links';
	import { Button } from '$lib/components/ui/button';
	import { FeatureCard, PageHero, Section } from '$lib/components/sections';
	import { reveal } from '$lib/actions/reveal';

	const ecosystemData = [
		{
			title: 'DCI Offline Toolkit',
			subtitle: 'Physical Tools & Guides',
			description:
				'Journal + Mood tracker + Conversation cards. Low-tech, high-impact tools for daily reflection and community conversation.'
		},
		{
			title: 'Digital Wellness Library',
			subtitle: 'Self-Led Learning',
			description:
				'Short, low-data learning modules building emotional literacy and coping skills for self-led mental wellbeing.'
		},
		{
			title: 'Conversation Clinics',
			subtitle: 'Wellness Meet-ups',
			description:
				'Facilitated peer-support spaces for storytelling and reflection to reduce isolation using the DCI card-game.'
		},
		{
			title: 'Community Champions',
			subtitle: "Partner Trainings (T.O.T's)",
			description:
				'Training local leaders to use DCI tools, fostering emotional safety and community support without professional reliance.'
		},
		{
			title: 'Program Design',
			subtitle: 'Implementation Support',
			description:
				'Helping organizations design and implement sustainable mental wellness programs grounded in cultural context.'
		},
		{
			title: 'DCI Angels',
			subtitle: 'Volunteer Squad',
			description:
				'Volunteers supporting wellness through monthly missions via community outreaches in everyday spaces.'
		},
		{
			title: 'Provider Network',
			subtitle: 'Mental Health Services',
			description:
				'Responsible referral options for professional support, complementing self-led and community-based approaches.'
		},
		{
			title: 'Connection Miles',
			subtitle: 'Venue Partners',
			description:
				'Transform your venue into a certified wellness hub. Drive traffic. Build community impact. Create recurring revenue.'
		}
		// {
		// 	title: 'Support Access',
		// 	subtitle: 'Sponsor a Toolkit',
		// 	description:
		// 		'10% of each toolkit sold funds community champion trainings and toolkit donations via monthly missions.'
		// }
	];

	const layers = [
		{
			title: 'Tools layer',
			description: 'Physical toolkits and digital resources that make self-reflection accessible.'
		},
		{
			title: 'Conversation layer',
			description:
				'Facilitated clinics and trained champions turning individual awareness into group support.'
		},
		{
			title: 'Referral layer',
			description: 'Responsible pathways to professional care when community support is not enough.'
		}
	];
</script>

<PageHero
	eyebrow="The DCI Ecosystem"
	description="DCI exists to shift mental health from a passive service model to an active, self-led journey."
>
	{#snippet title()}Built for the places care <em>already happens.</em>{/snippet}
	{#snippet actions()}
		<Button href={paymentLinks.donation} target="_blank" rel="noopener noreferrer">
			Sponsor a toolkit
		</Button>
		<p class="max-w-xs self-center text-sm leading-relaxed text-muted-foreground">
			10% of each toolkit sold funds community champion trainings and donations.
		</p>
	{/snippet}
	{#snippet aside()}
		<p class="type-lede text-muted-foreground">
			DCI is to mental health what Airbnb is to hospitality: we don't provide the support directly.
			We build what community support runs on.
		</p>
		<div class="mt-10 grid gap-6 sm:grid-cols-3">
			{#each layers as layer (layer.title)}
				<div class="border-t border-dci-teal/25 pt-4">
					<p class="type-eyebrow text-dci-teal">{layer.title}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.description}</p>
				</div>
			{/each}
		</div>
	{/snippet}
</PageHero>

<Section id="about" class="pt-0 lg:pt-0">
	<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
		{#each ecosystemData as item, index (item.title)}
			<li use:reveal={{ delay: index * 55, y: 18 }}>
				<FeatureCard kicker={item.subtitle} title={item.title} description={item.description} />
			</li>
		{/each}
	</ul>
</Section>
