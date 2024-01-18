import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import fastify from "fastify";
import { creatUserRoute } from "./routes/creteUserRoute";

const app = fastify();

app.register(cors, {
	origin: true,
});

app.register(jwt, {
	secret: "supersecret",
});

app.register(creatUserRoute);

app
	.listen({
		port: 3333,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("🚀 HTTP server running on port http://localhost:3333");
	});
