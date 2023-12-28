'use client';

import { SearchButton } from '@/src/components/SearchButton/page';
import { SearchBar } from '@/src/components/SearchBar/page';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import Image from 'next/image';
import Logo from '@/src/assets/Logo.svg';

// importando a função para responsividade
import { responsiveLinkHome } from '@/src/components/ResponsiveLinkHome/page';
import formatField from '@/src/utils/FormatField/page';

import { Avatar } from '@/src/components/Avatar/page';

export default function Home() {
	const [isSearching, setIsSearch] = useState(false);
	const [city, setCity] = useState('');

	const router = useRouter();

	function handleInput(e: FormEvent) {
		const target = e.target as HTMLInputElement;
		setCity(target.value);
	}

	function searchOverlay() {
		if (isSearching) {
			return (
				<div className='fixed inset-0 bg-shadow bg-opacity-[0.85] z-10'>
					<div className='flex flex-col justify-center items-center h-full z-20'>
						<SearchBar
							// fechar barra de pesquisa
							close={{
								onClick: () => {
									setIsSearch(false);
								},
							}}
							// remover a mensagem de erro toda vez que o
							// usuário começar a digitar
							input={{ onChange: (e) => handleInput(e) }}
							// pesquisar por cidade
							search={{
								onSubmit: (event) => {
									event.preventDefault();
									router.push(`/search?city=${formatField(city)}`);
								},
							}}
						/>
					</div>
				</div>
			);
		}
	}

	const [pageWidth, setPageWidth] = useState(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setPageWidth(window.innerWidth);
		}
		function handleResize() {
			setPageWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		// Remova o event listener quando o componente for desmontado
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<HelmetProvider>
			<Helmet>
				<title>Pontos de Coleta de Lixo Eletrônico</title>
				<meta
					name='description'
					content='Encontre pontos próximos de descarte de lixo eletrônico. Descarte seus eletrônicos de forma segura e sustentável, promovendo uma comunidade mais verde'
				/>
				<meta
					name='keywords'
					content='lixo eletrônico, reciclagem, coleta sustentável, descarte eletrônicos'
				/>
			</Helmet>
			<main className='flex flex-col p-8'>
				{searchOverlay()}
				<header>
					<nav className='flex justify-between'>
						<div className='relative w-[30vh] mr-6'>
							<Image
								className='object-cover w-full min-w-[200px]'
								src={Logo}
								alt='Logotipo'
								priority
							/>
						</div>
						{responsiveLinkHome({
							width: pageWidth,
							styleLink: 'inline-flex flex-row items-center mt-[3vh]',
							styleIcon: 'text-green-primary mr-[1vw]',
							iconSize: '4.5vh',
							styleLinkText:
								'text-stormyNight text-[3.5vh] font-roboto font-medium',
						})}
					</nav>
				</header>
				<div
					className='
					
					flex flex-col text-left sm:w-[90%] md:w-[51%] 
					xl:w-[47%] 2xl:w-[44%] 3xl:w-[80%]
				
					3xs:space-y-12 3xs:my-14 2xs:space-y-8 2xs:my-10 xs:space-y-12 xs:my-14 sm:space-y-20 sm:my-24 md:space-y-10 md:my-12 
					xl:space-y-14 xl:my-24 2xl:space-y-12 2xl:my-14 3xl:space-y-32 3xl:my-28'
				>
					<h1 className='text-stormyNight text-4xl sm:text-5xl 3xl:text-7xl font-ubuntu'>
						<strong>
							Junte-se a nós e ajude a preservar o planeta para as futuras
							gerações!
						</strong>
					</h1>
					<h2 className='text-riverGod text-2xl sm:text-3xl 3xl:text-5xl font-roboto font-normal'>
						Ajudamos as pessoas a reciclarem seu lixo eletrônico, contribuindo
						para um futuro sustentável e tecnologicamente responsável!
					</h2>
				</div>
				{/* abrir barra de pesquisa */}
				<SearchButton onClick={() => setIsSearch(true)} />
				<Avatar width={pageWidth} styleAvatar='fixed bottom-0 right-0' />
			</main>
		</HelmetProvider>
	);
}
