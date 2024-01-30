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

async function validateUserInput(userData: UserData | UserLogin, isLogin = false) {
	const requiredFields = ['email', 'password'];
	if (!isLogin) requiredFields.push('name');

	for (const field of requiredFields) {
		if (!userData[field]) {
			throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
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
