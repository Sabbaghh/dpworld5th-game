import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../Components/Text';
import Divider from '../../Components/Divider';
import Cookies from 'js-cookie';
import axios from 'axios';
import Loader from '@/Components/Loader';
import Header from '@/Components/Header';
import { useRouter } from 'next/router';
function progress() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [finished, setFinished] = useState(false);
	const [score , setScore] = useState(0)
	const router = useRouter();
	const getData = async (token7) => {
		try {
			const { data } = await axios.get(
				`https://oplus.dev/apps/dw_game/api/all-stages/${token7}`,
			);
			const {data:{score}} = await axios.get(`https://oplus.dev/apps/dw_game/api/client/${token7}`)
			setScore(score)
			setData(data.stages);
			const stages = {};
			let finished = true;
			data.stages.forEach((element) => {
				finished = finished && element.completed && element.direct_points;
				stages[element.slug] = {
					completed: element.completed,
					title: element.title,
					direct_points: element.direct_points,
				};
			});
			if (finished) {
				setFinished(true);
			}
			// store data in cookies
			Cookies.set('stages', JSON.stringify(stages), { expires: 30 });
		} catch (error) {
			if( error.response.status === 401){
				//Cookies.remove('token');
				//Cookies.remove('stages');
				//router.push(`/login`);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		// get token form Cookies
		const token7 = Cookies.get('token7');
		if (token7) {
			getData(token7);
		}
	}, []);
	return (
		<Containers>
			<div style={{position:'absolute', top:'5px', left:'3px'}}>
				<p style={{fontSize:'15px', color:'#fff', textAlign:'start'}}>
					Your Score is: {score}
				</p>
			</div>
			<Header title='DP WORLD | Progress' />
			<div
				style={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img style={{ height: '100px' }} alt='logo' src={'/imgs/logo.png'} />
			</div>
			{loading ? <Loader /> : null}

			<div
				style={{
					flex: 2,
					width: '90%',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{finished ? (
					<>
						<Text size='md'>CONGRATULATIONS!</Text>
						<Divider />
						<Text size='sm'>
							Thank you for participating. Please see the leader board to track
							your score
						</Text>
					</>
				) : (
					<>
						{data?.map((item) => (
							<React.Fragment key={item.id}>
								<ItemContainer>
									<div
										style={{
											flex: 1,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										{item.completed ? (
											<CheckBoxContainer>
												<Text size='md' color='#42EF53'>
													✓
												</Text>
											</CheckBoxContainer>
										) : null}
										{item.direct_points ? (
											<CheckBoxContainer>
												<Text size='md' color='#42EF53'>
													✓
												</Text>
											</CheckBoxContainer>
										) : null}
									</div>

									<div style={{ flex: 3 }}>
										<Text textAlign={'left'} size='sm'>
											{item.title}
										</Text>
									</div>
								</ItemContainer>
								<Divider />
							</React.Fragment>
						))}
					</>
				)}
			</div>
			<Divider />
			<div style={{ flex: 1, width: '70%' }}>
				<p
					style={{
						color: '#fff',
						opacity: '0.5',
						fontSize: '12px',
						textAlign: 'center',
					}}
				>
					{true
						? 'Proceed to next principle and scan QR code to trade progress'
						: null}
				</p>
			</div>
			{/* <Elements/> */}
		</Containers>
	);
}
const Containers = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #35224c;
`;

const ItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 95%;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	// border: 1px solid #fff;
`;

export default progress;
