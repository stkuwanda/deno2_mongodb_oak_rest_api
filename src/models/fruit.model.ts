//  Fruit model that we are going to map with a MongoDB table
import { db } from '../config/db.ts';
import { ObjectId } from '../deps.ts';

// Defines the FruitSchema, specifying the properties each fruit object will have.
export interface FruitSchema {
	_id: ObjectId;
	name: string;
	color: string;
	price: number;
}

// Creates a MongoDB collection named "fruits" for storing fruit data.
export const fruitsCollection = db.collection<FruitSchema>('fruits');
