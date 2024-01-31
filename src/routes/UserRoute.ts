import { FastifyInstance } from "fastify";
import {
	createUserController,
	authUserController,
	updateUserController,
	deleteUserController,
	getUserController,
} from "../controllers/UserController";
import { jwtAuthenticate } from "../config/jwt";

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

export function updateUserRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.put(
		"/user/:id",
		{ preValidation: [jwtAuthenticate] },
		updateUserController
	);
	done();
}

export function deleteUserRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.delete(
		"/user/:id",
		{ preValidation: [jwtAuthenticate] },
		deleteUserController
	);
	done();
}

export function getUserRoute(
	fastify: FastifyInstance,
	options: any,
	done: any
) {
	fastify.get(
		"/users/",
		{ preValidation: [jwtAuthenticate] },
		getUserController
	);
	done();
}