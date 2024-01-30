import { FastifyInstance } from "fastify";
import { createSupplierController, createProductSupplierController, getProductsSupplierController } from "../controllers/SupplierControllert";
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