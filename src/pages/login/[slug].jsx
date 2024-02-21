import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Text from '../../Components/Text';
import SubmitButton from '../../Components/SubmitButton';
import Divider from '../../Components/Divider';
import Loader from '../../Components/Loader';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Header from '@/Components/Header';
import Elements from '@/Components/Elements';
const Login = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const onNameChange = (e) => {
		setUser({ ...user, name: e.target.value });
	};
	const onEmailChange = (e) => {
		setUser({ ...user, email: e.target.value });
	};

	const router = useRouter();
	const { slug } = router.query;
	const onLogin = async () => {
		if (
			!(
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email) &&
				user.name.length > 1
			)
		) {
			console.log('error');
			setError(true);
			return;
		}

		setLoading(true);
		try {
			const authKey = await axios.post(
				'https://oplus.dev/apps/dw_game/api/login',
				user,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			const {
				data: { token },
			} = authKey;
			//set token in cookies
			Cookies.set('token3', token, { expires: 30 });
			router.push(`/progress/info/${slug}`);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};
	return (
		<Container>
			<Header title='DP WORLD | LOGIN' />
			{loading ? <Loader /> : null}
			<Head>
				<title>Login</title>
			</Head>
			<img style={{ height: '100px' }} alt='logo' src={'/imgs/logo.png'} />
			<Divider />
			<InputContainer>
				<Text>Name</Text>
				<Input onChange={onNameChange} type='text' placeholder='' />
			</InputContainer>
			<Divider />
			<InputContainer>
				<Text>Email</Text>
				<Input
					onChange={onEmailChange}
					type='email'
					placeholder=''
				/>
			</InputContainer>
			<Divider />
			<SubmitButton onClick={onLogin}>Login</SubmitButton>
			<Divider />
			{error ? (
				<Text color='red'>Please enter a valid email and name</Text>
			) : null}
			{/* <Elements/> */}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #35224c;
`;
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 70%;
`;

const Input = styled.input`
	margin-top: 0.3em;
	width: 100%;
	height: 40px;
	border: none;
	border-radius: 5px;
	padding: 0 10px;
	background-color: #fff;
	outline: none;
`;

export default Login;
