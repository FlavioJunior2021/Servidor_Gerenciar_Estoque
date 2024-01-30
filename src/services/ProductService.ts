import { Product } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

interface ProductData extends Prisma.ProductUncheckedCreateInput {
	name: string;
	description: string;
	quantity: number;
	price: number;
}

interface ProductID {
	id: string;
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

export async function deleteProduct(productID: ProductID) {
	if (!productID.id) {
		throw new Error("ID is required");
	}

	const existingProduct = await prisma.product.findUnique({
		where: {
			id: productID.id,
		},
	});

	if (!existingProduct) {
		throw new Error("The product does not exist in stock");
	}

	await prisma.sale.deleteMany({
		where: {
			productId: existingProduct.id,
		},
	});

	await prisma.product.delete({
		where: {
			id: productID.id,
		},
	});
}

export async function getProducts(): Promise<Product[]> {
	const products = await prisma.product.findMany({
		orderBy: {
			quantity: "asc",
		},
	});
	return products;
}

export async function getProductsById(productID: ProductID): Promise<Product> {
	const product = await prisma.product.findUniqueOrThrow({
		where: {
			id: productID.id,
		},
	});
	return product;
}

export async function updateProduct(
	productData: ProductData,
	productID: ProductID
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

	const existingProduct = await prisma.product.findFirstOrThrow({
		where: {
			id: productData.id,
		},
	});

	if (!existingProduct) {
		throw new Error("The product does not exist in stock");
	}

	const product = await prisma.product.update({
		where: {
			id: productID.id,
		},
		data: productData,
	});

	return product;
}
