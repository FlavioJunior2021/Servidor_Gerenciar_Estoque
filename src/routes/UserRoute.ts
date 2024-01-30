import { FastifyInstance } from "fastify";
import {
	createUserController,
	authUserController,
} from "../controllers/UserController";

export function creatUserRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.post("/user/create", createUserController);
	done();
}

export function authUserRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.post("/user/auth", authUserController);
	done();
}

