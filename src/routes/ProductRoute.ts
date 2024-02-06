import { FastifyInstance } from "fastify";
import { createProductController, deleteProductController, getProductsByIdController, getProductsByNameController, getProductsController, updateProductController } from "../controllers/ProductController";
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

export function getProductsByIdRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/product/id/:id",
		{ preValidation: [jwtAuthenticate] },
		getProductsByIdController
	);
	done();
}

export function getProductsByNameRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/product/name/:name",
		{ preValidation: [jwtAuthenticate] },
		getProductsByNameController
	);
	done();
}

export function updateProductRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.put(
		"/product/update/:id",
		{ preValidation: [jwtAuthenticate] },
		updateProductController
	);
	done();
}
