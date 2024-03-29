import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {
	createSupplier,
	createProductSupplier,
	getProductsSupplier,
	updateSupplier,
	deleteSupplier,
	getSupplier,
} from "../services/SupplierService";

const supplierSchema = z.object({
	name: z.string(),
	contact: z.string(),
});

const supplierParamsSchema = z.object({
	id: z.string(),
});

const createProductSupplierSchema = z.object({
	productId: z.string(),
	supplierId: z.string(),
});

async function handleControllerError(error: Error, reply: FastifyReply) {
	reply.code(400).send({ error: error.message });
}

export async function createSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = supplierSchema.parse(request.body);
		const supplier = await createSupplier(validatedData);
		reply.code(201).send(supplier);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function updateSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = supplierSchema.parse(request.body);
		const validateId = supplierParamsSchema.parse(request.params);
		const supplier = await updateSupplier(validatedData, validateId.id);
		reply.code(201).send(supplier);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function deleteSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validateId = supplierParamsSchema.parse(request.params);
		await deleteSupplier(validateId.id);
		reply.code(201).send("Deleted");
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function getSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const suppliers = await getSupplier();
		reply.code(201).send(suppliers);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function createProductSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = createProductSupplierSchema.parse(request.body);
		const productSupplier = await createProductSupplier(validatedData);
		reply.code(201).send(productSupplier);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function getProductsSupplierController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const productSupplier = await getProductsSupplier();
		reply.code(201).send(productSupplier);
	} catch (error) {
		handleControllerError(error, reply);
	}
}
