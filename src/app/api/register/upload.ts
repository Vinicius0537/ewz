import { storage } from '@/firebaseStorage.config';

import { ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

import { NextResponse } from 'next/server';

import { registerDataExists } from './registerData';

import { basename } from 'path';

type Fields = {
	entity: string;
	telephone: string;
	email: string;
};

export async function upload(file: File, registerData: Fields) {

	try {

		const registerExists = await registerDataExists(registerData);

		if (!registerExists) {

			// cria um nome de arquivo único

			const filename = `${Date.now()}_${basename(file.name)}`;

			// definindo o caminho da imagem no firebase

			const path = ref(storage, `/uploads/${filename}`);

			// fazendo o upload da imagem

			await uploadBytes(path, file);

			// pegando a url da imagem no firebase

			const url = await getDownloadURL(path);

			return NextResponse.json({ success: true, fileURL: url });
		}

	} catch (error: any) {
		return NextResponse.json({ success: false, error: `Falha no upload da imagem, ${error}` });
	}
}