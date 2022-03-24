import styled from 'styled-components'
import { useSigningClient } from '../../contexts/cosmwasm'

const WalletTitle = styled.label`
    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
    margin-top:0px !important;
    background-color: ${props => props.slot !== 'gFOT' && '#22053D !important'}
`

const ExpectedValWrapper = styled.label`
    background: rgba(255, 255, 255, 0.6) !important;
    width: ${props => props.slot} !important;
    height: 79px !important;
    border-radius: 20px !important;
    margin-bottom: 30px !important;
    display: flex !important;
`

const ExpectedVal = styled.span`
    color: #080451;
    margin-left: auto;
    margin-right: auto;
    font-weight: 600;
    font-size: 21px;
    line-height: 32px;
    margin-top: 20px;
`

const ToConv = ({
    to,
    expectedAmount,
    sbalance,
    maxW,
    toImage
}) => {
    const {
        walletAddress,
    } = useSigningClient();
    return (
        <div className="gFotCurrencyt-selection">
            <WalletTitle slot={to} className="wallet-title">
                {toImage && (typeof toImage === 'string' ? <img src={toImage} /> : toImage())} {to}
            </WalletTitle>
            <ExpectedValWrapper className="wallet-label" slot={maxW}>
                <ExpectedVal>{expectedAmount}</ExpectedVal>
            </ExpectedValWrapper>
            {walletAddress.length == 0 ? <></> :
                <div className='banner-wrapper-content' style={{ height: "fit-content", textAlign: "right"}}>
                    <span className="sub-title ms-2" style={{ background: "#83B8DD", marginTop:"10px", marginBottom:"32px"  }}>
                        Balance {sbalance}
                    </span>
                </div>}            
        </div>
    )
}

export default ToConv