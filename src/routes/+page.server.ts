import type { RequestEvent } from '@sveltejs/kit';
import { Context } from 'https://edge.netlify.com';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const context: Context = event.platform?.context;
	let location;
	let locationLabel;
	try {
		location = event.platform?.context?.geo?.ip;
		locationLabel = `${context.geo.city}, ${context.geo.country.name}`;

		const locale = location?.country?.languages[0] || 'en-GB';
		const timezone = location?.country?.timezone?.code || 'Europe/London'; //  'America/New_York'
		console.log(location, location?.country?.languages[0], location?.country?.timezone?.code);

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
	} catch (err) {
		location = null;
		locationLabel = undefined;
		throw error(404, `Error: ${err.message}`);
	}
};
