import Link from 'next/link';

import { TbLogout as Register } from 'react-icons/tb';

type responsiveLinkHomeProps = {
	width: number;
	styleIcon: string;
	iconSize: string;
	styleLink: string;
	styleLinkText: string;
};

export function responsiveLinkHome({
	width,
	styleIcon,
	iconSize,
	styleLink,
	styleLinkText,
}: responsiveLinkHomeProps) {
	if (width <= 576) {
		return (
			<Link
				href='/register'
				className={styleLink}
				aria-label='Link para a página de cadastro de pontos de coleta'
			>
				<Register className={styleIcon} size={iconSize} />
			</Link>
		);
	} else if (width <= 897) {
		return (
			<Link
				href='/register'
				className={styleLink}
				aria-label='Link para a página de cadastro de pontos de coleta'
			>
				<Register className={styleIcon} size={iconSize} />
				<span className={styleLinkText}>Cadastrar</span>
			</Link>
		);
	} else {
		return (
			<Link
				href='/register'
				className={styleLink}
				aria-label='Link para a página de cadastro de pontos de coleta'
			>
				<Register className={styleIcon} size={iconSize} />
				<span className={styleLinkText}>Cadastrar ponto de coleta</span>
			</Link>
		);
	}
}
