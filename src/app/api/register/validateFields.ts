import { NextResponse } from 'next/server';

type Fields = {
	image: File;
	entity: string;
	street: string;
	number: string;
	state: string;
	city: string;
	telephone: string;
	email: string;
};

function validateString(value: string, fieldName: string,
	errors: {
		success: boolean,
		error: string;
	}[]
) {

	if (/(^\s+)|(\s+$)/.test(value)) {
		errors.push({
			success: false,
			error: `A ${fieldName} não pode ter espaços no começo ou no final`
		});
	}

	if (/^[^A-Za-zÀ-ú\s]$/.test(value)) {
		errors.push({
			success: false,
			error: `A ${fieldName} tem que ter apenas letras`
		});
	}
}

export async function validate<Array>(
	registerData: Fields,
	fields: Array[]
) {

	const allowedImageTypes = ['image/jpeg', 'image/jpg'];
	const maxFileSize = 2 * Math.pow(1024, 2); // 2MB

	const isAllowedImageType = allowedImageTypes.includes(
		registerData.image.type
	);

	const errors = [];

	if (!fields.every(field => field)) {
		errors.push({
			success: false,
			error: 'Todos os campos devem ser preenchidos'
		});
	}

	// validando a imagem

	if (!isAllowedImageType) {
		errors.push({
			success: false,
			error: 'O Tipo do Arquivo está incorreto!'
		});
	}

	if (registerData.image.size > maxFileSize) {
		errors.push({
			success: false,
			error: 'O Arquivo excedeu 2MB'
		});
	}

	// validando o nome da entidade

	if (/(^\s+)|(\s+$)/.test(registerData.entity)) {
		errors.push({
			success: false,
			error: `O Nome não pode ter espaços no começo ou no final`
		});
	}

	if (/^[^A-Za-zÀ-ú\s]$/.test(registerData.entity)) {
		errors.push({
			success: false,
			error: `O Nome tem que ter apenas letras`
		});
	}

	// validando a rua

	validateString(registerData.street, 'Rua', errors);

	// validando o número

	const entityNumber = Number(registerData.number);
	const formatNumber = Number(registerData.number.slice(0, 3));
	
	if (entityNumber != formatNumber) {
		errors.push({
			success: false,
			error: 'O número tem que ter até 3 dígitos'
		});
	}

	if (/(^\s+)|(\s+$)/.test(registerData.number)) {
		errors.push({
			success: false,
			error: `O número não pode ter espaços no começo ou no final`
		});
	}
	
	// validando o estado

	if (!/[A-Z]{2}/.test(registerData.state)) {
		errors.push({
			success: false,
			error: `O Estado deve ter 2 letras e elas tem que ser maiúsculas`
		});
	}

	if (/(^\s+)|(\s+$)/.test(registerData.state)) {
		errors.push({
			success: false,
			error: `O Estado não pode ter espaços no começo ou no final`
		});
	}
	
	// validando a cidade

	validateString(registerData.city, 'Cidade', errors);

	// validando o número de celular
	
	if (!/^(\+\d{2})(\s\(\d{2}\)\s)(\d{4,5})-(\d{4})$/.test(registerData.telephone)) {
		errors.push({
			success: false,
			error: `O número de telefone está incorreto ${registerData.telephone}
			)}`
		});
	}

	if (/(^\s+)|(\s+$)/.test(registerData.telephone)) {
		errors.push({
			success: false,
			error: `O número de telefone não pode ter espaços no começo ou no final`
		});
	}
	
	// validando o email
	
	if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
		registerData.email
	)) {
		errors.push({
			success: false,
			error: 'O Email está incorreto'
		});
	}
	
	if (/(^\s+)|(\s+$)/.test(registerData.email)) {
		errors.push({
			success: false,
			error: `O email não pode ter espaços no começo ou no final`
		});
	}

	// Se houver erros, retorne a lista de erros
	if (errors.length > 0) {
		return NextResponse.json({ success: false, errors });
	}
	
	return NextResponse.json({ success: true });
}