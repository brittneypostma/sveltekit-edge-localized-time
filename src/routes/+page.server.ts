import type { RequestEvent } from '@sveltejs/kit';
// import { Context } from 'https://edge.netlify.com';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import iplocation from 'https://cdn.skypack.dev/iplocation';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const context: Context = event.platform?.context;
	// determine location and probable locale from the IP address
	let location = event.platform?.context?.geo?.ip;
	let locationLabel;
	try {
		// location = await iplocation(context.ip);
		locationLabel = `${context.geo.city}, ${context.geo.country.name}`;
	} catch (err) {
		location = null;
		locationLabel = undefined;
		throw error(404, `Error: ${err.message}`);
	}

	const locale = location?.country?.languages[0] || 'en-GB';
	const timezone = location?.country?.timezone?.code || 'Europe/London';

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
