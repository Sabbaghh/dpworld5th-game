import React from 'react';
import Text from './Text';
import Link from 'next/link';

function LinkBetweenPages({ children, href='/scan' }) {
	return (
		<Link
			style={{
				background: 'none',
				color: 'fff',
				border: '1px solid #fff',
				borderRadius: '5px',
				padding: '10px 30px',
				cursor: 'pointer',
				width: '70%',
				textDecoration:'none'
			}}
			href={href}
		>
			<Text size='sm' color='#fff'>
				{children}
			</Text>
		</Link>
	);
}

export default LinkBetweenPages;
