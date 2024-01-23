import { Product } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";


interface ProductData extends Prisma.ProductUncheckedCreateInput{
	name: string;
	description: string;
	quantity: number;
	price: number;
}

export async function createProduct(
	productData: ProductData
): Promise<Product> {
	if (!productData.name) {
		throw new Error("Name is required");
	}

	if (!productData.description) {
		throw new Error("Description is required");
	}

	if (!productData.price) {
		throw new Error("Price is required");
	}

	if (!productData.quantity) {
		throw new Error("Quantity is required");
	}

	const existingProduct = await prisma.product.findFirst({
		where: {
			name: productData.name,
		},
	});

	if (existingProduct) {
		throw new Error("Product already registered");
	}

	const product = await prisma.product.create({
		data: productData,
	});

	return product;
}

interface ProductID {
	id: string;
}

export async function deleteProduct(productID: ProductID) {
	if (!productID.id) {
		throw new Error("ID is required");
	}

	const existingProduct = await prisma.product.findUniqueOrThrow({
		where: {
			id: productID.id,
		},
	});

	if (!existingProduct) {
		throw new Error("The product does not exist in stock");
	}

	await prisma.product.delete({
		where: {
			id: productID.id,
		},
	});
}
