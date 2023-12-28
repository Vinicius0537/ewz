'use client';

import { mapIcon } from '@/src/components/ResponsiveIcons/page';
import Link from 'next/link';

import { useEffect, useState } from 'react';

type mapsButtonProps = {
	link: string
};

export function MapsButton(mapsButton: mapsButtonProps) {
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
		<Link
			href={mapsButton.link}
			target='_blank'
			className='p-3 bg-green-primary rounded-xl 3xl:rounded-2xl border-[5px] border-solid border-green-primary w-full flex flex-row justify-center'
			id='mapsButton'
		>
			{mapIcon({
				width: pageWidth,
				normal: {
					styleIcon: 'text-white',
					iconSize: 30,
				},
				_3xl: {
					styleIcon: 'text-white',
					iconSize: 67,
				},
			})}
			<span className='text-white text-xl font-roboto ml-2'>Google Maps</span>
		</Link>
	);
}
