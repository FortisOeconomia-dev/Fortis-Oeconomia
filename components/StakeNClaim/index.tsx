import { useSigningClient } from '../../contexts/cosmwasm'
import { convertMicroDenomToDenom2, convertToFixedDecimals } from '../../util/conversion'
import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'
import classnames from 'classnames'
import { useContext, MouseEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { ToggleContext } from '../Layout/Layout'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import Countdown from '../Countdown'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const MaxButton = styled.button`
  margin-bottom: 20px;
  padding: 5px !important;
  min-width: unset !important;
`

const Wrapper = styled.div`
  padding: 50px 32px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
  border-radius: 15.1165px;
  margin-top: ${props => props.slot === '/sFOTVault' && '-18px'};
  margin-bottom: ${props => (props.slot === '/sFOTVault' ? '32px' : '16px')};
  display: flex;
  max-width: 950px;
  margin-left: ${props => (props.slot === '/sFOTVault' ? '-45px' : '50px')};
  @media (max-width: 768px) {
    flex-direction: column;
  }
  th,
  td {
    text-align: center;
  }

  ${MaxButton} {
    padding-left: 36px !important;
    padding-right: 36px !important;
  }
`

const TotalStaked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-right: 2.05843px solid #2e0752;
  padding-right: 40px;
  margin-right: 40px;
  @media (max-width: 768px) {
    padding-right: 0px;
    margin-right: 0px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-right: 0px;
    border-bottom: 2.05843px solid #2e0752;
  }
`

const TotalStakedText = styled.label`
  width: unset !important;
  border-bottom: 0px !important;
  margin: 0 !important;
  font-size: 16px;
`

const CountdownText = styled.label`
  width: unset !important;
  border-bottom: 0px !important;
  font-size: 16px;
  margin: 0 !important;
  text-align: center;
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

const HorizontalDivider = styled.div`
  background: #171e0e;
  height: 2px;
  width: 100%;
  transform: rotate(180deg);
  margin: 16px 0 36px;
`

const StakeNClaim = ({
  handleBurnMinus = null,
  onBurnChange = null,
  handleBurnPlus = null,
  handleFotStaking = null,
  handleFotStakingClaimReward = null,
  showCountdown = true,
  showInfoIcon = false,
  showDivider = false,
  tokenType = null,
  gfotTokenInfo,
  gfotStakingContractInfo,
  gfotStakingAmount,
  gfotStakingApy,
  gfotStakingMyStaked,
  gfotStakingMyReward,
  gfotBalance,
  handlegFotStakingChange,
  unstakingList,
  createUnstake,
  executeFetchUnstake,
  handleUnstakeChange,
  unstakeAmount,
}) => {
  const {
    fotTokenInfo,
    walletAddress,
    signingClient,
  } = useSigningClient()
  const handlegFotStaking = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    if (Number(gfotStakingAmount) == 0) {
      NotificationManager.error('Please input the GFOT amount first')
      return
    }
    if (Number(gfotStakingAmount) > Number(gfotBalance)) {
      NotificationManager.error('Please input correct GFOT amount')
      return
    }

    event.preventDefault()
    createUnstake()
  }

  const router = useRouter()
  const { pathname } = router

  const handlegFotUnstakingPlus = () => {
    console.log(unstakeAmount)
    console.log(convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals))
    if (Number(unstakeAmount) + 1 > convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals)) return

    handleUnstakeChange(Number(unstakeAmount) + 1)
  }
  const handlegFotUnstakingMinus = () => {
    if (Number(unstakeAmount) - 1 < 0) return
    handleUnstakeChange(Number(unstakeAmount) - 1)
  }

  const ongFotUnstakeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals)) return
    if (Number(value) < 0) return
    handleUnstakeChange(Number(value))
  }

  const { toggle } = useContext(ToggleContext)
  return (
    <Wrapper slot={pathname}>
      <TotalStaked>
        <div className="wallet-text w-full">
          <TotalStakedText className="wallet-label">
            Total Staked {tokenType}
            <StakedValue>
              {' '}
              {convertToFixedDecimals(
                convertMicroDenomToDenom2(gfotStakingContractInfo.gfot_amount, gfotTokenInfo.decimals),
              )}
            </StakedValue>
          </TotalStakedText>
          {/* <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
            Current Epoch Reward
            <StakedValue>
              {' '}
              {'30000FOT'} */}
          {/* {(gfotStakingApy / 10000000000.0).toFixed(10)} % */}
          {/* </StakedValue>
          </TotalStakedText> */}
          <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
            DPR
            {showInfoIcon ? (
              <>
                <StakedValue>{convertToFixedDecimals(gfotStakingApy / 365.0)}%</StakedValue>
              </>
            ) : (
              <StakedValue> {convertToFixedDecimals(gfotStakingApy / 365.0)}%</StakedValue>
            )}
          </TotalStakedText>
          <TotalStakedText className="wallet-label">
            {pathname === '/sFOTVault' ? 'APR' : 'APR'}
            {showInfoIcon ? (
              <>
                <StakedValue>{convertToFixedDecimals(gfotStakingApy)}%</StakedValue>
              </>
            ) : (
              <StakedValue> {convertToFixedDecimals(gfotStakingApy)} %</StakedValue>
            )}
          </TotalStakedText>
          {showCountdown && (
            <>
              <CountdownText className="wallet-label" style={{ fontSize: '18px', paddingBottom: 0 }}>
                Reward Distribution in
              </CountdownText>
              <Countdown targetHour={0} />
            </>
          )}
        </div>
        <div className="gFotCurrencyt-selection">
          <InputWithIncDec
            handleBurnMinus={handleBurnMinus}
            burnAmount={gfotStakingAmount}
            onBurnChange={onBurnChange}
            handleBurnPlus={handleBurnPlus}
          />
        </div>
        <MaxButton
          onClick={() => handlegFotStakingChange(gfotBalance)}
          className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
        >
          Max
        </MaxButton>
        <button className={`default-btn ${!toggle && 'secondary-btn'}`} onClick={handleFotStaking}>
          Stake
        </button>
      </TotalStaked>
      <MyStaked>
        <MyStakedContent className="wallet-text">
          <div className="w-full" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <MyStakedText className="wallet-label">
              My Staked {tokenType}
              <StakedValue>
                {convertToFixedDecimals(convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals))}
              </StakedValue>
            </MyStakedText>
            <div className="gFotCurrencyt-selection">
              <InputWithIncDec
                handleBurnMinus={handlegFotUnstakingMinus}
                burnAmount={unstakeAmount}
                onBurnChange={ongFotUnstakeChange}
                handleBurnPlus={handlegFotUnstakingPlus}
              />
            </div>
            <div
              className="w-full"
              style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}
            >
              <MaxButton
                onClick={() =>
                  handleUnstakeChange(convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals))
                }
                className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
              >
                Max
              </MaxButton>
              <MaxButton
                onClick={() => createUnstake()}
                className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
              >
                Create Unstake
              </MaxButton>
            </div>
          </div>
          <div style={{ overflowY: 'auto' }}>
            <table className="w-full">
              {unstakingList.length > 0 && (
                <tr>
                  <th>Amount</th>
                  <th>Release date</th>
                  <th>Action</th>
                </tr>
              )}
              {unstakingList.map((d, idx) => (
                <tr key={`${idx}-unstake`}>
                  <td>{convertToFixedDecimals(convertMicroDenomToDenom2(d[0], gfotTokenInfo.decimals))}</td>
                  <td>{moment(new Date(Number(d[1]) * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                  <td>
                    <MaxButton
                      onClick={() => executeFetchUnstake(idx)}
                      className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
                    >
                      Unstake
                    </MaxButton>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          {showDivider && <HorizontalDivider />}
          <div className="w-full" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <MyStakedText className="wallet-label">
              My Rewards
              <StakedValue> {convertMicroDenomToDenom2(gfotStakingMyReward, fotTokenInfo.decimals)}</StakedValue>
            </MyStakedText>
            <button className={`default-btn   ${!toggle && 'secondary-btn'}`} onClick={handleFotStakingClaimReward}>
              Claim
            </button>
          </div>
        </MyStakedContent>
      </MyStaked>
    </Wrapper>
  )
}

export default StakeNClaim
