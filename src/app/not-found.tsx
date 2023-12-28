import Image from 'next/image';
import _404Error from '@/src/assets/_404_Error.png';
import { BackToHomeButton } from '@/src/components/BackToHomeButton/page';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '404 Error: Page not found!',
};

export default function NotFound() {
	return (
		<main className='flex flex-col p-8 h-screen w-screen'>
			<div className='flex flex-col items-center justify-center h-full'>
				<Image src={_404Error} alt='Imagem para o erro 404' />
				<div className='w-[25rem] mt-10'>
					<BackToHomeButton />
				</div>
			</div>
		</main>
	);
}
