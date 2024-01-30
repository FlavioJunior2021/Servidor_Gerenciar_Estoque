import { FastifyReply, FastifyRequest } from "fastify";
import { string, z } from "zod";
import { createSupplier, createProductSupplier, getProductsSupplier } from "../services/SupplierService";

const supplierSchema = z.object({
	name: z.string(),
	contact: z.string(),
});

const createproductSupplierSchema = z.object({
	productId: z.string().cuid(),
	supplierId: z.string().cuid(),
})

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

export async function createProductSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = createproductSupplierSchema.parse(request.body);

		const productSupllier = await createProductSupplier(validatedData);

		reply.code(201).send(productSupllier);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function getProductsSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {

		const productSupllier = await getProductsSupplier();

		reply.code(201).send(productSupllier);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}