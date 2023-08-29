import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SG_PASSWORD } from '$env/static/private'

export const GET: RequestHandler = async ({ request }) => {
    const password = request.headers.get("authorization")?.split(" ")[1]
    console.log(password, SG_PASSWORD)
    if (!password || password !== SG_PASSWORD) {
        throw error(401, "invalid password")
    }
    return new Response("ok", { status: 200 });
};