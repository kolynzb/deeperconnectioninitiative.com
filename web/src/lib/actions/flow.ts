import { attachFlowGroup, type FlowGroupOptions } from '$lib/cojeev-motion/flow';
import { attachDepth } from '$lib/cojeev-motion/depth';
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

/** Cojeev's card depth: tilt, lift and light that follow the pointer. */
export function depth(node: HTMLElement, enabled = true) {
	let detach = enabled ? attachDepth(node) : null;
	return {
		update(next = true) {
			if (next === !!detach) return;
			detach?.();
			detach = next ? attachDepth(node) : null;
		},
		destroy() {
			detach?.();
		}
	};
}

/** Cojeev's flow fields: one paper well glides to whichever inset field has focus. */
export function fieldGlide(node: HTMLElement) {
	node.dataset.flowFields = '';
	const detach = attachFlowGroup(node, { kind: 'fill' });
	return {
		destroy() {
			detach();
			delete node.dataset.flowFields;
		}
	};
}
