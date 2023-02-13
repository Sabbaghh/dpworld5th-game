import React, { useEffect, useState } from 'react';
import Text from '../../../Components/Text';
import styled from 'styled-components';
import Divider from '../../../Components/Divider';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loader from '@/Components/Loader';
import LinkBetweenPages from '@/Components/Link';
import Header from '@/Components/Header';
function info() {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const StageData = async (slug) => {
		try {
			if (slug) {
				const res = await axios.get(
					`https://oplus.dev/apps/dw_game/api/stage/${slug}`,
				);
				setData(res.data.stage);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	const router = useRouter();
	const { slug } = router.query;
	useEffect(() => {
		StageData(slug);
		console.log('loads!');
	}, [slug]);
	return (
		<Container style={{background:(data?.color|| "#35224c")}}>
			<Header title='DP WORLD | INFO' />
			<div
				style={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position:'absolute',
					top:30,
					left:30,
				}}
			>
				<img style={{ height: '35px' }} alt='logo' src={'/imgs/logo.png'} />
			</div>
			{loading ? (
				<Loader />
			) : (
				<> 
				{data?.image ?<img src={data?.image} alt='Image' width={300}/> : null}
				
					{/* <TitleContainer>
						<Text size='lg'>{data?.title}</Text>
					</TitleContainer> */}
					{/* <Divider /> */}
					{/* <DescriptionContainer>
						<Text size='md'>{data?.description}</Text>
					</DescriptionContainer> */}
					{/* <DividerWithColor /> */}
					{/* {data?.items?.map((item, counter) => (
						<React.Fragment key={counter}>
							<div style={{ width: '95%' }}>
								<Text style={{ textAlign: 'center' }} size='sm'>
									{item?.title}
								</Text>
								<DividerWithColor />
							</div>
						</React.Fragment>
					))} */}
					<Divider />
					<LinkBetweenPages href={`/questions/${slug}`}>
						START ACTIVITY
					</LinkBetweenPages>
				</>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #35224c;
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 70%;
	text-align: center;
`;

const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: 70%;
`;

const DividerWithColor = styled.div`
	width: 355px;
	height: 3px;
	background-color: #fff;
	margin: 1em 0;
	background: radial-gradient(
		50% 50% at 50% 50%,
		#d9d9d9 0%,
		rgba(217, 217, 217, 0) 100%
	);
`;

export default info;
