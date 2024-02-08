import { FastifyInstance } from "fastify";
import {
	getSaleController,
	getSalesByIdController,
	registerSaleController,
} from "../controllers/SaleController";
import { jwtAuthenticate } from "../config/jwt";

export function registerSaleRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.post(
		"/sale/register",
		{ preValidation: [jwtAuthenticate] },
		registerSaleController
	);
	done();
}

export function getSaleRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/sale/",
		{ preValidation: [jwtAuthenticate] },
		getSaleController
	);
	done();
}

export function getSaleByIdRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/sale/:id",
		{ preValidation: [jwtAuthenticate] },
		getSalesByIdController
	);
	done();
}
