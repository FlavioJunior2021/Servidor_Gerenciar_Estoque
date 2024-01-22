import { FastifyReply, FastifyRequest } from "fastify";

export async function jwtAuthenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		await request.jwtVerify();
	} catch (error) {
		reply.code(400).send({ error: error.message });
	}
}
