import { FastifyInstance } from 'fastify';
import { createUserController } from '../controllers/createUserController';

export function creatUserRoute(fastify: FastifyInstance, options: any, done: any){
	fastify.post('/user/create', createUserController);
	done();
}