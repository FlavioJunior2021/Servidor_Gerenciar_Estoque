import { Role, User } from "@prisma/client";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

interface UserData extends Prisma.UserUncheckedCreateInput {
	email: string;
	password: string;
	name: string;
	role?: Role;
}

interface UserUpdate extends Prisma.UserUpdateInput {
	email: string;
	name?: string;
	password?: string;
	role?: Role;
}

interface UserLogin {
	email: string;
	password: string;
}

interface DeleteUser {
	id: string
}

async function validateUserInput(
	userData: UserData | UserLogin,
	isLogin = false
) {
	const requiredFields = ["email", "password"];
	if (!isLogin) requiredFields.push("name");

	for (const field of requiredFields) {
		if (!userData[field]) {
			throw new Error(
				`${field.charAt(0).toUpperCase() + field.slice(1)} is required`
			);
		}
	}
}

export async function createUser(userData: UserData): Promise<User> {
	await validateUserInput(userData);

	const existingUser = await prisma.user.findFirst({
		where: {
			email: userData.email,
		},
	});

	if (existingUser) {
		throw new Error("User already registered with this email");
	}

	userData.password = bcrypt.hashSync(userData.password, 10);

	return prisma.user.create({ data: userData });
}

export async function loginUser(UserLogin: UserLogin): Promise<User> {
	await validateUserInput(UserLogin, true);

	const userLoginCredentials = await prisma.user.findFirst({
		where: {
			email: UserLogin.email,
		},
	});

	if (!userLoginCredentials) {
		throw new Error("User does not exist");
	}

	if (!bcrypt.compareSync(UserLogin.password, userLoginCredentials.password)) {
		throw new Error("Invalid credentials");
	}

	return userLoginCredentials;
}

export async function updateUser(userUpdate: UserUpdate): Promise<User> {
	const { email, name, password, role } = userUpdate;

	if (!email) throw new Error("Email is required");

	const existingUser = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});

	if (!existingUser) {
		throw new Error("User does not exist");
	}

	if (password) {
		userUpdate.password = bcrypt.hashSync(password, 10);
	}

	return await prisma.user.update({
		where: { email: email },
		data: {
			name: name,
			password: userUpdate.password,
			role: role,
		},
	});
}

export async function deleteUser(deleteUser: DeleteUser) {
	const { id } = deleteUser;

	if (!id) throw new Error("ID is required");

	const existingUser = await prisma.user.findUniqueOrThrow({
		where: {
			id: id,
		},
	});

	if (!existingUser) {
		throw new Error("User does not exist");
	}

	await prisma.user.delete({
		where: { id: id },
	});
}

export async function getUser(): Promise<User[]> {
	return await prisma.user.findMany();
}