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

export function validateContactNumber(contact: string) {
	const contactRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
	if (!contactRegex.test(contact)) {
		throw new Error("Invalid contact number");
	}
}

async function findSupplierById(id: string) {
	return await prisma.supplier.findUnique({
		where: { id },
	});
}

async function findSupplierByName(name: string) {
	return await prisma.supplier.findFirst({
		where: { name },
	});
}

export async function createSupplier(
	supplierData: SupplierData
): Promise<Supplier> {
	const { name, contact } = supplierData;

	if (!contact) throw new Error("Contact is required");
	if (!name) throw new Error("Name is required");

	validateContactNumber(contact);

	const existingSupplier = await findSupplierByName(name);
	if (existingSupplier) throw new Error("Supplier already registered");

	return await prisma.supplier.create({ data: supplierData });
}

export async function updateSupplier(
	supplierData: SupplierData,
	supplierId: string
): Promise<Supplier> {
	const { name, contact } = supplierData;

	if (!contact) throw new Error("Contact is required");
	if (!name) throw new Error("Name is required");

	validateContactNumber(contact);

	const existingSupplier = await findSupplierById(supplierId);
	if (!existingSupplier)
		throw new Error("The supplier does not exist in database");

	return await prisma.supplier.update({
		where: { id: supplierId },
		data: supplierData,
	});
}

export async function createProductSupplier(
	productSupplierData: ProductSupplierData
): Promise<ProductSupplier> {
	const { productId, supplierId } = productSupplierData;

	if (!productId) throw new Error("ProductId is required");
	if (!supplierId) throw new Error("SupplierId is required");

	return await prisma.productSupplier.create({
		data: productSupplierData,
	});
}

export async function getProductsSupplier(): Promise<ProductSupplier[]> {
	return await prisma.productSupplier.findMany();
}
