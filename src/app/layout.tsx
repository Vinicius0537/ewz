import './globals.css';

import { Inter } from 'next/font/google';

import React from 'react';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-general',
	preload: true,
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='pt-br'>
			<body className={`${inter.className} bg-background`}>
				{children}
			</body>
		</html>
	);
}
