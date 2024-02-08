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

interface ProductName {
	name: string;
}

export async function createProduct(
	productData: ProductData
): Promise<Product> {
	const { name, description, price, quantity } = productData;
	if (!name) {
		throw new Error("Name is required");
	}

	if (!description) {
		throw new Error("Description is required");
	}

	if (!price) {
		throw new Error("Price is required");
	}

	if (!quantity) {
		throw new Error("Quantity is required");
	}

	const existingProduct = await prisma.product.findFirst({
		where: {
			name: name,
		},
	});

	if (existingProduct) throw new Error("Product already registered");

	const product = await prisma.product.create({
		data: productData,
	});

	return product;
}

export async function deleteProduct(productID: ProductID) {
	const { id } = productID;

	if (!id) throw new Error("ID is required");

	const existingProduct = await prisma.product.findUnique({
		where: {
			id: id,
		},
	});

	if (!existingProduct) throw new Error("The product does not exist in stock");

	await prisma.sale.deleteMany({
		where: {
			productId: id,
		},
	});

	await prisma.product.delete({
		where: {
			id: id,
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
	const { id } = productID;
	const product = await prisma.product.findUnique({
		where: {
			id: id,
		},
	});
	if (!product) throw new Error(`Product with ID: ${id} not found.`);

	return product;
}

export async function getProductsByName(
	ProductName: ProductName
): Promise<Product> {
	const { name } = ProductName;
	
	const product = await prisma.product.findFirst({
		where: { name: { contains: name } },
	});

	if (!product) throw new Error(`Product with name: ${name} not found.`);

	return product;
}

export async function updateProduct(
	productData: ProductData,
	productID: ProductID
): Promise<Product> {
	const { name, description, price, quantity } = productData;
	const { id } = productID;

	if (!name) {
		throw new Error("Name is required");
	}

	if (!description) {
		throw new Error("Description is required");
	}

	if (!price) {
		throw new Error("Price is required");
	}

	if (!quantity) {
		throw new Error("Quantity is required");
	}

	const existingProduct = await prisma.product.findFirstOrThrow({
		where: {
			id: id,
		},
	});

	if (!existingProduct) throw new Error("The product does not exist in stock");
	
	const product = await prisma.product.update({
		where: {
			id: id,
		},
		data: productData,
	});

	return product;
}
