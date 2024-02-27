import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import Text from '@/Components/Text';
import SubmitButton from '@/Components/SubmitButton';
import Cookies from 'js-cookie';
import Loader from '@/Components/Loader';
import Header from '@/Components/Header';
const questions = () => {
	const router = useRouter();
	const { slug } = router.query;
	const [data, setData] = useState([]);
	const [steps, setSteps] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedAnswer, setSelectedAnswers] = useState({});
	const [loading, setLoading] = useState(true);
	const [showSubmit, setShowSubmit] = useState(false);
	const getQuestion = async () => {
		try {
			const { data } = await axios.get(
				`https://oplus.dev/apps/dw_game/api/questions/${slug}`,
			);
			setData(data.questions);
			setSteps(data.questions.length);
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};
	const onTick = (answerId) => {
		setSelectedAnswers({
			...selectedAnswer,
			[currentStep]: {
				question_id: data[currentStep].id,
				answer_id: answerId,
			},
		});
		setShowSubmit(true);
	};

	const onNext = async () => {
		if (currentStep < steps - 1) {
			setCurrentStep(currentStep + 1);
			setShowSubmit(false);
		} else {
			// router.push('/progress')
			const token6 = Cookies.get('token6');
			console.log(selectedAnswer);
			const question = [];
			for (let key in selectedAnswer) {
				question.push({
					question_id: selectedAnswer[key].question_id,
					answer_id: selectedAnswer[key].answer_id,
				});
			}
			const body = {
				token: token6,
				stage_slug: slug,
				questions: question,
			};
			setLoading(true);
			try {
				const res = await axios.post(
					'https://oplus.dev/apps/dw_game/api/submit',
					body,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
				router.push('/progress');
			} catch (error) {
				console.log(error)
			}
			setLoading(false);
		}
	};
	useEffect(() => {
		if (slug) {
			getQuestion();
		}
	}, [slug]);
	return (
		<Container>
			{loading ? <Loader/> : null}
			<Header title='DP WORLD | Question' />
			<div
				style={{
					flex: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					position:'absolute',
					top:30,
					right:30,
				}}
			>
				<img style={{ height: '35px' }} alt='logo' src={'/imgs/logo.png'} />
			</div>
			<QuestionContainer>
				<QuestionCounter>
					<Text size='sm'>
						{currentStep + 1}/{steps}
					</Text>
					{/* <QuestionType type={data[currentStep]?.type} /> */}
				</QuestionCounter>

				<Text textAlign='left' size='sm'>
					{data[currentStep]?.question}
				</Text>
			</QuestionContainer>
			<AnswersContainer>
				{data[currentStep]?.answers?.map((answer, i) => (
					<AnswerItem onClick={() => onTick(answer.id)} key={i}>
						<CheckBoxContainer>
							{selectedAnswer[currentStep]?.answer_id === answer.id ? (
								<Text size='lg' color='#42EF53'>
									✓
								</Text>
							) : null}
						</CheckBoxContainer>
						<AnswerTextContainer>
							<Text textAlign='left' size='sm'>
								{answer.answer}
							</Text>
						</AnswerTextContainer>
					</AnswerItem>
				))}
			</AnswersContainer>
			
			<div
				style={{
					flex: 2,
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
				}}
			>
				{showSubmit ? <SubmitButton onClick={onNext}>
					{currentStep < steps - 1 ? 'Next' : 'Submit'}
				</SubmitButton>:null}
				
			</div>
		</Container>
	);
};

const QuestionType = ({ type }) => {
	switch (type) {
		case 'easy':
			return (
				<QuestionTag style={{ background: '#52A849' }}>
					<Text size='sm'>easy</Text>
				</QuestionTag>
			);
		case 'hard':
			return (
				<QuestionTag style={{ background: '#D53B38' }}>
					<Text size='sm'>Hard</Text>
				</QuestionTag>
			);
		default:
			return (
				<QuestionTag style={{ background: '#F4841D' }}>
					<Text size='sm'>medium</Text>
				</QuestionTag>
			);
	}
};

const QuestionTag = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 0.5rem;
	border-radius: 10px;
	
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	background-color: #35224c;
	height: 100vh;
	width: 100vw;
	padding: 0rem 1rem;
	justify-content: center;
	align-items: center;
`;

const QuestionCounter = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

const QuestionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	justify-content: center;
	flex: 2;
	gap: 2rem;
`;
const AnswersContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	gap: 1rem;
	width: 100%;
`;

const AnswerItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
`;

const AnswerTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	flex: 3;
`;
const CheckBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border: 1px solid #fff;
	border-radius: 50%;
	width: 40px;
	height: 40px;
`;

export default questions;
