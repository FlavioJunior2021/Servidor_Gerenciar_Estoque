import { createProductRoute, deleteProductRoute, getProductsByIdRoute, getProductsByNameRoute, getProductsRoute, updateProductRoute } from "../routes/ProductRoute";
import { getSaleRoute, registerSaleRoute } from "../routes/SaleRoute";
import { createSupplierRoute, createproductSupplierRoute, deleteSupplierRoute, getProductsSupplierRoute, getSupplierRoute, updateSupplierRoute } from "../routes/SupplierRoute";
import { authUserRoute, creatUserRoute, deleteUserRoute, getUserRoute, updateUserRoute } from "../routes/UserRoute";
import { app } from "./fastify";

export function registerRoutes() {
	const routes = [creatUserRoute, authUserRoute, updateUserRoute, deleteUserRoute, getUserRoute, createProductRoute, deleteProductRoute, updateProductRoute, getProductsRoute, getProductsByIdRoute, getProductsByNameRoute, registerSaleRoute, getSaleRoute, createSupplierRoute, updateSupplierRoute, deleteSupplierRoute, getSupplierRoute, createproductSupplierRoute, getProductsSupplierRoute];
	routes.forEach((route) => {
		app.register(route);
	});
}