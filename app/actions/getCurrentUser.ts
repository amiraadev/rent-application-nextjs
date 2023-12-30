/** @format */

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import prisma from "@/app/libs/prismadb";

export async function getSession() {
	return await getServerSession(authOptions);
}
export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const CurrentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		if (!CurrentUser) {
			return null;
		}

		return {
            ...CurrentUser,
            createdAt:CurrentUser.createdAt?.toISOString(),
            updatedAt:CurrentUser.updatedAt?.toISOString(),
            emailVerified:CurrentUser.emailVerified?.toISOString() || null,
        };
	} catch (error) {
		return null;
	}
}
