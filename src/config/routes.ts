import { createProductRoute, deleteProductRoute } from "../routes/ProductRoute";
import { registerSaleRoute } from "../routes/SaleRoute";
import { authUserRoute, creatUserRoute } from "../routes/UserRoute";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [creatUserRoute, authUserRoute, createProductRoute, deleteProductRoute, registerSaleRoute];
	routes.forEach((route) => {
		app.register(route);
	});
}