<script lang="ts">
	import { fieldGlide } from '$lib/actions/flow';
	import { enhance } from '$app/forms';
	import { Button } from '@/lib/components/ui/button';
	import { Field } from '$lib/components/ui/field';
	import GetInvolved from '@/lib/components/pages/sections/get-involved.svelte';
	import { PageHero, Section } from '@/lib/components/sections';
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
	// An effect, not a one-off read, so same-page links (the Get involved cards) also switch it.
	$effect(() => {
		topic = pick(topicParam);
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

<GetInvolved />
