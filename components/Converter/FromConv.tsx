import styled from 'styled-components'

import InputWithIncDec from "../InputWithIncDec"

const WalletTitle = styled.label`
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
    background-color: ${props => props.title!=='bFOT' && 'white !important'}
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
            <WalletTitle title={from} className="wallet-title">
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