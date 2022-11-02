import type { RequestEvent } from '@sveltejs/kit';
import { Context } from 'https://edge.netlify.com';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const context: Context = event.platform?.context;
	let location;
	let locationLabel;
	try {
		// get ip and use it to hit ipapi
		location = context?.ip;
		const res = await fetch(`https://ipapi.co/${location}/json/`);
		const ipData = await res.json();
		console.log({ ipData }, { context });
		// break out individual pieces
		const city = context?.geo?.city;
		const country = context?.geo?.country?.name;
		locationLabel = `${city}, ${country}`;
		const countryCode = context?.geo?.country?.code;
		const locale = ipData.languages.split(',')[0] || 'id-ID';
		// const locale = `en-${countryCode}` || 'en-GB';
		const timezone = ipData.timezone || 'Asia/Jakarta'; //  'America/New_York'
		console.log({ countryCode }, { locale }, { timezone });

		// Generate a formatted time string
		const time = new Date().toLocaleString(locale, {
			timeZone: timezone,
			hour: 'numeric',
			minute: 'numeric'
		});
		console.log(
			new Date().toLocaleString('id-ID', {
				timeZone: 'Asia/Jakarta',
				hour: 'numeric',
				minute: 'numeric'
			})
		);
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
