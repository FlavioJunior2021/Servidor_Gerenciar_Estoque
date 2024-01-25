import { createProductRoute, deleteProductRoute, getProductsRoute, updateProductRoute } from "../routes/ProductRoute";
import { registerSaleRoute } from "../routes/SaleRoute";
import { createSupplierRoute } from "../routes/SupplierRoute";
import { authUserRoute, creatUserRoute } from "../routes/UserRoute";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [creatUserRoute, authUserRoute, createProductRoute, deleteProductRoute, updateProductRoute, getProductsRoute, registerSaleRoute, createSupplierRoute];
	routes.forEach((route) => {
		app.register(route);
	});
}