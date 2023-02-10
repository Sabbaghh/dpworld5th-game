import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Loader from '@/Components/Loader';
import styled from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';

function direct() {
    const router = useRouter()
    const {slug, points} = router.query;
    const handleDirectPoints = async () => {
        const token = Cookies.get('token');
        try {
            const {data} = await axios.post(`https://oplus.dev/apps/dw_game/api/stage-complete`, {
                token: token,
                stage_id: slug,
                points: points
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)
            router.push('/progress');
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(slug && points){
        handleDirectPoints()
        }
    })
  return (
    <Container><Loader/></Container>
  )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #35224c;
`;

export default direct