import styled from 'styled-components'

import InputWithIncDec from "../InputWithIncDec"

const WalletTitle = styled.label`
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
<<<<<<< HEAD
    background-color: ${props => props.slot!=='bFOT' && 'white !important'}
=======
    background-color: ${props => props.title!=='bFOT' && 'white !important'}
>>>>>>> ec6e9ce (integrate button actions)
`

const FromConv = ({
    from,
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
}) => {
    return (
        <div className="gFotCurrencyt-selection">
            <WalletTitle slot={from} className="wallet-title">
                {from}
            </WalletTitle>
            <InputWithIncDec
                handleBurnMinus={handleBurnMinus}
                burnAmount={burnAmount}
                onBurnChange={onBurnChange}
                handleBurnPlus={handleBurnPlus}
            />
        </div>
    )
}

export default FromConv