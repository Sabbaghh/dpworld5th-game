import React, { useEffect, useState } from 'react';
import Text from '../../../Components/Text';
import styled from 'styled-components';
import SubmitButton from '../../../Components/SubmitButton';
import Divider from '../../../Components/Divider';
import { useRouter } from 'next/router';
import axios from 'axios';
import Loader from '@/Components/Loader';
import LinkBetweenPages from '@/Components/Link';
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
		console.log('loads!')
	}, [slug]);
	return (
		<Container>
            {loading ? <Loader /> : null}
			<TitleContainer>
				<Text size='lg'>{data?.title}</Text>
			</TitleContainer>
			<Divider />
			<DescriptionContainer>
				<Text size='md'>{data?.description}</Text>
			</DescriptionContainer>
			<DividerWithColor />
			{data?.items?.map((item, counter) => (
				<React.Fragment key={counter}>
					<Text style={{textAlign:'center'}} size='sm'>{item?.title}</Text>
					<DividerWithColor />
				</React.Fragment>
			))}
			<Divider />
			<LinkBetweenPages href={`/questions/${slug}`}>START ACTIVITY</LinkBetweenPages>
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
	width: 30%;
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
