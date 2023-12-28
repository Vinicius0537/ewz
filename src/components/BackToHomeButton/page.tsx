import Link from 'next/link';

export function BackToHomeButton() {
	
	return (
		<Link
			href='/'
			className='p-3 bg-green-primary rounded-xl 3xl:rounded-2xl border-[5px] border-solid border-green-primary w-full flex flex-row justify-center'
			id='backToHomeButton'
		>
			<span className='text-white text-xl font-roboto ml-2'>Voltar para a Home</span>
		</Link>
	);
}
