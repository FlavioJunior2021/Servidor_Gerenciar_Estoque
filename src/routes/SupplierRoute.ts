import { FastifyInstance } from "fastify";
import { createSupplierController, createProductSupplierController, getProductsSupplierController, updateSupplierController, deleteSupplierController, getSupplierController } from "../controllers/SupplierControllert";
import { jwtAuthenticate } from "../config/jwt";

export function createSupplierRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.post(
		"/supplier/create",
		{ preValidation: [jwtAuthenticate] },
		createSupplierController
	);
	done();
}

export function updateSupplierRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.put(
		"/supplier/:id",
		{ preValidation: [jwtAuthenticate] },
		updateSupplierController
	);
	done();
}

export function deleteSupplierRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.delete(
		"/supplier/:id",
		{ preValidation: [jwtAuthenticate] },
		deleteSupplierController
	);
	done();
}

export function getSupplierRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/suppliers/",
		{ preValidation: [jwtAuthenticate] },
		getSupplierController
	);
	done();
}

export function getProductsSupplierRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/productssupplier/",
		{ preValidation: [jwtAuthenticate] },
		getProductsSupplierController
	);
	done();
}

export function createproductSupplierRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.post(
		"/productsupplier/create",
		{ preValidation: [jwtAuthenticate] },
		createProductSupplierController
	);
	done();
}