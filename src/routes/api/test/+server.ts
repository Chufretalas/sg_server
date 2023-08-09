import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
    return new Response("all seens to be working fine", { status: 200 });
};