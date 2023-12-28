import { PrismaClient } from '@prisma/client';
import formatField from '@/src/utils/FormatField/page';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	
	const prisma = new PrismaClient();
	
	const response = [];

	try {
		
		const city = await req.text();

		const cityField = formatField(city.trim());

		const registerData = await prisma.register.findMany({
			select: {
				register_id: true, image: true,
				entity: true, street: true,
				number: true, state: true,
				city: true, telephone: true,
				email: true
			},
			where: {
				city: cityField
			}
		});

		if (registerData.length > 0) {
			response.push({
				success: true,
				points: registerData.length,
				register: registerData,
			});
		}
		else {
			response.push({ success: false, error: 'A cidade não foi encontrada no banco de dados' });
		}
	
	} catch (error: any) {
		response.push({
			success: false,
			error: `Não foi possível fazer a conexão com o banco de dados, ${error}`
		});
	}
	return NextResponse.json(response);
}