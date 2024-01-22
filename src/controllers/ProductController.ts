import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createProduct } from "../services/ProductService";

const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	quantity: z.number(),
});

export async function createProductController(request: FastifyRequest, reply: FastifyReply){
	try {
		const validatedData = productSchema.parse(request.body);

		const product = await createProduct(validatedData);

		reply.code(201).send(product)
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}