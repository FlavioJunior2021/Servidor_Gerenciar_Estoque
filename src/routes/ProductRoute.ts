import { FastifyInstance } from "fastify";
import { createProductController } from "../controllers/ProductController";
import { jwtAuthenticate } from "../config/jwt";

export function createProductRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.post(
		"/product/create",
		{ preValidation: [jwtAuthenticate] },
		createProductController
	);
	done();
}
