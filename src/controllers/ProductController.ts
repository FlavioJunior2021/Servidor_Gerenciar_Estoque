import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
	createProduct,
	deleteProduct,
	getProducts,
	getProductsById,
	getProductsByName,
	updateProduct,
} from "../services/ProductService";

const productSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	quantity: z.number(),
});

const paramsSchema = z.object({
	id: z.string().cuid(),
});

const idProductSchema = z.object({
	id: z.string().cuid(),
});

const nameProductSchema = z.object({
	name: z.string(),
});

export async function createProductController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = productSchema.parse(request.body);

		const product = await createProduct(validatedData);

		reply.code(201).send(product);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function deleteProductController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = idProductSchema.parse(request.params);

		await deleteProduct(validatedData);

		reply.code(201).send("Deleted");
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function getProductsController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const products = await getProducts();

		reply.code(201).send(products);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function getProductsByIdController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = idProductSchema.parse(request.params);

		const product = await getProductsById(validatedData);

		reply.code(201).send(product);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function getProductsByNameController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validateName = nameProductSchema.parse(request.params);
		const product = await getProductsByName(validateName);
		reply.code(201).send(product);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}

export async function updateProductController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = productSchema.parse(request.body);
		const validateID = paramsSchema.parse(request.params);

		const product = await updateProduct(validatedData, validateID);

		reply.code(201).send(product);
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}
