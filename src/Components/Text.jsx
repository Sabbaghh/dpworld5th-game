import React from 'react'
import styled from 'styled-components'

function Text({children, size='sm', color='#fff'}) {
    if(size === 'sm'){
        return <Texts style={{fontSize:'18px', color:color}}>{children}</Texts>
    }
    if(size === 'md'){
        return <Texts style={{fontSize:'22px', color:color}}>{children}</Texts>
    }
    if(size === 'lg'){
        return <Texts style={{fontSize:'35px', color:color}}>{children}</Texts>
    }
}


const Texts = styled.p`
    font-family :'Roboto', sans-serif;
    text-align: center;
`;
export default Text