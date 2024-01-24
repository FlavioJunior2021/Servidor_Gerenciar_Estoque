// services/userService.ts
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

interface UserLogin {
	email: string;
	password: string;
}

export async function createUser(userData: UserData): Promise<User> {
	if (!userData.email) {
		throw new Error("Email is required");
	}

	if (!userData.password) {
		throw new Error("Password is required");
	}

	if (!userData.name) {
		throw new Error("Name is required");
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			email: userData.email,
		},
	});

	if (existingUser) {
		throw new Error("User already registered with this email");
	}

	const hashedPassword = bcrypt.hashSync(userData.password, 10);
	userData.password = hashedPassword;

	const user = await prisma.user.create({
		data: userData,
	});

	return user;
}

export async function loginUser(UserLogin: UserLogin): Promise<User> {
	if (!UserLogin.email) {
		throw new Error("Email is required");
	}

	if (!UserLogin.password) {
		throw new Error("Password is required");
	}

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
