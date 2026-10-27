<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '@/lib/components/ui/button';
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
	const topicParam = page.url.searchParams.get('topic') ?? '';
	const aboutParam = page.url.searchParams.get('about') ?? '';
	let topic = $state(supportPaths.includes(topicParam) ? topicParam : supportPaths[0]);
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
			class="rounded-2xl border border-dci-teal/15 bg-dci-paper/70 p-6 sm:p-8 lg:p-10"
		>
			<div class="mb-8 max-w-2xl space-y-3">
				<p class="type-eyebrow text-dci-teal">Send a message</p>
				<h2 class="type-title text-foreground">
					Start with the basics. We will follow up with care.
				</h2>
				<p class="text-base leading-relaxed text-muted-foreground">
					Use this form for general inquiries. If someone is in immediate danger, contact local
					emergency services or a trusted crisis support provider.
				</p>
			</div>

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
				class="space-y-6"
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

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="name" class="text-sm font-semibold text-foreground">Your name</label>
						<input
							id="name"
							name="name"
							type="text"
							autocomplete="name"
							required
							value={form?.values?.name ?? ''}
							aria-invalid={form?.errors?.name ? 'true' : undefined}
							placeholder="Full name"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
						{#if form?.errors?.name}
							<p class="text-sm text-dci-burgundy">{form.errors.name}</p>
						{/if}
					</div>

					<div class="space-y-2">
						<label for="email" class="text-sm font-semibold text-foreground">Email address</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							value={form?.values?.email ?? ''}
							aria-invalid={form?.errors?.email ? 'true' : undefined}
							placeholder="you@example.com"
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
						{#if form?.errors?.email}
							<p class="text-sm text-dci-burgundy">{form.errors.email}</p>
						{/if}
					</div>
				</div>

				<div class="grid gap-5 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="phone" class="text-sm font-semibold text-foreground">Phone number</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							autocomplete="tel"
							placeholder="+256..."
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						/>
					</div>

					<div class="space-y-2">
						<label for="topic" class="text-sm font-semibold text-foreground"
							>What is this about?</label
						>
						<select
							id="topic"
							name="topic"
							bind:value={topic}
							class="h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground outline-none transition focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						>
							{#each supportPaths as path}
								<option>{path}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="space-y-2">
					<label for="message" class="text-sm font-semibold text-foreground">Message</label>
					<textarea
						id="message"
						name="message"
						rows="7"
						required
						aria-invalid={form?.errors?.message ? 'true' : undefined}
						placeholder="Tell us what you are hoping to do, who the support is for, and the best way to reach you."
						class="w-full resize-y rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 py-4 text-base leading-relaxed text-foreground outline-none transition placeholder:text-muted-foreground focus:border-dci-teal/50 focus:bg-white focus:ring-4 focus:ring-dci-teal/10"
						>{form?.values?.message ?? aboutParam}</textarea
					>
					{#if form?.errors?.message}
						<p class="text-sm text-dci-burgundy">{form.errors.message}</p>
					{/if}
				</div>

				<div
					class="flex flex-col gap-4 border-t border-dci-teal/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
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
</Section>

<GetInvolved />
