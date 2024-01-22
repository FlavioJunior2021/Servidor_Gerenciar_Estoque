import { createProductRoute, deleteProductRoute } from "../routes/ProductRoute";
import { authUserRoute, creatUserRoute } from "../routes/UserRoute";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [creatUserRoute, authUserRoute, createProductRoute, deleteProductRoute];
	routes.forEach((route) => {
		app.register(route);
	});
}