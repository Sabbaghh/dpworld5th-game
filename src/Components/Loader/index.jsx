import React from 'react';
import styles from './Loader.module.css';
import styled from 'styled-components';
function Loader() {
	return (
		<LoaderContainer>
			<div className={styles.Loader}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</LoaderContainer>
	);
}

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	position: absolute;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.5);
`;

export default Loader;
