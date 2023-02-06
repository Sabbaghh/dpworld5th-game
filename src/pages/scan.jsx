import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import styled from 'styled-components';
import { useRouter } from 'next/router';

function scan() {
	const [data, setData] = useState('No result');
	const [showScanner, setShowScanner] = useState(true);
	let router = useRouter();
	const handleScanResult = (result, error) => {
		console.log('hello');
		if (!!result) {
			if (result?.text.includes('/progress/info')) {
				setShowScanner(false);
				// router.push(result?.text);
				
			}
		} else {
			return null;
		}
		if (!!error) {
			console.info('error');
		}
	};
	return (
		<Container>
			{showScanner ? (
				<QrReader
					videoId='video'
					constraints={{
						facingMode: 'environment',
					}}
					onResult={(result, error) => handleScanResult(result, error)}
					containerStyle={{
						width: '100%',
						height: '100vh',
						background: '#35224c',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flex: 3,
					}}
					videoStyle={{
						width: '80%',
						background: '#35224c',
						marginLeft: '10%',
					}}
				/>
			) : null}

			<p style={{ flex: 1, color: '#fff' }}>{data}</p>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	background-color: #35224c;
`;

export default scan;
