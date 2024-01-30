import { ProductSupplier, Supplier } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

interface SupplierData extends Prisma.SupplierUncheckedCreateInput {
	name: string;
	contact: string;
}

interface ProductSupplierData extends Prisma.ProductSupplierUncheckedCreateInput {
	productId: string;
	supplierId: string;
}

export async function createSupplier(
	supplierData: SupplierData
): Promise<Supplier> {
	if (!supplierData.contact) {
		throw new Error("Contact is required");
	}

	if (!supplierData.name) {
		throw new Error("Name is required");
	}

	const existingSupplier = await prisma.supplier.findFirst({
		where: {
			name: supplierData.name,
		},
	});

	if (existingSupplier) {
		throw new Error("Supplier already registered");
	}

	const supplier = await prisma.supplier.create({
		data: supplierData,
	});

	return supplier;
}

export async function createProductSupplier(productSupllier: ProductSupplierData): Promise<ProductSupplier> {
	if(!productSupllier.productId) {
		throw new Error("ProductId is required");
	}
	if(!productSupllier.supplierId) {
		throw new Error("SupplierId is required");
	}

	const newProductSupplier = await prisma.productSupplier.create({
		data: productSupllier
	})

	return newProductSupplier
}

export async function getProductsSupplier(): Promise<ProductSupplier[]> {
	const productSupllier = await prisma.productSupplier.findMany();
	return productSupllier
}