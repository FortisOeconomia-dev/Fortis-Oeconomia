import styled from 'styled-components'
import StakeNClaimSecond from "../StakeNClaimSecond"

const Wrapper = styled.div`
    display: flex;
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
    return (
        <Wrapper>
            <div>
                <TitleWrapper>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        {fromImage()}
                        <span>-</span>
                        {typeof toImage === 'string' ? <img src={`${toImage}`} /> : toImage()}
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
                />
            </div>
            <Divider />
        </Wrapper>
    )
}

export default PoolDetail