// services/userService.ts
import { Role, User } from "@prisma/client";
import { prisma } from "../lib/prisma";

interface UserData {
	email: string;
	password: string;
	name: string;
	role?: Role;
}

export async function createUser(userData: UserData): Promise<User> {

	const existingUser = await prisma.user.findFirst({
		where: {
			email: userData.email,
		},
	});

	if (existingUser) {
		throw new Error("User already registered with this email");
	}

	const user = await prisma.user.create({
		data: userData,
	});

	return user;
}
