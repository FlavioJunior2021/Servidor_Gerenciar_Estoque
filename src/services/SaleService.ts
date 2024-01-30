import { Sale } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

interface SaleData {
	productId: string;
	quantity: number;
}

export async function registerSale(saleData: SaleData): Promise<Sale> {
	if (!saleData.productId) {
		throw new Error("productID is required");
	}

	if (!saleData.quantity) {
		throw new Error("Enter the quantity of products sold");
	}

	const existingProduct = await prisma.product.findUniqueOrThrow({
		where: {
			id: saleData.productId,
		},
	});

	if (!existingProduct) {
		throw new Error("The product does not exist");
	}

	if (saleData.quantity > existingProduct.quantity) {
		throw new Error("Quantity in stock less than requested");
	}

	const newQuantity = existingProduct.quantity - saleData.quantity;
	const salePrice = saleData.quantity * existingProduct.price;

	await prisma.product.update({
		where: {
			id: saleData.productId,
		},
		data: {
			quantity: newQuantity,
		},
	});

	const sale = await prisma.sale.create({
		data: {
			quantity: saleData.quantity,
			salePrice: salePrice,
			productId: existingProduct.id
		},
	});

	return sale;
}
