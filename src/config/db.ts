// Loads MongoDB credentials from .env.
import { MongoClient } from '../deps.ts';

const mongoUri = Deno.env.get('MONGO_URI') || 'mongodb://127.0.0.1:27017';
const mongoUser = Deno.env.get('MONGO_USER');
const mongoPassword = Deno.env.get('MONGO_PASSWORD');
const mongoDbName = Deno.env.get('MONGO_DB_NAME') || 'fruitsdb';

const client = new MongoClient();

// Connects to MongoDB with authentication if MONGO_USER and MONGO_PASSWORD exist.
if (mongoUser && mongoPassword) {
	await client.connect({
		db: mongoDbName,
		tls: false,
		servers: [{ host: '127.0.0.1', port: 27017 }],
		credential: {
			username: mongoUser,
			password: mongoPassword,
			db: 'admin',
			mechanism: 'SCRAM-SHA-256',
		},
	});
} else {
	await client.connect(mongoUri);
}

// Exports the database connection for use in our services.
export const db = client.database(mongoDbName);
