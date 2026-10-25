/**
 * Flips true once the page has scrolled past the header. No scroll listener.
 * Call inside a component and read `.compact`.
 */
export function createCompactHeader(offset = 80) {
	let compact = $state(false);

	$effect(() => {
		const sentinel = document.createElement('div');
		Object.assign(sentinel.style, {
			position: 'absolute',
			top: '0',
			height: `${offset}px`,
			width: '1px',
			pointerEvents: 'none'
		});
		document.body.prepend(sentinel);

		const io = new IntersectionObserver(([entry]) => (compact = !entry.isIntersecting), {
			threshold: 0
		});
		io.observe(sentinel);

		return () => {
			io.disconnect();
			sentinel.remove();
		};
	});

	return {
		get compact() {
			return compact;
		}
	};
}
