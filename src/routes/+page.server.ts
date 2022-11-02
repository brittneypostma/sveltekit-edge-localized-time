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

	const locale = location?.country?.languages[0] || null; // 'en-US'
	const timezone = location?.country?.timezone?.code || null; // 'America/New_York'
	console.log(timezone);

	// Generate a formatted time string
	const time = new Date().toLocaleString(locale, {
		timeZone: timezone,
		hour: 'numeric',
		minute: 'numeric'
	});
	return {
		locationLabel,
		time
	};
};
