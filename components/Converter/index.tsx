import styled from 'styled-components'

import FromConv from './FromConv'
import ToConv from './ToConv'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Converter = ({convImg, from, to}) => {
    return (
        <Wrapper>
            <FromConv from={from} />
            <img src={convImg} />
            <ToConv to={to} />
            <button className={`default-btn ${from === 'bFOT' ? 'secondary-btn' : ''}`}>Burn</button>
        </Wrapper>
    )
}

export default Converter