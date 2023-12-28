import { PrismaClient } from '@prisma/client';

type Fields = {
	entity: string;
	telephone: string;
	email: string;
};

const prisma = new PrismaClient();

export async function registerDataExists(registerData: Fields) {
	
	return await prisma.register.findFirst({
		where: {
			entity: registerData.entity,
			telephone: registerData.telephone,
			email: registerData.email
		}
	});
}