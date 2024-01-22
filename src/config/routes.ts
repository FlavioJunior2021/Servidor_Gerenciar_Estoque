import { createProductRoute } from "../routes/ProductRoute";
import { authUserRoute, creatUserRoute } from "../routes/UserRoute";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [creatUserRoute, authUserRoute, createProductRoute];
	routes.forEach((route) => {
		app.register(route);
	});
}