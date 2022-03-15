import styled from 'styled-components'

import InputWithIncDec from "../InputWithIncDec"

const WalletTitle = styled.label`
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
`

const FromConv = ({from}) => {
    return (
        <div className="gFotCurrencyt-selection">
            <WalletTitle className="wallet-title">
                {from}
              </WalletTitle>
              <InputWithIncDec />
        </div>
    )
}

export default FromConv