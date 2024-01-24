import { FastifyInstance } from "fastify";
import { createProductController, deleteProductController, getProductsController } from "../controllers/ProductController";
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

export function deleteProductRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.delete(
		"/product/:id",
		{ preValidation: [jwtAuthenticate] },
		deleteProductController
	);
	done();
}

export function getProductsRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/products",
		{ preValidation: [jwtAuthenticate] },
		getProductsController
	);
	done();
}