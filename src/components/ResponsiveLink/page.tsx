import Link from 'next/link';
import { BiArrowBack as Back } from 'react-icons/bi';

type responsiveLinkProps = {
	width: number;
	styleIcon: string;
	iconSize: string;
	styleLink: string;
	styleLinkText: string;
};

export default function responsiveLink({
	width,
	styleIcon,
	iconSize,
	styleLink,
	styleLinkText
}: responsiveLinkProps) {
	if (width <= 576) {
		return (
			<Link
				href='/'
				className={styleLink}
				aria-label='Link para a página inicial'
			>
				<Back className={styleIcon} size={iconSize} />
			</Link>
		);
	}
	else if(width <= 897) {
		return (
			<Link
				href='/'
				className={styleLink}
				aria-label='Link para a página inicial'
			>
				<Back className={styleIcon} size={iconSize} />
				<span className={styleLinkText}>
					Voltar
				</span>
			</Link>
		);
	} else {
		return (
			<Link
				href='/'
				className={styleLink}
				aria-label='Link para a página inicial'
			>
				<Back className={styleIcon} size={iconSize} />
				<span className={styleLinkText}>Voltar para home</span>
			</Link>
		);
	} 
}