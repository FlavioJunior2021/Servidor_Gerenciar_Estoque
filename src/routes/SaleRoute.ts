import { FastifyInstance } from "fastify";
import { registerSaleController } from "../controllers/SaleController";
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
