// Fails when a .svelte file uses a pattern from the "Never" list in
// .interface-design/system.md. Run with `npm run check:design`.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const rules = [
	[/radial-gradient|bg-\[url\(/, 'dot or noise texture'],
	[/(?<!backdrop-)\bblur-(sm|md|lg|xl|2xl|3xl|\[)/, 'blurred blob or glow'],
	[/\bbackdrop-blur/, 'frosted glass'],
	[/\banimate-(ping|pulse|bounce)\b/, 'pinging or looping decoration'],
	[/\bSparkle/, 'sparkle icon'],
	[/(?<![\w-])hover:-translate-y/, 'hover lift'],
	[/\bshadow-(sm|md|lg|xl|2xl|\[)|shadow-dci-(?!overlay)/, 'decorative shadow (only shadow-dci-overlay, on floating UI)'],
	[/SpotIllustration/, 'cartoon spot illustration'],
	[/\btext-(dci-cream|dci-sand|dci-paper|white)\/([1-6]\d|7[0-4])\b/, 'text under /75 on dark fails contrast'],
	[/\btext-muted-foreground\/\d+/, 'faded muted text fails contrast'],
	[/\btracking-\[0\.[1-9]/, 'hand-made label; use type-eyebrow']
];

// Floating UI may use glass and the overlay shadow; the logo keeps its letter-spacing.
const allowed = {
	'src/lib/components/layout/navigation.svelte': ['frosted glass'],
	'src/lib/components/checkout-drawer.svelte': ['frosted glass'],
	'src/lib/components/ui/sheet/sheet-content.svelte': ['decorative shadow (only shadow-dci-overlay, on floating UI)'],
	'src/lib/components/ui/navigation-menu/navigation-menu-indicator.svelte': [
		'decorative shadow (only shadow-dci-overlay, on floating UI)'
	],
	'src/lib/components/layout/logo.svelte': ['hand-made label; use type-eyebrow']
};

const files = (dir) =>
	readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? files(path) : path.endsWith('.svelte') ? [path] : [];
	});

let failures = 0;
for (const path of files('src')) {
	const file = relative('.', path);
	readFileSync(path, 'utf8')
		.split('\n')
		.forEach((line, i) => {
			for (const [pattern, why] of rules) {
				if (pattern.test(line) && !allowed[file]?.includes(why)) {
					console.log(`${file}:${i + 1}  ${why}\n    ${line.trim().slice(0, 140)}`);
					failures++;
				}
			}
		});
}
if (failures) {
	console.log(`\n${failures} design rule violation(s). See "## Never" in .interface-design/system.md.`);
	process.exit(1);
}
console.log('Design check passed.');
