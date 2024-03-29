import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getSales, getSalesById, registerSale } from "../services/SaleService";

const saleSchema = z.object({
	quantity: z.number(),
	productId: z.string().cuid(),
});

const paramsSchema = z.object({
	id: z.string(),
});

export async function registerSaleController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = saleSchema.parse(request.body);
		const sale = await registerSale(validatedData);
		reply.code(201).send(sale);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function getSaleController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const sale = await getSales();
		reply.code(201).send(sale);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function getSalesByIdController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = paramsSchema.parse(request.params);
		const sale = await getSalesById(validatedData);
		reply.code(201).send(sale);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}
