import React from 'react';
import Head from 'next/head';
function Header({ title = 'DP WORLD' }) {
	return (
		<Head>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1, maximum-scale=1'
			/>
      <meta
					name='theme-color'
					media='(prefers-color-scheme: dark)'
					content='#2e0f47'
				/>
			<title>{title}</title>
			{/* Favicon */}
      <link rel="shortcut icon" href="/favicon.ico" />
			<meta name='msapplication-TileColor' content='#da532c' />
			<meta name='theme-color' content='#ffffff'></meta>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600&display=swap" rel="stylesheet"/> */}

		</Head>
	);
}

export default Header;
