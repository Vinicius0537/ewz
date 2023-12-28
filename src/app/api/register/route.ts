import { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { upload } from './upload';
import { validate } from './validateFields';
import formatField from '@/src/utils/FormatField/page';
import { sendToDatabase } from './sendToDatabase';

type RegisterData = {
	image: any,
	entity: string,
	street: string,
	number: any,
	state: string,
	city: string,
	telephone: string,
	email: string;
};

export async function POST(req: NextRequest) {

	try {

		// Aguarda a conclusão do processo de extração 
		// dos dados do formulário
		const data = await req.formData();

		// pegando os campos do formulário

		const file = data.get('image') as File;

		const entityForm = data.get('entity') as string;
		const streetForm = data.get('street') as string;

		const entityNumberForm = data.get('entityNumber') as string;
		const state = data.get('state') as string;

		const cityForm = data.get('city') as string;

		const telephone = data.get('telephone') as string;

		const email = data.get('email') as string;

		// formatando os campos

		const entity = formatField(entityForm);
		const street = formatField(streetForm);
		const city = formatField(cityForm);

		// criando o array fields

		const fields = [
			file.name, entity, street,
			entityNumberForm, state,
			city, telephone, email,
		];

		// validando os campos

		const registerData: RegisterData = {
			image: file,
			entity: entity,
			street: street,
			number: entityNumberForm,
			state: state,
			city: city,
			telephone: telephone,
			email: email
		};

		const validateFieldsResponse = await validate(
			registerData, fields
		);

		const validateFieldsData = await validateFieldsResponse.json();

		if (!validateFieldsData.success) {
			return NextResponse.json(validateFieldsData.errors);
		}

		// fazendo o upload da imagem

		const uploadResponse = await upload(file, registerData);

		if (uploadResponse) {

			const uploadData = await uploadResponse.json();

			if (uploadData.success) {
				registerData.image = uploadData.fileURL;
			}
		}

		// enviando os dados para o banco de dados

		const entityNumber = Number(entityNumberForm);

		registerData.number = entityNumber;

		const sendResponse = await sendToDatabase(registerData);

		const sendData = await sendResponse.json();

		if (!sendData.success) {
			return NextResponse.json({
				success: sendData.success,
				error: sendData.error
			});
		}
		return NextResponse.json([
			{
				success: sendData.success
			},
			sendData.register
		]);
	} catch (error: any) {
		return NextResponse.json({
			success: false,
			error: `Não foi possível cadastrar os dados, ${error}`
		});
	}
}