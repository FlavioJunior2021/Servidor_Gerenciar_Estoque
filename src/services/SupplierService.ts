import { Supplier } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

interface SupplierData extends Prisma.SupplierUncheckedCreateInput {
	name: string;
	contact: string;
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
