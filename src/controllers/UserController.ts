import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createUser, loginUser } from "../services/UserService";

const userSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

const userAuthEschema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

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
		reply.code(400).send({ error: error.message });
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
		reply.code(400).send({ error: error.message });
	}
}
