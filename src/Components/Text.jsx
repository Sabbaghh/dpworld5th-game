import React from 'react'
import styled from 'styled-components'

function Text({children, size='sm', color='#fff', textAlign='center'}) {
    if(size === 'sm'){
        return <Texts style={{fontSize:'18px', color:color, textAlign:textAlign}}>{children}</Texts>
    }
    if(size === 'md'){
        return <Texts style={{fontSize:'22px', color:color, textAlign:textAlign}}>{children}</Texts>
    }
    if(size === 'lg'){
        return <Texts style={{fontSize:'35px', color:color,textAlign:textAlign}}>{children}</Texts>
    }
}


const Texts = styled.p`
   
`;
export default Text