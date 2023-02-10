import React, { useEffect } from 'react';
import styled from 'styled-components';
import Text from '@/Components/Text';
import { useRouter } from 'next/router';
import Header from '@/Components/Header';
import LinkBetweenPages from '@/Components/Link';
import Divider from '@/Components/Divider';
function scanerror() {
	const router = useRouter();
	const { slug } = router.query;
	useEffect(() => {
	}, []);
	return (
		<Container>
			<Header title='DP WORLD' />
			<Text size='lg'>You Already Completed "{slug}" Stage</Text>
			<Divider/>
			<LinkBetweenPages href='/progress'>Check your progress</LinkBetweenPages>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #35224c;
	height: 100vh;
	width: 100vw;
	padding: 1rem;
	justify-content: center;
	align-items: center;
`;

export default scanerror;
