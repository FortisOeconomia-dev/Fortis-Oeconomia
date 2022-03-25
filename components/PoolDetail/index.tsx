import styled from 'styled-components'
import StakeNClaimSecond from "../StakeNClaimSecond"
import { useContext } from 'react'
import { ToggleContext } from "../Layout/Layout";
const Wrapper = styled.div`
    display: flex;
    flex: 1;
    gap: 37px;
`

const TitleWrapper = styled.div`
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-bottom: 24px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #FBFCFD;
  text-align: center;
`

const Divider = styled.div`
  width: 2.06px;
  background: linear-gradient(180deg,#171E0E 0%,#FFFFFF 100%);
`
const PoolDetail = ({
    from,
    to,
    fromImage,
    toImage
}) => {
    const {toggle} = useContext(ToggleContext)
    return (
        <Wrapper>
            <div className='w-full'>
                <TitleWrapper>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        {fromImage(toggle)}
                        <span>-</span>
                        {typeof toImage === 'string' ? <img src={`${toImage}`} /> : toImage(toggle)}
                    </div>
                    <Title>{from}-{to} Pool</Title>
                </TitleWrapper>
                <StakeNClaimSecond
                    handleBurnMinus={() => console.log('hello')}
                    onBurnChange={() => console.log('hello')}
                    handleBurnPlus={() => console.log('hello')}
                    handleFotStaking={() => console.log('hello')}
                    handleFotStakingUnstake={() => console.log('hello')}
                    handleFotStakingClaimReward={() => console.log('hello')}
                    from={from}
                    to={to}
                    APY={0}
                />
            </div>
            <Divider />
        </Wrapper>
    )
}

export default PoolDetail