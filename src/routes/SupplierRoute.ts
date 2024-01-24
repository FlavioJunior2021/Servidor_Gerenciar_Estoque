import { FastifyInstance } from "fastify";
import { createSupplierController } from "../controllers/SupplierControllert";
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