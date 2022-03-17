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

const Converter = ({
    convImg, 
    from, 
    to,
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
    expectedAmount,
    handleSubmit
}) => {
    return (
        <Wrapper>
            <FromConv 
                from={from} 
                handleBurnMinus={handleBurnMinus} 
                burnAmount={burnAmount} 
                onBurnChange={onBurnChange}
                handleBurnPlus={handleBurnPlus}
            />
            <img src={convImg} />
            <ToConv to={to} expectedAmount={expectedAmount} />
            <button className={`default-btn ${from === 'bFOT' ? 'secondary-btn' : ''}`} onClick={handleSubmit}>Burn</button>
        </Wrapper>
    )
}

export default Converter