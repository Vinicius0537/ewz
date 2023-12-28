'use client';

import { NavBar } from '@/src/components/NavBar/page';
import { FiUpload as Upload } from 'react-icons/fi';
import { BsCheck2Circle as Done } from 'react-icons/bs';

import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';

import type { FormEvent } from 'react';

import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';

import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Register() {
	const _2mb = 2 * Math.pow(1024, 2);

	// campos

	const [selectedImage, setSelectedImage] = useState('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [entity, setEntity] = useState('');
	const [street, setStreet] = useState('');
	const [entityNumber, setEntityNumber] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [telephone, setTelephone] = useState('');
	const [email, setEmail] = useState('');

	// useStates para os erros

	const [error, setError] = useState<boolean>(false);
	const [fileError, setFileError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [styleErrorMessage, setStyleErrorMessage] = useState('');

	// useState para submeter

	const [submit, setSubmit] = useState(false);

	// hook para rotas

	const router = useRouter();

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: 1,
		maxSize: _2mb,

		// desativa a abertura automática do file explorer
		noClick: true,
		onDrop: (files) => {
			if (files.length > 0) {
				const file = files[0];

				if (['image/jpg', 'image/jpeg'].includes(file.type)) {
					setSelectedFile(file);
					setSelectedImage(URL.createObjectURL(file));
					setError(false);
				} else {
					setError(true);
				}
			} else {
				setError(true);
			}
		},
	});

	function handleDrag() {
		if (isDragActive) {
			return (
				<p className='text-stormyNight text-xl font-roboto text-center'>
					Solte a imagem do seu estabelecimento aqui
				</p>
			);
		} else {
			return (
				<div className='text-stormyNight text-xl font-roboto text-center'>
					<p className='mb-[1rem]'>Imagem do estabelecimento</p>
					<p>Obs: São permitidos apenas arquivos .jpg ou .jpeg de até 2MB</p>
				</div>
			);
		}
	}

	useEffect(() => {
		if (fileError) {
			setErrorMessage('Por favor envie uma imagem do seu estabelecimento');
			setStyleErrorMessage('text-red-500 mt-[2rem]');
		} else {
			setErrorMessage('');
		}
	}, [fileError, setErrorMessage, setStyleErrorMessage]);

	function previewImage() {
		if (selectedImage && !error) {
			return (
				<img
					src={selectedImage}
					className='w-full rounded-2xl'
					alt='pré-visualização da imagem'
				/>
			);
		} else {
			return (
				<div className='flex flex-col w-full border-2 border-dashed border-green-primary rounded-2xl items-center justify-center m-[2rem] p-[2rem]'>
					<Upload className='text-green-primary mb-[2rem]' size='4vh' />
					{handleDrag()}
				</div>
			);
		}
	}

	function submitOverlay() {
		if (submit) {
			return (
				<div className='fixed inset-0 bg-shadow bg-opacity-[0.85] z-10'>
					<div className='flex flex-col justify-center items-center h-full z-20'>
						<Done className='text-green-primary mb-[1rem]' size='6vh' />
						<strong className='text-xl text-white font-roboto'>
							Cadastro concluído
						</strong>
					</div>
				</div>
			);
		}
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const formData = new FormData();

		try {
			if (selectedFile) {
				formData.set('image', selectedFile);
				formData.set('entity', entity.trim());
				formData.set('street', street.trim());
				formData.set('entityNumber', entityNumber.trim());
				formData.set('state', state.trim());
				formData.set('city', city.trim());
				formData.set('telephone', telephone.trim());
				formData.set('email', email.trim());

				await fetch('/api/register', {
					method: 'POST',
					body: formData,
				});

				setSubmit(true);

				setTimeout(() => {
					setSubmit(false);

					// limpando os campos após o envio
					setSelectedImage('');
					setSelectedFile(null);
					setEntity('');
					setStreet('');
					setEntityNumber('');
					setState('');
					setCity('');
					setTelephone('');
					setEmail('');

					// redirecionando para home
					router.push('/');
				}, 2000);
			} else {
				setFileError(true);
			}
		} catch (error: any) {
			NextResponse.json({ success: false, error });
		}
	}

	function handleTelephone(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		const isDeleting = value.length < telephone.length;
		const numericValue = value.replace(/[^0-9]/, '');

		if (isDeleting) {
			setTelephone(numericValue);
		} else {
			const formattedValue = numericValue.replace(
				/^(\d{2})(\d{2})(\d{4})(\d{4})$/,
				'+$1 ($2) $3-$4'
			);
			setTelephone(formattedValue);
		}
	}

	function validateEmail(e: FormEvent) {
		const target = e.target as HTMLInputElement;
		if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(target.value)) {
			target.setCustomValidity('O Email é inválido');
		} else {
			target.setCustomValidity('');
		}
	}

	function handleEmptyEmail(e: FormEvent) {
		const target = e.target as HTMLInputElement;
		if (target.value == '') {
			target.setCustomValidity('Não Deixe o campo vazio');
		}
	}

	return (
		<HelmetProvider>
			<Helmet>
				<title>Cadastro de Pontos de Coleta</title>
				<meta
					name='description'
					content='Cadastre seu ponto de coleta de lixo eletrônico na EWZ e ajude a comunidade local a descartar eletrônicos de forma sustentável'
				/>
				<meta
					name='keywords'
					content='cadastrar ponto de coleta, lixo eletrônico, sustentabilidade'
				/>
			</Helmet>
			<main className='flex flex-col p-8'>
				{submitOverlay()}
				<NavBar />
				<div className='flex justify-center mt-12'>
					<div className='bg-white rounded-2xl w-[35rem] p-14'>
						<div>
							<h1 className='text-stormyNight text-2xl font-ubuntu font-semibold mb-5'>
								Cadastre seu ponto de coleta de lixo eletrônico aqui!
							</h1>
							<h2 className='text-stormyNight text-xl font-ubuntu font-semibold mb-5'>
								Dados
							</h2>
						</div>
						<form onSubmit={handleSubmit} id='registerForm' method='POST'>
							<label
								className='flex bg-green-tertiary rounded-2xl h-[20rem]'
								{...getRootProps()}
								onChange={() => setErrorMessage('')}
								htmlFor='uploadImage'
							>
								<input {...getInputProps()} name='image' id='uploadImage' />
								{previewImage()}
							</label>
							<p className={styleErrorMessage}>{errorMessage}</p>
							<div className='flex flex-row'>
								<div className='flex flex-col w-1/2'>
									<label
										htmlFor='entity'
										className='mt-[2rem] mb-[1rem] text-lg'
									>
										Nome da entidade
									</label>
									<input
										type='text'
										name='entity'
										id='entity'
										onChange={(e) =>
											setEntity(e.target.value.replace(/^[^A-zÀ-ú\s]$/, ''))
										}
										value={entity}
										className='px-6 bg-background rounded-2xl py-3 mr-[1.3rem]'
										onInvalid={(e) =>
											(e.target as HTMLInputElement).setCustomValidity(
												'Não Deixe o campo vazio'
											)
										}
										required
									/>
								</div>
								<div className='flex flex-col w-1/2'>
									<label
										htmlFor='street'
										className='mt-[2rem] mb-[1rem] text-lg'
									>
										Rua
									</label>
									<input
										type='text'
										name='street'
										id='street'
										onChange={(e) =>
											setStreet(e.target.value.replace(/^[^A-zÀ-ú\s]$/, ''))
										}
										value={street}
										className='px-6 bg-background rounded-2xl py-3'
										onInvalid={(e) =>
											(e.target as HTMLInputElement).setCustomValidity(
												'Não Deixe o campo vazio'
											)
										}
										required
									/>
								</div>
							</div>
							<div className='flex flex-row'>
								<div className='flex flex-col w-1/2'>
									<label htmlFor='entityNumber' className='my-[1rem] text-lg'>
										Número
									</label>
									<input
										type='number'
										name='entityNumber'
										id='entityNumber'
										onChange={(e) =>
											setEntityNumber(
												e.target.value.replace(/[^0-9]/, '').slice(0, 3)
											)
										}
										value={entityNumber}
										className='px-6 bg-background rounded-2xl py-3 mr-[1.3rem]'
										onInvalid={(e) =>
											(e.target as HTMLInputElement).setCustomValidity(
												'Não Deixe o campo vazio'
											)
										}
										required
									/>
								</div>
								<div className='flex flex-col w-1/2'>
									<label htmlFor='state' className='my-[1rem] text-lg'>
										Estado
									</label>
									<input
										type='text'
										name='state'
										id='state'
										onChange={(e) =>
											setState(
												e.target.value
													.toUpperCase()
													.replace(/[^A-Z]/, '')
													.slice(0, 2)
											)
										}
										value={state}
										className='px-6 bg-background rounded-2xl py-3'
										onInvalid={(e) =>
											(e.target as HTMLInputElement).setCustomValidity(
												'Não Deixe o campo vazio'
											)
										}
										required
									/>
								</div>
							</div>
							<div className='flex flex-row'>
								<div className='flex flex-col w-1/2 mr'>
									<label htmlFor='city' className='my-[1rem] text-lg'>
										Cidade
									</label>
									<input
										type='text'
										name='city'
										id='city'
										onChange={(e) =>
											setCity(e.target.value.replace(/[^A-zÀ-ú\s]/, ''))
										}
										value={city}
										className='px-6 bg-background rounded-2xl py-3 mr-[1.3rem]'
										onInvalid={(e) =>
											(e.target as HTMLInputElement).setCustomValidity(
												'Não Deixe o campo vazio'
											)
										}
										required
									/>
								</div>
								<div className='flex flex-col'>
									<label htmlFor='telephone' className='my-[1rem] text-lg'>
										Telefone
									</label>
									<input
										type='tel'
										name='telephone'
										id='telephone'
										onChange={handleTelephone}
										maxLength={20}
										value={telephone}
										className='px-4 bg-background rounded-2xl py-3 w-full'
										onInvalid={(e) =>
											(e.target as HTMLInputElement).setCustomValidity(
												'Não Deixe o campo vazio'
											)
										}
										required
									/>
								</div>
							</div>
							<label htmlFor='email' className='flex my-[1rem] text-lg'>
								Email
							</label>
							<input
								type='email'
								name='email'
								id='email'
								className='px-6 bg-background rounded-2xl py-4 w-full placeholder:text-lg'
								placeholder='Digite o seu email'
								onChange={(e) => {
									setEmail(e.target.value);
									validateEmail(e);
									handleEmptyEmail(e);
								}}
								required
							/>
							<div className='flex justify-center mt-[3rem] mb-[2rem]'>
								<button
									className='text-white bg-green-primary rounded-2xl text-lg font-roboto py-4 px-8'
									type='submit'
								>
									Cadastrar ponto de coleta
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</HelmetProvider>
	);
}
