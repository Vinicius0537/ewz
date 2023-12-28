import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';

type searchButtonProps = {
	onClick: () => void;
};

export function SearchButton(searchButton: searchButtonProps) {
	return (
		<button
			onClick={searchButton.onClick}
			className='inline-flex flex-row items-center bg-green-primary rounded-xl 3xl:rounded-2xl 3xs:w-64 2xs:w-72 xs:w-80 sm:w-80 md:w-80 xl:w-[380px]
				2xl:w-[380px] 3xl:w-[650px] 3xl:h-[120px] h-[68px]'
		>
			<span className='h-full p-3 bg-green-secondary rounded-l-xl 3xl:rounded-l-2xl'>
				<SearchIcon className='h-full w-full text-white' />
			</span>
			<span
				className='
			
					text-white 3xs:text-base sm:text-xl xl:text-xl 2xl:text-xl 3xl:text-4xl text-lg
			
					font-roboto font-medium 3xs:px-1.5 2xs:px-2 xs:px-4 sm:px-4 md:px-4 xl:px-6 2xl:px-8 3xl:px-12'
			>
				Buscar pontos de coleta
			</span>
		</button>
	);
}
