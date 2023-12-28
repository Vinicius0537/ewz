import Image from 'next/image';
import avatar from '@/src/assets/avatar.png';

import { useState, useEffect, useRef } from 'react';

type avatarProps = {
	width: number;
	styleAvatar: string;
};

export function Avatar({ width, styleAvatar }: avatarProps) {
	const [shouldDisplayAvatar, setShouldDisplayAvatar] = useState(true);

	const timeoutId = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		function handleFocus() {
			const searchBarFocus = document.querySelector('#searchBar:focus');

			// Impede a ação de exibir o avatar se o temporizador
			// estiver definido e a barra de pesquisa estiver em
			// foco, cancelando o temporizador e desativando a
			// exibição do avatar

			if (searchBarFocus) {
				if (timeoutId.current) {
					clearTimeout(timeoutId.current);
				}
				setShouldDisplayAvatar(false);
			} else {
				// Se a barra de pesquisa não estiver em foco,
				// inicia um temporizador para ativar a exibição
				// do avatar após 500 milissegundos
				timeoutId.current = setTimeout(() => {
					setShouldDisplayAvatar(true);
				}, 500);
			}
		}

		document.addEventListener('focusin', handleFocus);
		document.addEventListener('focusout', handleFocus);

		return () => {
			document.removeEventListener('focusin', handleFocus);
			document.removeEventListener('focusout', handleFocus);
		};
	}, []);

	if (shouldDisplayAvatar && width >= 898) {
		return (
			<Image
				src={avatar}
				alt='avatar de uma mulher jogando o lixo fora'
				className={styleAvatar}
				priority
			/>
		);
	} else if (width >= 1200) {
		return (
			<Image
				src={avatar}
				alt='avatar de uma mulher jogando o lixo fora'
				className={styleAvatar}
				priority
			/>
		);
	}
}