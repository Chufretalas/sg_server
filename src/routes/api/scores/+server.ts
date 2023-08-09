import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/db/db';
import getJson from '$lib/db/utils/get_json';

export const GET: RequestHandler = async () => {

    try {
        const allScores = await prisma.scores.findMany({
            orderBy: [
                {
                    version: "desc"
                },
                {
                    score: "desc"
                }
            ]
        })
        return new Response(JSON.stringify(allScores));
    } catch (e: any) {
        console.log(e)
        throw error(500, "the database is borked :(")
    }
};


export const POST = (async ({ request }) => {
    const password = request.headers.get("authorization")?.split(" ")[1]

    if (!password || password !== process.env.SG_PASSWORD) {
        throw error(401, "invalid password")
    }

    const { data, success } = await getJson(request)
    if (!success) {
        throw error(400, "invalid body")
    }

    if (!data.name) throw error(400, "forgot the name field")
    if (!data.score) throw error(400, "forgot the score field")
    if (!data.version) throw error(400, "forgot the version field")

    try {
        const res = await prisma.scores.create({
            data: {
                name: data.name,
                score: data.score,
                version: data.version
            }
        })
        // console.log(res)
        if (!res) {
            throw error(400, "bad request boy, did not save")
        }
    } catch (e: any) {
        console.log(e)
        throw error(400, "bad request boy, did not save")
    }
    return new Response(JSON.stringify(data))
}) satisfies RequestHandler