import { bookableClinics } from '$lib/clinics';
import type { PageServerLoad } from './$types';

// Dates are computed on the server so every visitor sees the same schedule
// regardless of device clock or timezone.
export const load: PageServerLoad = () => {
	return { clinics: bookableClinics().map((d) => d.toISOString()) };
};
