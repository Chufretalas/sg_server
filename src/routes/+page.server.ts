import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/db/db';

export const load = (async ({ url }) => {
    if (!url.searchParams.get("v")) {
        const response = await prisma.scores.findFirst({
            select: {
                version: true
            }, orderBy: { version: 'desc' }
        })
        throw redirect(307, `/?v=${response?.version}`);
    } else {
        const version = url.searchParams.get("v")
        try {
            const scResponse = await prisma.scores.findMany({
                where: {
                    version: version!
                },
                orderBy: {
                    score: "desc"
                },
                distinct: ["name"]
            })
            const vResponse = await prisma.scores.findMany({
                select: {
                    version: true
                },
                distinct: ["version"]
            })
            if (scResponse && vResponse) {
                return { versions: vResponse.map(v => v.version), scores: scResponse, error: false }
            }
        } catch (e: any) {
            console.log(e)
        }
        return { error: true }
    }
}) satisfies PageServerLoad;