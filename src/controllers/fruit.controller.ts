// All API call handlers for anything to do with managing fruits.
// This controller connects to our fruit service services inorder to handle api
// requests.
import { RouterContext } from '../deps.ts';
import {
	createFruit,
	deleteFruit,
	getFruits,
	getFruitById,
	updateFruit,
} from '../services/fruit.service.ts';

// Creates the response object for fetching all fruits.
export const fetchFruits = async (ctx: RouterContext<'/'>) => {
	const fruits = await getFruits();

	ctx.response.body = fruits;
};

// Creates the response object for fetching a single fruit by ID.
export const fetchFruitById = async (ctx: RouterContext<'/:id'>) => {
	const id = ctx.params.id;

	if (!id) {
		ctx.response.status = 400;
		ctx.response.body = { message: 'Missing fruit ID' };
		return;
	}

	const fruit = await getFruitById(id);

	if (!fruit) {
		ctx.response.status = 404;
		ctx.response.body = { message: 'Fruit not found' };
		return;
	}

	ctx.response.body = fruit;
};

// Creates the response object for creating a new fruit entry.
export const addFruit = async (ctx: RouterContext<'/'>) => {
	const body = await ctx.request.body.json();
	const id = await createFruit(body);

	ctx.response.status = 201;
	ctx.response.body = { _id: id, ...body };
};

// Creates the response object for updating an existing fruit.
export const modifyFruit = async (ctx: RouterContext<'/:id'>) => {
	const id = ctx.params.id;

	if (!id) {
		ctx.response.status = 400;
		ctx.response.body = { message: 'Missing fruit ID' };
		return;
	}

	const { _id, ...body } = await ctx.request.body.json();
	const updated = await updateFruit(id, body);

	if (!updated) {
		ctx.response.status = 404;
		ctx.response.body = { message: 'Fruit not found' };
		return;
	}

	ctx.response.body = {
		_id: id,
		...body,
	};
};

// Creates the response object for deleting a fruit by ID.
export const removeFruit = async (ctx: RouterContext<'/:id'>) => {
	const id = ctx.params.id;

	if (!id) {
		ctx.response.status = 400;
		ctx.response.body = { message: 'Missing fruit ID' };
		return;
	}

	const deleted = await deleteFruit(id);

	if (!deleted) {
		ctx.response.status = 404;
		ctx.response.body = { message: 'Fruit not found' };
		return;
	}

	ctx.response.body = { message: 'Fruit deleted' };
};
