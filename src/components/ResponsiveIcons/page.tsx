import { AiOutlineSearch as Search } from 'react-icons/ai';

import { RxCross2 as Cross } from 'react-icons/rx';

import { FaMapMarkerAlt as MapMarket } from 'react-icons/fa';

type iconProps = {
	width: number;
	normal: {
		styleIcon: string;
		iconSize: number;
	};
	_3xl: {
		styleIcon: string;
		iconSize: number;
	};
};

export function searchIcon({ normal, _3xl, width }: iconProps) {
	if (width < 1536) {
		return <Search className={normal.styleIcon} size={normal.iconSize} />;
	} else {
		return <Search className={_3xl.styleIcon} size={_3xl.iconSize} />;
	}
}

export function crossIcon({ normal, _3xl, width }: iconProps) {
	if (width < 1536) {
		return <Cross className={normal.styleIcon} size={normal.iconSize} />;
	} else {
		return <Cross className={_3xl.styleIcon} size={_3xl.iconSize} />;
	}
}

export function mapIcon({ normal, _3xl, width }: iconProps) {
	if (width < 1536) {
		return <MapMarket className={normal.styleIcon} size={normal.iconSize} />;
	} else {
		return <MapMarket className={_3xl.styleIcon} size={_3xl.iconSize} />;
	}
}