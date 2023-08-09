import fetchGroupedScores from '$lib/db/fetch_grouped_scores';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const data = await fetchGroupedScores()
    return data
}) satisfies PageServerLoad;