import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const questions = () => {
	const router = useRouter();
	const { slug } = router.query;
	const getQuestion = async () => {
		try {
			const { data } = await axios.get(
				`https://oplus.dev/apps/dw_game/api/questions/${slug}`,
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
    if(slug){
      	getQuestion();
    }

	}, [slug]);
	return <div>questions</div>;
};
export default questions;
