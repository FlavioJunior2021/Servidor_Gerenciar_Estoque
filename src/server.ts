import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import { app } from "./config/fastify";
import { registerRoutes } from "./config/routes";

app.register(cors, {
	origin: true,
});

app.register(jwt, {
	secret: "supersecret",
});

registerRoutes();

app
	.listen({
		port: 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("🚀 HTTP server running on port http://localhost:3333");
	});
