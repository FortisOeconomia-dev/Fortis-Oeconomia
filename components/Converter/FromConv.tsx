import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from '../Layout/Layout'
import InputWithIncDec from "../InputWithIncDec"
import { useSigningClient } from "../../contexts/cosmwasm";

const WalletTitle = styled.label`
    display: flex;  
    gap: 10px;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
    background-color: ${props => props.slot !== 'bFOT' && '#22053D !important'}
`

const MaxButton = styled.span`
    margin-bottom: 30px;
    padding: 5px !important;
    width: 100px !important;
    min-width: unset !important;
    cursor: pointer;
`

const FromConv = ({
    from,
    fromImage,
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
    balance,
    handleChange,
    maxW
}) => {
    const {
        walletAddress,
    } = useSigningClient();
    const toggle = useContext(ToggleContext)
    return (
        <div className="gFotCurrencyt-selection" style={{maxWidth: maxW}}>
            <WalletTitle slot={from} className="wallet-title">
                {fromImage && (typeof fromImage === 'string' ? <img src={fromImage} /> : fromImage())} {from}
            </WalletTitle>
            <InputWithIncDec
                handleBurnMinus={handleBurnMinus}
                burnAmount={burnAmount}
                onBurnChange={onBurnChange}
                handleBurnPlus={handleBurnPlus}
            />
            {walletAddress.length == 0 ? <></> :
                <div className='banner-wrapper-content' style={{ height: "fit-content", textAlign: "right" }}>
                    <span className="sub-title ms-2" style={{ background: "#83B8DD" }}>
                        Balance {balance}
                    </span>
                </div>
            }
            <MaxButton
                onClick={() => handleChange(balance)}
                className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
            >
                Max
            </MaxButton>

        </div>
    )
}

export default FromConv