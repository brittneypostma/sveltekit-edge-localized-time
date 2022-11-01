<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const { time, locationLabel } = data;
</script>

<h1>{locationLabel}</h1>
<time>{time}</time>

<style>
	pre {
		max-width: 20ch;
	}
</style>
