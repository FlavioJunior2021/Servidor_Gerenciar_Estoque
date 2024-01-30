import { createProductRoute, deleteProductRoute, getProductsByIdRoute, getProductsRoute, updateProductRoute } from "../routes/ProductRoute";
import { registerSaleRoute } from "../routes/SaleRoute";
import { createSupplierRoute, createproductSupplierRoute, getProductsSupplierRoute, updateSupplierRoute } from "../routes/SupplierRoute";
import { authUserRoute, creatUserRoute } from "../routes/UserRoute";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [creatUserRoute, authUserRoute, createProductRoute, deleteProductRoute, updateProductRoute, getProductsRoute, getProductsByIdRoute, registerSaleRoute, createSupplierRoute, updateSupplierRoute, createproductSupplierRoute, getProductsSupplierRoute];
	routes.forEach((route) => {
		app.register(route);
	});
}