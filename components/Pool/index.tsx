import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from "../Layout/Layout";

const Wrapper = styled.div`
    padding: 12px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 7.28px 18.11px rgba(41, 54, 24, 0.25);
    border-radius: 9.95992px;
`

const Title = styled.span`
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #171E0E;
`

const Images = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
`

const Pool = ({from, to, fromImage, toImage}) => {
    const toggle = useContext(ToggleContext)
    return (
        <Wrapper>
            <Title>{from} - {to}</Title>
            <Images defaultChecked={toggle}>
                {typeof fromImage === 'string' ? <img src={fromImage} /> : fromImage()}
                {typeof toImage === 'string' ? <img src={toImage} /> : toImage()}
            </Images>
        </Wrapper>
    )
}

export default Pool