import type { RequestEvent } from '@sveltejs/kit';
import { Context } from 'https://edge.netlify.com';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const context: Context = event.platform?.context;
	let locationLabel;
	try {
		// break out individual pieces
		const city = context?.geo?.city;
		const country = context?.geo?.country?.name;
		locationLabel = `${city}, ${country}`;
		const countryCode = context?.geo?.country?.code;
		const options = Intl.DateTimeFormat().resolvedOptions();
		const locale = options.locale;
		// const locale = ipData.languages.split(',')[0] || 'id-ID';
		// const locale = `en-${countryCode}` || 'en-GB';
		const timezone = context?.geo?.timezone || 'Asia/Jakarta'; //  'America/New_York'
		// date.getTimezoneOffset();
		const intlTimezone = options.timeZone;
		console.log(
			{ context },
			{ options },
			{ intlTimezone },
			{ countryCode },
			{ locale },
			{ timezone }
		);

		// Generate a formatted time string
		const time = new Date().toLocaleString(locale, {
			timeZone: timezone,
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		});
		return {
			locationLabel,
			time
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		locationLabel = undefined;
		throw error(404, `Error: ${err.message}`);
	}
};
