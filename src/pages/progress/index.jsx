import React, {useEffect} from 'react';
import styled from 'styled-components';
import Text from '../../Components/Text';
import Divider from '../../Components/Divider';
import LinkBetweenPages from '@/Components/Link';
import Cookies from 'js-cookie';
import axios from 'axios';
const DATA = [
	{
		id: 1,
		name: 'Prioritise Customers',
		status: true,
	},
	{
		id: 2,
		name: 'Prioritise Customers',
		status: false,
	},
	{
		id: 3,
		name: 'Prioritise Customers',
		status: false,
	},
	{
		id: 4,
		name: 'Prioritise Customers',
		status: false,
	},
	{
		id: 5,
		name: 'Prioritise Customers',
		status: false,
	},
];

function progress() {

	const getData = async(token) => {
		const {data} = await axios.get(`https://oplus.dev/apps/dw_game/api/client/${token}`);
		console.log(data);
	};

	useEffect(() => {
		// get token form Cookies
		const token = Cookies.get('token');
		if (token) {
			getData(token);
		}
	}, []);
	return (
		<Containers>
			{DATA.map((item) => (
				<React.Fragment key={item.id}>
					<ItemContainer>
                        <div style={{flex:1}}>
                            	<CheckBoxContainer>
                                {item.status ? <Text size='lg' color='#42EF53'>✓</Text> : null}
                                </CheckBoxContainer>
                        </div>
                        <div style={{flex:3}}>
                            <Text size='md'>{item.name}</Text>
                        </div>
						
					</ItemContainer>
					<Divider />
				</React.Fragment>
			))}
			<Divider />
			<LinkBetweenPages>SCAN</LinkBetweenPages>
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
	justify-content: space-between;
    width: 70%;
`;

const CheckBoxContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
    border: 1px solid #fff;
`;

export default progress;
