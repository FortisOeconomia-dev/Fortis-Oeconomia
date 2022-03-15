import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 50px 32px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
    border-radius: 15.1165px;
    margin-bottom: 16px;
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
    justify-content: center;
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
`

const StakedValue = styled.span`
    font-size: 20px;
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
`

const MyStakedText = styled.label`
    width: 100% !important;
    border-bottom: 0px !important;
    margin: 0 !important;
`

const StakeNClaim = ({
    handleBurnMinus,
    burnAmount,
    onBurnChange,
    handleBurnPlus,
}) => {
    return (
        <Wrapper>
            <TotalStaked>
                <div className="wallet-text w-full">
                    <TotalStakedText className="wallet-label">
                        Total Staked gFOT
                        <StakedValue>
                            {" "}
                            0
                        </StakedValue>
                    </TotalStakedText>
                    <TotalStakedText className="wallet-label">
                        APY
                        <StakedValue>
                            {" "}
                            % 0
                        </StakedValue>
                    </TotalStakedText>
                </div>
                <div className='gFotCurrencyt-selection'>
                    <InputWithIncDec
                        handleBurnMinus={handleBurnMinus}
                        burnAmount={burnAmount}
                        onBurnChange={onBurnChange}
                        handleBurnPlus={handleBurnPlus}
                    />
                </div>
                <button className={`default-btn secondary-btn`}>Stake</button>
            </TotalStaked>
            <MyStaked>
                <MyStakedContent className="wallet-text">
                    <MyStakedText className="wallet-label">
                        My Staked gFOT
                        <StakedValue>
                            {" "}
                            0
                        </StakedValue>
                    </MyStakedText>
                    <button 
                        className={`default-btn secondary-btn outlined`}
                        style={{marginBottom: '25px'}}
                    >
                        Unstake
                    </button>
                    <MyStakedText className="wallet-label">
                        My Rewards
                        <StakedValue>
                            {" "}
                            0
                        </StakedValue>
                    </MyStakedText>
                </MyStakedContent>
                <button className={`default-btn secondary-btn`}>Claim</button>
            </MyStaked>
        </Wrapper>
    )
}

export default StakeNClaim