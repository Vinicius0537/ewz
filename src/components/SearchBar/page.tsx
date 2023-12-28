import { crossIcon, searchIcon } from '@/src/components/ResponsiveIcons/page';

import React, { useState, useEffect } from 'react';

type searchBarProps = {
	close: {
		onClick: () => void;
	};
	search: {
		onSubmit: (event: React.FormEvent) => void;
	};
	input: {
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	};
};

export function SearchBar({ close, search, input }: searchBarProps) {
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
		<div className='flex flex-col'>
			<div className='flex justify-between mb-5'>
				<h1 className='text-[20pt] 3xl:text-5xl 3xl:mb-5 text-white font-roboto font-bold'>
					Pontos de Coleta
				</h1>
				{/* botão para fechar a barra de pesquisa */}
				<button onClick={close.onClick} type='button'>
					{crossIcon({
						width: pageWidth,
						normal: {
							styleIcon: 'text-white',
							iconSize: 24,
						},
						_3xl: {
							styleIcon: 'text-white',
							iconSize: 48,
						},
					})}
				</button>
			</div>
			{/* barra de pesquisa */}
			<form onSubmit={search.onSubmit} id='searchBarForm'>
				<label
					className='flex text-white font-roboto font-bold mb-3 3xl:mb-8 text-lg 3xl:text-3xl'
					htmlFor='searchBar'
				>
					Cidade
				</label>
				<div className='flex items-stretch'>
					<input
						type='text'
						id='searchBar'
						className='
					
							bg-white 3xs:w-[184px] 2xs:w-56 xs:w-64
							sm:w-80 md:w-80 xl:w-[380px] 2xl:w-[380px] 
							3xl:w-[650px] 3xl:h-[120px] rounded-l-xl 3xl:rounded-l-2xl
					
							3xs:placeholder:text-base xl:placeholder:text-xl 3xl:text-4xl 3xl:placeholder:text-4xl placeholder:text-lg
					
							3xs:px-[11px] 2xs:px-6 xs:px-8 sm:px-8 md:px-8 xl:px-8
							2xl:px-8 3xl:px-12
					
							text-black placeholder:font-roboto placeholder:font-medium outline-none focus:border-[5px] focus:border-solid focus:border-green-secondary'
						placeholder='Pesquisar por cidade'
						spellCheck={false}
						onChange={input.onChange}
					/>
					<button
						type='submit'
						className='p-3 bg-green-secondary rounded-r-xl 3xl:rounded-r-2xl border-[5px] border-solid border-green-secondary'
					>
						{searchIcon({
							width: pageWidth,
							normal: {
								styleIcon: 'text-white',
								iconSize: 48,
							},
							_3xl: {
								styleIcon: 'text-white',
								iconSize: 85,
							},
						})}
					</button>
				</div>
			</form>
		</div>
	);
}
