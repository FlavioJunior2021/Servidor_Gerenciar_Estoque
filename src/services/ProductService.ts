import { Product } from "@prisma/client";
import { prisma } from "../config/prisma";

interface ProductData {
	name: string;
	description: string;
	quantity: number;
	price: number;
}

export async function createProduct(productData: ProductData): Promise<Product> {
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
			name: productData.name
		}
	})

	if (existingProduct) {
		throw new Error("Product already registered");
	}

	const product = await prisma.product.create({
		data: productData,
	})

	return product;
}
