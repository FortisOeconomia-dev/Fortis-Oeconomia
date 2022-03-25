import { useContext } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../Layout/Layout'

import FromConv from './FromConv'
import ToConv from './ToConv'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${props => props.defaultChecked ? '100%' : 'unset'};
`

const Converter = ({
    maxW="453px",
    wfull=true,
    convImg, 
    convImg2=null,
    from, 
    to,
    fromImage=null,
    toImage=null,
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
    expectedAmount,
    handleSubmit,
    balance,
    handleChange,
    sbalance,
    submitTitle="Burn",
}) => {
    const {toggle} = useContext(ToggleContext)
    return (
        <Wrapper defaultChecked={wfull}>
            <FromConv 
                from={from} 
                fromImage={fromImage}
                handleBurnMinus={handleBurnMinus} 
                burnAmount={burnAmount} 
                onBurnChange={onBurnChange}
                handleBurnPlus={handleBurnPlus}
                balance={balance}
                handleChange={handleChange}
                maxW={maxW}
            />
            <div style={{marginBottom: '58px', display: 'flex', gap: '16px'}}>
                {typeof convImg === 'string' ? <img src={convImg} /> : convImg()}
                {convImg2 && convImg2()}
            </div>
            <ToConv to={to} toImage={toImage} expectedAmount={expectedAmount} sbalance={sbalance} maxW={maxW} />
            <button className={`default-btn ${!toggle && from !== 'FOT' ? 'secondary-btn' : ''}`} onClick={handleSubmit}>{submitTitle}</button>
        </Wrapper>
    )
}

export default Converter