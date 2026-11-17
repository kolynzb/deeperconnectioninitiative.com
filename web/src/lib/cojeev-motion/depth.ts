import { createMotionLane, motionTokens } from '$lib/cojeev-motion/choreography';

/**
 * Cojeev's useDepth (cojeev.com/ui, MIT) without React: a small pointer-relative
 * tilt, lift and light for opt-in surfaces. Touch and reduced motion stay still.
 */
export function attachDepth(element: HTMLElement): () => void {
	const reduced = matchMedia('(prefers-reduced-motion: reduce)');
	let focused = false;

	const paint = () => {
		const px = x.get(),
			py = y.get(),
			l = lift.get();
		const s = element.style;
		s.setProperty('--depth-x', `${px * 4}px`);
		s.setProperty('--depth-y', `${py * 4}px`);
		s.setProperty('--depth-axis-x', String(-py));
		s.setProperty('--depth-axis-y', String(px || 0.001));
		s.setProperty('--depth-angle', `${Math.hypot(px, py) * 2.5}deg`);
		s.setProperty('--depth-lift', `${l * -3}px`);
		s.setProperty('--depth-light-x', `${50 + px * 30}%`);
		s.setProperty('--depth-light-y', `${50 + py * 30}%`);
		s.setProperty('--depth-light', String(l * 0.3));
	};
	const x = createMotionLane(0, paint);
	const y = createMotionLane(0, paint);
	const lift = createMotionLane(0, paint);
	const gentle = motionTokens.spring.gentle;
	const responsive = motionTokens.spring.responsive;

	const quiet = () => reduced.matches;
	const sync = () => {
		if (quiet()) {
			delete element.dataset.depth;
			x.jump(0);
			y.jump(0);
			lift.jump(0);
		} else element.dataset.depth = 'on';
	};
	const reset = () => {
		x.to(0, gentle);
		y.to(0, gentle);
		lift.to(focused && !quiet() ? 0.6 : 0, responsive);
	};
	const move = (event: PointerEvent) => {
		if (quiet() || event.pointerType === 'touch') return;
		const rect = element.getBoundingClientRect();
		const clamp = (v: number) => Math.max(-1, Math.min(1, v));
		x.to(clamp(((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1), gentle);
		y.to(clamp(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1), gentle);
		lift.to(1, responsive);
	};
	const focusIn = () => {
		focused = true;
		if (!quiet()) lift.to(0.6, responsive);
	};
	const focusOut = (event: FocusEvent) => {
		if (element.contains(event.relatedTarget as Node | null)) return;
		focused = false;
		reset();
	};

	sync();
	reduced.addEventListener('change', sync);
	element.addEventListener('pointermove', move);
	element.addEventListener('pointerleave', reset);
	element.addEventListener('focusin', focusIn);
	element.addEventListener('focusout', focusOut);

	return () => {
		reduced.removeEventListener('change', sync);
		element.removeEventListener('pointermove', move);
		element.removeEventListener('pointerleave', reset);
		element.removeEventListener('focusin', focusIn);
		element.removeEventListener('focusout', focusOut);
		x.jump(0);
		y.jump(0);
		lift.jump(0);
		delete element.dataset.depth;
	};
}
