import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "@prisma/client";
import { z } from "zod";
import { createUser, deleteUser, getUser, loginUser, updateUser } from "../services/UserService";

const userSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

const userUpdateSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.nativeEnum(Role),
})

const userAuthEschema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const userParamsSchema = z.object({
	id: z.string()
})

async function handleControllerError(error: Error, reply: FastifyReply) {
	reply.code(400).send({ error: error.message });
}

export async function createUserController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = userSchema.parse(request.body);
		const user = await createUser(validatedData);
		const token = request.server.jwt.sign(
			{
				name: user.name,
				email: user.email,
				role: user.role,
				id: user.id,
			},
			{
				sub: user.id,
				expiresIn: "30 days",
			}
		);
		reply.code(201).send(token);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function authUserController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = userAuthEschema.parse(request.body);
		const user = await loginUser(validatedData);
		const token = request.server.jwt.sign(
			{
				name: user.name,
				email: user.email,
				role: user.role,
				id: user.id,
			},
			{
				sub: user.id,
				expiresIn: "30 days",
			}
		);
		reply.code(201).send(token);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function updateUserController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validatedData = userUpdateSchema.parse(request.body);
		const newUser = await updateUser(validatedData);
		reply.code(201).send(newUser);
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function deleteUserController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const validateID = userParamsSchema.parse(request.params);
		await deleteUser(validateID);
		reply.code(201).send("Deleted");
	} catch (error) {
		handleControllerError(error, reply);
	}
}

export async function getUserController(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const users = await getUser();
		reply.code(201).send(users);
	} catch (error) {
		handleControllerError(error, reply);
	}
}
