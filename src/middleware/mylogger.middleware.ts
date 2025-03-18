import { Next } from '@oak/oak/middleware';
import { Context } from '@oak/oak/context';

export const mylogger = () => async (ctx: Context, next: Next) => {
	console.log(`${ctx.request.method} ${ctx.request.url}`);
	await next();
};
