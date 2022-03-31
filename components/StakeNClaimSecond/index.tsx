import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from "../Layout/Layout";



const Wrapper = styled.div`
    padding: 50px 32px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
    border-radius: 15.1165px;
    display: flex;
    max-width: 770px;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const TotalStaked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    border-right: 2.05843px solid #2E0752;
    padding-right: 40px;
    margin-right: 40px;
    @media (max-width: 768px) {
        padding-right: 0px;
        margin-right: 0px;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-right: 0px;
        border-bottom: 2.05843px solid #2E0752;
    }
`

const TotalStakedText = styled.label`
    width: unset !important;
    border-bottom: 0px !important;
    margin: 0 !important;
    font-size: 16px;
`

const StakedValue = styled.span`
    font-size: 16px;
    display: block;
    float: right;
`

const MyStaked = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
`

const MyStakedContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`

const MyStakedText = styled.label`
    width: 100% !important;
    border-bottom: 0px !important;
    margin: 0 !important;
`

const MyStakedDescription = styled.span`
    width: 50% !important;
    border-bottom: 0px !important;
    margin: 0 !important;
`

const MaxButton = styled.button`
    margin-bottom: 20px;
    padding: 5px !important;
    width: 100px;
    min-width: unset !important;
`

const MyRewardsUp = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 2.05843px solid #2E0752;
`

const MyRewardsMiddle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 1px;
    padding-top: 16px;
    border-bottom: 2.05843px solid #2E0752;
`

const StakeNClaimSecond = ({
    token1TotalAmount,
    token2TotalAmount,

    handleToken1Minus,
    handleToken1Plus,
    onToken1Change,
    token1Amount,

    handleToken2Minus,
    handleToken2Plus,
    onToken2Change,
    token2Amount,

    handleLiquidityMax,
    handleAddLiquidity,
    handleRemoveLiquidity,

    myToken1Amount,
    myToken2Amount, 
    handleLpStaking,
    handleLpUnstaking,
    handleLpStakingReward,

    lpStakingMyReward,
    lpStakingMyStaked,
    from,
    to,
    APY,
}) => {

    
    
    const { toggle } = useContext(ToggleContext)
    return (
        <Wrapper>
            <TotalStaked>
                <div className="wallet-text w-full" style={{ marginBottom: '28px', paddingBottom: '26px', borderBottom: '2.05843px solid #2E0752' }}>
                    <TotalStakedText className="wallet-label" style={{ textAlign: 'center' }}>Total Assets in Pool</TotalStakedText>
                    <TotalStakedText className="wallet-label">
                        {from}
                        <StakedValue>
                            {" "}
                            {token1TotalAmount}
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
                        {to}
                        <StakedValue>
                            {" "}
                            {token2TotalAmount}
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
                        Epoch Reward
                        <StakedValue>
                            {" "}
                            {10000} FOT
                        </StakedValue>
                    </TotalStakedText>
                </div>
                <div>
                    <div className='gFotCurrencyt-selection' style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <span className="wallet-label" style={{ fontSize: '18px', height: 'unset' }}>{from}</span>
                        <InputWithIncDec
                            handleBurnMinus={handleToken1Minus}
                            burnAmount={token1Amount}
                            onBurnChange={onToken1Change}
                            handleBurnPlus={handleToken1Plus}
                        />
                    </div>
                    <div className='gFotCurrencyt-selection' style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <span className="wallet-label" style={{ fontSize: '18px', height: 'unset' }}>{to}</span>
                        <InputWithIncDec
                            handleBurnMinus={handleToken2Minus}
                            burnAmount={token2Amount}
                            onBurnChange={onToken2Change}
                            handleBurnPlus={handleToken2Plus}
                            maxW="216px"
                        />
                    </div>
                </div>
                <MaxButton
                    onClick={handleLiquidityMax}
                    className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
                >
                    Max
                </MaxButton>
                <button className={`default-btn ${!toggle && 'secondary-btn'}`} style={{ marginTop: '28px' }} onClick={handleAddLiquidity}>Add Liquidity</button>
                <button className={`default-btn ${!toggle && 'secondary-btn'}`} style={{ marginTop: '28px' }} onClick={handleRemoveLiquidity}>Remove All Liquidity</button>
            </TotalStaked>
            <MyStaked>
                <MyStakedContent className="wallet-text">
                    {/*                     <MyRewardsUp>
                        <div className='gFotCurrencyt-selection' style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
                            <MyStakedDescription className="wallet-label" style={{fontSize:'18px', height: 'unset', textAlign: 'left'}}>{from}</MyStakedDescription>
                            <InputWithIncDec
                                handleBurnMinus={handleBurnMinus}
                                burnAmount={gfotStakingAmount}
                                onBurnChange={onBurnChange}
                                handleBurnPlus={handleBurnPlus}
                        />
                        </div>
                        <div className='gFotCurrencyt-selection' style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px'}}>
                            <MyStakedDescription className="wallet-label" style={{fontSize:'18px', height: 'unset', textAlign: 'left'}}>{to}</MyStakedDescription>
                            <InputWithIncDec
                                handleBurnMinus={handleBurnMinus}
                                burnAmount={gfotStakingAmount}
                                onBurnChange={onBurnChange}
                                handleBurnPlus={handleBurnPlus}
                                maxW="216px"
                            />
                        </div>
                        <button
                            className={`default-btn  ${!toggle && 'secondary-btn'}`}
                            style={{marginTop: '36px'}}
                            onClick={handleFotStakingUnstake}
                        >
                            Stake
                        </button>
                    </MyRewardsUp> */}
                    <MyRewardsMiddle>
                        <MyStakedText className="wallet-label" style={{ textAlign: 'center' }}>My Liquidity</MyStakedText>
                        <MyStakedText className="wallet-label">
                            {from}
                            <StakedValue>
                                {" "}
                                {myToken1Amount}
                            </StakedValue>
                        </MyStakedText>
                        <MyStakedText className="wallet-label">
                            {to}
                            <StakedValue>
                                {" "}
                                {myToken2Amount}
                            </StakedValue>
                        </MyStakedText>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {/*<button className={`default-btn ${!toggle && 'secondary-btn outlined'}`} style={{minWidth: 'unset', padding: '13px 30px'}} onClick={() => console.log('here')}>Max</button> */}
                            <button
                                className={`default-btn  ${!toggle && 'secondary-btn'}`}
                                style={{ minWidth: 'unset', padding: '3px 30px' }}
                                onClick={handleLpStaking}
                            >
                                Stake All
                            </button>
                            <button className={`default-btn ${!toggle && 'secondary-btn outlined'}`} style={{ minWidth: 'unset', padding: '3px 10px' }} onClick={handleLpUnstaking}>Unstake All</button>

                        </div>
                        <MyStakedText className="wallet-label" style={{ textAlign: 'center', fontSize:"16px" }}>Unbounding period is 14 days</MyStakedText>
                    </MyRewardsMiddle>
                    <div className="w-full" style={{ marginBottom: '120px' }}>
                        <MyStakedText className="wallet-label">
                            My Rewards
                            <StakedValue>
                                {" "}
                                {lpStakingMyReward}
                            </StakedValue>
                        </MyStakedText>
                        <button className={`default-btn   ${!toggle && 'secondary-btn'}`} onClick={handleLpStakingReward}>Claim</button>
                    </div>
                </MyStakedContent>

            </MyStaked>
        </Wrapper>
    )
}

export default StakeNClaimSecond