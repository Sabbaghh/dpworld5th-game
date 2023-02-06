import React from 'react'
import Text from './Text';
import styled from 'styled-components'

function SubmitButton({children,onClick}) {
  return (
    <ButtonStyled onClick={onClick}>
        <Text size="sm" color="#fff">{children}</Text>
    </ButtonStyled>
  )
}
const ButtonStyled = styled.button`
    background: none;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 10px 30px;
    cursor: pointer;
    width: 70%;
`;

export default SubmitButton