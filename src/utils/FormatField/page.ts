import { titleize } from 'underscore.string';

export default function formatField(value: string) {

	// pegando o valor da string e removendo os
	// espaços no final e no começo dela

	const inputValue = value.trim();
	
	// capitalizando a frase e transformando ela
	// em um array de palavras

	const words = titleize(inputValue).split(' ');
	
	// Converte para minúsculo palavras que tem 2 letras
	
	for (let i = 0; i < words.length; i++) {
		if (words[i].length == 2) {
			words[i] = words[i].toLowerCase();
		}
	}
	
	// transformando o array de novo em
	// uma string e retornando ele
	
	return words.join(' ');
}