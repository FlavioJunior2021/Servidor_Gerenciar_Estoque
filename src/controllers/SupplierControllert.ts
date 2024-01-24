import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createSupplier } from "../services/SupplierService";

const supplierSchema = z.object({
	name: z.string(),
	contact: z.string(),
});

export async function createSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = supplierSchema.parse(request.body);

		const supplier = await createSupplier(validatedData);

		reply.code(201).send(supplier);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}
