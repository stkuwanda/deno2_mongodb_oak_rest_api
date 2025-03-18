// Routes to define all fruit access and management API endpoints
import { Router } from '../deps.ts';
import {
	addFruit,
	fetchFruits,
	fetchFruitById,
	modifyFruit,
	removeFruit,
} from '../controllers/fruit.controller.ts';

const router = new Router();

router
	.prefix('/api/fruits')
	.get('/', fetchFruits) // GET /api/fruits → Fetch all fruits.
	.get('/:id', fetchFruitById) // GET /api/fruits/:id → Fetch a specific fruit by ID.
	.post('/', addFruit) // POST /api/fruits → Create a new fruit.
	.put('/:id', modifyFruit) // PUT /api/fruits/:id → Update a fruit by ID.
	.delete('/:id', removeFruit); // DELETE /api/fruits/:id → Remove a fruit by ID.

export default router;
