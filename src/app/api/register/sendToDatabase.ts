import { PrismaClient } from '@prisma/client';
import { registerDataExists } from './registerData';
import { NextResponse } from 'next/server';

type Fields = {
	image: string;
	entity: string;
	street: string;
	number: number;
	state: string;
	city: string;
	telephone: string;
	email: string;
};

const prisma = new PrismaClient();

export async function sendToDatabase(registerData: Fields) {

	try {
		
		const registerExists = await registerDataExists(registerData);
		
		if (!registerExists) {
			const register = await prisma.register.create({
				data: {
					image: registerData.image,
					entity: registerData.entity,
					street: registerData.street,
					number: registerData.number,
					state: registerData.state,
					city: registerData.city,
					telephone: registerData.telephone,
					email: registerData.email
				}
			});
			return NextResponse.json({ success: true, register });
		}
		return NextResponse.json({
			success: false,
			error: `Nome da entidade: ${registerData.entity}, Telefone: ${registerData.telephone} e Email: ${registerData.email} já existem no banco de dados`
		});
	} catch (error: any) {
		return NextResponse.json({
			success: false,
			error: `Não foi possível fazer a conexão com o banco de dados, ${error}`
		});
	}
}