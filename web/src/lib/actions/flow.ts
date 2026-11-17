import { attachFlowGroup, type FlowGroupOptions } from '$lib/cojeev-motion/flow';
import { attachFlowPress } from '$lib/cojeev-motion/flow-press';
import { attachMorph } from '$lib/cojeev-motion/morph';
import type { Category } from '$lib/cojeev-motion/settings';

/**
 * Cojeev's gliding selection (the real engine, cojeev.com/ui): one surface
 * travels to the active item, with a hover preview and spring settle.
 * Items default to buttons, tabs and radios; the active one is found from
 * aria-selected / aria-current / aria-pressed / data-state.
 */
export function flowGroup(node: HTMLElement, options: FlowGroupOptions = {}) {
	let detach = attachFlowGroup(node, options);

	return {
		update(next: FlowGroupOptions = {}) {
			detach();
			detach = attachFlowGroup(node, next);
		},
		destroy() {
			detach();
		}
	};
}

/** Cojeev's organic surface: an SVG body that copies the element's background. */
export function morph(node: HTMLElement, category: Category = 'buttons') {
	let attached = attachMorph(node, category);

	return {
		update(next: Category = 'buttons') {
			if (next === category) {
				attached.sync();
				return;
			}
			category = next;
			attached.destroy();
			attached = attachMorph(node, category);
		},
		destroy() {
			attached.destroy();
		}
	};
}

/** Cojeev's release pulse on press and on state change. */
export function flowPress(node: HTMLElement) {
	return { destroy: attachFlowPress(node) };
}
