'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import Logo from '@/src/assets/Logo.svg';

// importando a função para responsividade
import responsiveLink from '@/src/components/ResponsiveLink/page';

export function NavBar() {
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
				{responsiveLink({
					width: pageWidth,
					styleLink: 'inline-flex flex-row items-center mt-[3vh]',
					styleIcon: 'text-green-primary mr-[1vw]',
					iconSize: '4.5vh',
					styleLinkText:
						'text-stormyNight text-[3.5vh] font-roboto font-medium',
				})}
			</nav>
		</header>
	);
}
