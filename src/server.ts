// server
import 'jsr:@std/dotenv/load'; // Loads environment variables from .env.
import { Application } from './deps.ts';
import router from './routes/fruit.routes.ts'; 
import { oakCors } from './deps.ts';
import { mylogger } from './middleware/mylogger.middleware.ts';

const port = Number(Deno.env.get('PORT')) || 8080;
const app = new Application();

app.use(mylogger());// Logs incoming requests to the console for debugging.
app.use(oakCors());// Enables CORS, allowing our Angular app to communicate with the backend.

// Registers API routes.
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on http://localhost:${port}`);
await app.listen({ port });
