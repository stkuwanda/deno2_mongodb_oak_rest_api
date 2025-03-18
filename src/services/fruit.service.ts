// This is part of the data layer; all the utility functions that interact with our 
// database table/document
import { fruitsCollection, FruitSchema } from '../models/fruit.model.ts';
import { ObjectId } from '../deps.ts';

// Retrieves all fruits from the database.
export const getFruits = async (): Promise<FruitSchema[]> => {
	return await fruitsCollection.find({}).toArray();
};

// Fetches a single fruit by ID from the database.
export const getFruitById = async (id: string): Promise<FruitSchema | null> => {
	const fruit = await fruitsCollection.findOne({ _id: new ObjectId(id) });

	return fruit ?? null;
};

// Inserts a new fruit into the database.
export const createFruit = async (fruit: Omit<FruitSchema, '_id'>) => {
	const insertId = await fruitsCollection.insertOne({
		_id: new ObjectId(),
		...fruit,
	});

	return insertId.toString();
};

// Updates an existing fruit's properties from the database.
export const updateFruit = async (id: string, fruit: Partial<FruitSchema>) => {
	const { _id, ...updatedData } = fruit;

	const { matchedCount } = await fruitsCollection.updateOne(
		{ _id: new ObjectId(id) },
		{ $set: updatedData }
	);

	return matchedCount > 0;
};

// Removes a fruit by ID from the database.
export const deleteFruit = async (id: string): Promise<boolean> => {
	const deletedCount = await fruitsCollection.deleteOne({
		_id: new ObjectId(id),
	});

	return deletedCount > 0;
};
