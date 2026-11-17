<script lang="ts">
	import { fieldGlide, flowGroup } from '$lib/actions/flow';
	import { enhance } from '$app/forms';
	import { Button } from '@/lib/components/ui/button';
	import { Field } from '$lib/components/ui/field';
	import { PageHero, Section, SectionHeading } from '@/lib/components/sections';
	import { CLINIC_END, CLINIC_PRICE_UGX, CLINIC_START, CLINIC_VENUE } from '$lib/clinics';
	import { toolkitProducts } from '$lib/toolkit-products';
	import { reveal } from '@/lib/actions/reveal';
	import { siteConfig } from '@/lib/config/site';

	let { form } = $props();
	let submitting = $state(false);
	import { page } from '$app/state';

	const supportPaths = [
		'Toolkit purchase or sponsorship',
		'Performance Blueprint application',
		'Community clinic or event',
		'Community Champion application',
		'Partner training',
		'Provider network',
		'Volunteer inquiry'
	];

	// CTAs across the site link here with ?topic= and ?about= so the form
	// arrives already knowing what the visitor wants.
	const topicParam = $derived(page.url.searchParams.get('topic') ?? '');
	const aboutParam = $derived(page.url.searchParams.get('about') ?? '');
	const pick = (t: string | null) => (t && supportPaths.includes(t) ? t : supportPaths[0]);
	let topic = $state(pick(page.url.searchParams.get('topic')));
	// An effect, not a one-off read, so same-page ?topic= links also switch it.
	$effect(() => {
		topic = pick(topicParam);
	});

	// Answers only restate what the rest of the site already says (clinics,
	// toolkit, trainings, platform, partners, terms and privacy pages).
	const faqTopics = [
		{
			id: 'clinics',
			title: 'Clinics',
			faqs: [
				{
					q: 'When and where are the clinics?',
					a: `On the last Wednesday of every month, ${CLINIC_START} to ${CLINIC_END}, at ${CLINIC_VENUE}.`
				},
				{
					q: 'How much is a seat?',
					a: `${CLINIC_PRICE_UGX.toLocaleString('en-US')} UGX per seat, including the session. Pay by Mobile Money or card. Seats are limited.`
				},
				{
					q: 'Is a clinic therapy?',
					a: 'No. Conversation Clinics are peer-led. They are not therapy and do not replace care from a professional.'
				},
				{
					q: 'Can you run a clinic for our group?',
					a: "Yes. If you're bringing a group, or want a clinic at your school, workplace, or venue, choose \u201cCommunity clinic or event\u201d in the form above."
				}
			]
		},
		{
			id: 'toolkit',
			title: 'Toolkit',
			faqs: [
				{
					q: 'What is in the toolkit?',
					a: 'The DCI Card Game, Reflection Journal, and Mood Tracker. The complete kit bundles all three with QR access, for personal and group support.'
				},
				{
					q: 'What does each tool cost?',
					a: toolkitProducts.map((p) => `${p.name}: ${p.price}`).join('. ') + '.'
				},
				{
					q: 'How do I pay?',
					a: "Payments are processed by Flutterwave. You pay by Mobile Money or card on Flutterwave's secure page, and DCI does not store your card details."
				},
				{
					q: 'Can I sponsor a kit for someone else?',
					a: 'Yes. Choose \u201cSponsor a kit\u201d on the Toolkit page. Sponsoring one complete kit earns 10 Connection Miles. For questions about an order, refund, or sponsorship, write to us at the email on this page.'
				}
			]
		},
		{
			id: 'trainings',
			title: 'Trainings & Champions',
			faqs: [
				{
					q: 'What does Champion certification cost?',
					a: 'The Foundation Level, the Community Champion Certification, is UGX 500,000 per person.'
				},
				{
					q: 'Are there other certification levels?',
					a: 'Yes. The Advanced Level (Institutional Scale Certification) is UGX 1,500,000, and Master Trainer (Certified Trainer Certification) is UGX 3,000,000.'
				},
				{
					q: 'How does the training work?',
					a: 'Apply, confirm, prepare, train, then activate. Once payment is complete you receive the training brief, schedule, and preparation pack.'
				},
				{
					q: 'Do I need to be a clinician?',
					a: 'No. Champions learn to hold space without needing to be a clinician, and a clinic needs no clinician, just a trained Champion and the toolkit.'
				}
			]
		},
		{
			id: 'platform',
			title: 'Platform & data',
			// Same answers as the Platform page FAQ.
			faqs: [
				{
					q: 'Is the Early Warning System live?',
					a: "Not yet, it is coming soon. When it launches, you will log in on the Platform page to check your Connection Miles and follow your community's Early Warning System."
				},
				{
					q: 'Does it show how one person is feeling?',
					a: 'Organisations see patterns across a whole community. DCI uses wellbeing data in aggregate, non-identifying form, as set out in our privacy policy.'
				},
				{
					q: 'What does it need before it activates?',
					a: 'Enough people taking part across mood tracking, Champion certification, and clinic attendance. One signal on its own is not enough.'
				},
				{
					q: 'How do organisations pay for it?',
					a: 'Pay-as-you-go data tracking through Connection Miles, which compound with every toolkit sold, clinic hosted, and Champion trained.'
				}
			]
		},
		{
			id: 'partners',
			title: 'Partners',
			faqs: [
				{
					q: 'Which organisations is DCI for?',
					a: 'Schools, corporates, NGOs, faith communities, and hospitality spaces.'
				},
				{
					q: 'What does a partnership cost?',
					a: 'Organisations start from USD 20,000 annually. We scope every engagement around your people, your setting, and the outcomes you report on.'
				},
				{
					q: 'What does a partnership include?',
					a: 'Three layers. Connect: Community Champions and Conversation Clinics. Equip: the Mood Tracker, Journal, and Card Game. Understand: the Early Warning System reads signals across your whole organisation.'
				},
				{
					q: 'How do we start?',
					a: 'Book a 30-minute call: choose \u201cPartner training\u201d in the form above.'
				}
			]
		}
	];

	// The topic list marks the group in view; Cojeev's glide follows it.
	let activeTopic = $state(faqTopics[0].id);
	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries)
					if (entry.isIntersecting) activeTopic = entry.target.id.slice(4);
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		for (const t of faqTopics) {
			const el = document.getElementById(`faq-${t.id}`);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<PageHero
	eyebrow="Contact DCI"
	title="Let us know what kind of support you need."
	description="Reach out about toolkits, clinics, trainings, partnerships, or responsible mental health referrals. We will route your message to the right person."
/>

<Section class="pt-0 lg:pt-0">
	<div class="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
		<aside
			use:reveal={{ delay: 0, y: 18 }}
			class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:sticky lg:top-28"
		>
			<dl class="divide-y divide-dci-teal/15">
				<div class="pb-5">
					<dt class="type-eyebrow text-dci-teal">Email</dt>
					<dd class="mt-2">
						<a
							href={`mailto:${siteConfig.contacts.email}`}
							class="text-base text-foreground underline-offset-4 hover:underline"
						>
							{siteConfig.contacts.email}
						</a>
					</dd>
				</div>
				<div class="py-5">
					<dt class="type-eyebrow text-dci-teal">Phone</dt>
					<dd class="mt-2">
						<a
							href={`tel:${siteConfig.contacts.tele}`}
							class="text-base text-foreground underline-offset-4 hover:underline"
						>
							{siteConfig.contacts.tele}
						</a>
					</dd>
				</div>
				<div class="py-5">
					<dt class="type-eyebrow text-dci-teal">Office</dt>
					<dd class="mt-2 text-base text-foreground">{siteConfig.contacts.address}</dd>
				</div>
			</dl>
			<dl class="grid gap-5 border-t border-dci-teal/15 pt-5 sm:grid-cols-2">
				<div>
					<dt class="type-eyebrow text-dci-teal">Office hours</dt>
					<dd class="mt-2 text-sm leading-relaxed text-muted-foreground">
						Monday-Friday, 9:00 AM-5:00 PM
					</dd>
				</div>
				<div>
					<dt class="type-eyebrow text-dci-teal">Response window</dt>
					<dd class="mt-2 text-sm leading-relaxed text-muted-foreground">
						Usually within 1-2 working days.
					</dd>
				</div>
			</dl>
		</aside>

		<div
			use:reveal={{ delay: 120, y: 18 }}
			class="overflow-hidden rounded-2xl border border-dci-teal/15 bg-dci-paper"
		>
			<div class="m-2.5 mb-0 rounded-2xl border border-dci-teal/12 bg-dci-cream p-6 sm:p-8">
				<p class="type-eyebrow text-dci-teal">Send a message</p>
				<h2 class="type-title mt-2 text-foreground">
					Start with the basics. We will follow up with care.
				</h2>
				<p class="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
					Use this form for general inquiries. If someone is in immediate danger, contact local
					emergency services or a trusted crisis support provider.
				</p>
			</div>

			<div class="p-6 sm:p-8 lg:p-10">
				{#if form?.success}
					<div
						class="mb-6 rounded-2xl border border-dci-teal/25 bg-dci-teal/8 px-5 py-4 text-sm text-dci-teal-deep"
						role="status"
					>
						<p class="font-semibold">Thanks, your message is in.</p>
						<p class="mt-1 text-muted-foreground">
							We'll follow up at the email you provided. For anything urgent, call {siteConfig
								.contacts.tele}.
						</p>
					</div>
				{/if}
				{#if form?.errors?.form}
					<div
						class="mb-6 rounded-2xl border border-dci-burgundy/25 bg-dci-burgundy/8 px-5 py-4 text-sm text-dci-burgundy"
						role="alert"
					>
						{form.errors.form} You can reach us at
						<a
							href={`mailto:${siteConfig.contacts.email}`}
							class="font-semibold underline underline-offset-4">{siteConfig.contacts.email}</a
						>.
					</div>
				{/if}

				<form
					use:fieldGlide
					class="space-y-5"
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
				>
					<input
						autocomplete="off"
						name="company"
						type="text"
						tabindex="-1"
						aria-hidden="true"
						class="hidden"
					/>

					<div class="grid gap-4 sm:grid-cols-2">
						<Field
							appearance="inset"
							id="name"
							name="name"
							label="Your name"
							type="text"
							autocomplete="name"
							required
							value={form?.values?.name ?? ''}
							aria-invalid={form?.errors?.name ? 'true' : undefined}
							error={form?.errors?.name}
							placeholder="Full name"
						/>

						<Field
							appearance="inset"
							id="email"
							name="email"
							label="Email address"
							type="email"
							autocomplete="email"
							required
							value={form?.values?.email ?? ''}
							aria-invalid={form?.errors?.email ? 'true' : undefined}
							error={form?.errors?.email}
							placeholder="you@example.com"
						/>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<Field
							appearance="inset"
							id="phone"
							name="phone"
							label="Phone number"
							type="tel"
							autocomplete="tel"
							placeholder="+256..."
						/>

						<Field appearance="inset" id="topic" label="What is this about?">
							<select
								id="topic"
								name="topic"
								bind:value={topic}
								class="mt-1 h-7 w-full bg-transparent text-base text-foreground outline-none"
							>
								{#each supportPaths as path}
									<option>{path}</option>
								{/each}
							</select>
						</Field>
					</div>

					<Field
						appearance="inset"
						multiline
						rows={6}
						id="message"
						name="message"
						label="Message"
						required
						value={form?.values?.message ?? aboutParam}
						aria-invalid={form?.errors?.message ? 'true' : undefined}
						error={form?.errors?.message}
						placeholder="Tell us what you are hoping to do, who the support is for, and the best way to reach you."
					/>

					<div
						class="-mx-6 -mb-6 flex flex-col gap-4 border-t border-dci-teal/12 bg-dci-cream/55 px-6 py-5 sm:-mx-8 sm:-mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:-mx-10 lg:-mb-10 lg:px-10"
					>
						<p class="max-w-md text-sm leading-relaxed text-muted-foreground">
							Please avoid sending sensitive clinical details through this form.
						</p>
						<Button type="submit" disabled={submitting}>
							{submitting ? 'Sending…' : 'Send message'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</Section>

<Section id="faq">
	<SectionHeading
		eyebrow="Questions"
		title="Answers before you write."
		description="What people ask us most about clinics, the toolkit, trainings, the platform, and partnerships."
	/>

	<div class="mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8">
		<nav aria-label="Question topics" class="lg:sticky lg:top-28 lg:self-start">
			<ul
				use:flowGroup={{ itemSelector: 'a' }}
				class="flex flex-wrap gap-1.5 lg:grid lg:gap-1"
				style="--glide-r: 999px; --hov-r: 999px;"
			>
				{#each faqTopics as t (t.id)}
					{@const current = activeTopic === t.id}
					<li>
						<a
							href={`#faq-${t.id}`}
							aria-current={current ? 'true' : undefined}
							onclick={() => (activeTopic = t.id)}
							class={`relative z-10 block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${current ? 'text-dci-cream' : 'text-muted-foreground hover:text-foreground'}`}
						>
							{t.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="grid gap-16 lg:col-span-3">
			{#each faqTopics as t (t.id)}
				<div id={`faq-${t.id}`} class="scroll-mt-28">
					<h3 class="type-title text-foreground">{t.title}</h3>
					<div class="mt-6 divide-y divide-dci-teal/15 border-y border-dci-teal/15">
						{#each t.faqs as faq (faq.q)}
							<details class="group py-5">
								<summary
									class="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-foreground [&::-webkit-details-marker]:hidden"
								>
									{faq.q}
									<span
										aria-hidden="true"
										class="grid size-8 shrink-0 place-items-center rounded-full border border-dci-teal/20 text-dci-teal transition-transform group-open:rotate-45"
										>+</span
									>
								</summary>
								<p class="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
									{faq.a}
								</p>
							</details>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>
