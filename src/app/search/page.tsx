'use client';

import { MapsButton } from '@/src/components/MapsButton/page';
import { NavBar } from '@/src/components/NavBar/page';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FaPhoneAlt as Phone } from 'react-icons/fa';
import { IoMdMail as Email } from 'react-icons/io';

import { Helmet, HelmetProvider } from 'react-helmet-async';

type Fields = {
	entity: string;
	street: string;
	number: number;
	state: string;
	city: string;
};

export default function Search() {
	const searchParams = useSearchParams();

	const city = searchParams.get('city') as string;
	const [registerData, setRegisterData] = useState([]);

	const [points, setPoints] = useState(0);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const res = await fetch('/api/search', {
				method: 'POST',
				body: city,
			});

			const search = (await res.json())[0];

			if (search.success) {
				setRegisterData(search.register);
				setPoints(search.points);
			}
			setIsDataLoaded(true);
		}

		fetchData();
	}, [city, points]);

	function handlePoints() {
		const qtyPoints =
			points == 1
				? `Foi encontrado ${points} ponto de coleta cadastrado`
				: `Foram encontrados ${points} pontos de coleta cadastrados`;

		if (isDataLoaded) {
			return (
				<h1 className='text-2xl ml-8 text-stormyNight font-roboto font-medium'>
					{qtyPoints}
				</h1>
			);
		}
	}

	function decode(str: string) {
		const txt = document.createElement('textarea');

		txt.innerHTML = str;

		return txt.value;
	}

	function handleLocation(data: Fields) {
		const locationData = `
			${data.entity}, ${data.state}, 
			${data.city}, ${data.street}, 
			${decode('N&ordm;')} ${data.number}
		`;
		return locationData;
	}

	function entities() {
		return registerData.map((data: any) => (
			<div
				key={data.register_id}
				className='bg-white basis-0 rounded-2xl space-y-8 p-10 min-w-[35rem] h-[65rem]'
			>
				<img src={data.image} className='rounded-2xl h-1/2 w-full' alt='' />
				<div className='flex flex-col'>
					<strong className='text-stormyNight text-2xl font-ubuntu my-5'>
						{data.entity}
					</strong>
					<strong className='text-stormyNight font-ubuntu text-2xl'>
						Endereço
					</strong>
				</div>
				<p className='text-xl text-riverGod font-roboto'>
					{data.state}, {data.city}, {data.street}, N&ordm; {data.number}
				</p>

				<div className='flex flex-col'>
					<a
						className='text-xl font-roboto mb-5'
						href={`tel:${data.telephone}`}
					>
						<Phone className='inline-flex text-green-primary' />
						<span className='mx-2'>:</span>
						<span>{data.telephone}</span>
					</a>

					<a className='text-xl font-roboto' href={`mailto:${data.email}`}>
						<Email className='inline-flex text-green-primary' />
						<span className='mx-2'>:</span>
						<span>{data.email}</span>
					</a>
				</div>

				<br />

				<MapsButton
					link={`https://google.com/maps?q=${handleLocation(data)}`}
				/>
			</div>
		));
	}

	return (
		<HelmetProvider>
			<Helmet>
				<title>{`Pontos de Coleta em ${city}`}</title>
				<meta
					name='description'
					content={`Encontre pontos de coleta em ${city}. Descarte eletrônicos com responsabilidade para uma comunidade mais verde.`}
				/>
				<meta
					name='keywords'
					content={`pontos de coleta em ${city}, lixo eletrônico, descarte sustentável`}
				/>
			</Helmet>
			<main className='flex flex-col p-8'>
				<NavBar />
				<div className='my-20'>{handlePoints()}</div>
				<div className='flex flex-wrap gap-12 ml-8'>{entities()}</div>
			</main>
		</HelmetProvider>
	);
}
