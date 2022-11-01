import type { RequestEvent } from '@sveltejs/kit';
import { Context } from 'https://edge.netlify.com';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const context: Context = event.platform?.context;
	let location = event.platform?.context?.geo?.ip;
	let locationLabel;
	try {
		locationLabel = `${context.geo.city}, ${context.geo.country.name}`;
	} catch (err) {
		location = null;
		locationLabel = undefined;
		throw error(404, `Error: ${err.message}`);
	}

	const locale = location?.country?.languages[0] || 'en-US';
	const timezone = location?.country?.timezone?.code || 'America/New_York';

	// Generate a formatted time string
	const now = new Date();
	const time = now.toLocaleString(locale, {
		timeZone: timezone,
		hour: 'numeric',
		minute: 'numeric'
	});

	return {
		locationLabel,
		time
	};
};
