import { Sale } from "@prisma/client";
import { prisma } from "../config/prisma";

interface SaleData {
	productId: string;
	quantity: number;
}

interface SaleProductId {
	id: string;
}

export async function registerSale(saleData: SaleData): Promise<Sale> {
	const { productId, quantity } = saleData;

	if (!productId) throw new Error("productID is required");
	if (!quantity) throw new Error("Enter the quantity of products sold");

	const existingProduct = await prisma.product.findUniqueOrThrow({
		where: { id: productId },
	});

	if (quantity > existingProduct.quantity) {
		throw new Error("Quantity in stock less than requested");
	}

	await prisma.product.update({
		where: { id: productId },
		data: { quantity: existingProduct.quantity - quantity },
	});

	return await prisma.sale.create({
		data: {
			quantity: quantity,
			salePrice: quantity * existingProduct.price,
			productId: productId,
		},
	});
}

export async function getSales(): Promise<Sale[]> {
	return await prisma.sale.findMany();
}

export async function getSalesById(saleProductId: SaleProductId): Promise<Sale[]> {
	const { id } = saleProductId;

	if (!id) throw new Error("productID is required");

	const existingProduct = await prisma.product.findUniqueOrThrow({
		where: { id: id },
	});

	if (!existingProduct) throw new Error(`Product with ID: ${existingProduct} not found.`);

	return await prisma.sale.findMany({
		where: { productId: id },
	});
}
