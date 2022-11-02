import type { RequestEvent } from '@sveltejs/kit';
import { Context } from 'https://edge.netlify.com';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event: RequestEvent) => {
	const context: Context = event.platform?.context;
	// console.log(context);
	let location;
	let locationLabel;
	try {
		location = context?.ip; // this is not helping
		const res = await fetch(`https://ipapi.co/${location}/json/`);
		const ipData = await res.json();
		// console.log({ ipData }, { context });
		const city = context?.geo?.city;
		const country = context?.geo?.country?.name;
		locationLabel = `${city}, ${country}`;
		const locale = ipData.country?.languages[0] || 'en-GB';
		const timezone = ipData.country?.timezone?.code || 'Europe/London'; //  'America/New_York'
		console.log(locale, timezone);

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

// async function ipLocation(ip: string): Promise<ipLocation.ReturnType> {
// 	if (typeof ip !== 'string' || !isIp.v4(ip)) {
// 		throw error(404, 'A valid ipv4 address must be provided!');
// 	}

// 	const {
// 		latitude,
// 		longitude,
// 		city,
// 		reserved,
// 		region,
// 		region_code,
// 		country_name,
// 		country_code,
// 		country_code_iso3,
// 		country_capital,
// 		country_tld,
// 		country_population,
// 		country_calling_code,
// 		continent_code,
// 		in_eu,
// 		postal,
// 		timezone,
// 		utc_offset,
// 		currency,
// 		currency_name,
// 		languages,
// 		country_area
// 	}: IpApiData = await fetch(`https://ipapi.co/${ip}/json/`);

// 	return reserved
// 		? {
// 				reserved
// 		  }
// 		: {
// 				latitude,
// 				longitude,
// 				city,
// 				reserved: Boolean(reserved),
// 				region: {
// 					name: region,
// 					code: region_code
// 				},
// 				country: {
// 					name: country_name,
// 					code: country_code,
// 					iso3: country_code_iso3,
// 					capital: country_capital,
// 					tld: country_tld,
// 					population: country_population,
// 					area: country_area,
// 					callingCode: country_calling_code,
// 					postalCode: postal,
// 					timezone: {
// 						code: timezone,
// 						offset: utc_offset
// 					},
// 					currency: {
// 						name: currency_name,
// 						code: currency
// 					},
// 					languages: languages ? languages.split(',') : []
// 				},
// 				continent: {
// 					code: continent_code,
// 					inEu: in_eu
// 				}
// 		  };
// }

// interface IpApiData {
// 	ip: string;
// 	city: string;
// 	reserved: boolean;
// 	region: string;
// 	region_code: string;
// 	country: string;
// 	country_code: string;
// 	country_code_iso3: string;
// 	country_capital: string;
// 	country_tld: string;
// 	country_name: string;
// 	continent_code: string;
// 	in_eu: boolean;
// 	postal: string;
// 	latitude: number;
// 	longitude: number;
// 	timezone: string;
// 	utc_offset: string;
// 	country_calling_code: string;
// 	currency: string;
// 	currency_name: string;
// 	languages: string;
// 	country_area: number;
// 	country_population: number;
// }

// declare namespace ipLocation {
// 	export interface LocationData {
// 		latitude: number;
// 		longitude: number;
// 		city: string;
// 		region: {
// 			name: string;
// 			code: string;
// 		};
// 		country: {
// 			name: string;
// 			code: string;
// 			iso3: string;
// 			capital: string;
// 			tld: string;
// 			population: number;
// 			area: number;
// 			callingCode: string;
// 			postalCode: string;
// 			timezone: {
// 				code: string;
// 				offset: string;
// 			};
// 			currency: {
// 				name: string;
// 				code: string;
// 			};
// 			languages: string[];
// 		};
// 		continent: {
// 			code: string;
// 			inEu: boolean;
// 		};
// 	}

// 	export interface ReservedData {
// 		reserved: boolean;
// 	}
// 	export type ReturnType = (LocationData & ReservedData) | ReservedData;
// }
