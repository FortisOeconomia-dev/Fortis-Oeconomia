import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'
import { useContext, useState } from 'react'
import { Range, getTrackBackground } from 'react-range'
import { ToggleContext } from '../Layout/Layout'
import moment from 'moment'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const Wrapper = styled.div`
  padding: 50px 32px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
  border-radius: 15.1165px;
  display: flex;
  max-width: ${props => props.maxWidth};
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
  border-bottom: 2.05843px solid #2e0752;
  visibility: ${props => (props.visible ? 'initial' : 'hidden')};
`

const MyRewardsMiddle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1px;
  padding-top: 16px;
  border-bottom: 2.05843px solid #2e0752;
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
  handleLpCreateUnstake,
  handleLpFetchUnstake,
  handleLpStakingReward,
  lpStakingMyReward,
  lpStakingMyStaked,
  lpStakingMyUnstakingList,
  // lpStakingMyDeadline,
  lpAmount,
  from,
  to,
  APY,
  sfotbfotdpr,
  showEpochReward = false,
  showDPRInfoIcon = false,
  showLpAmount = true,
  maxWidth = '770px',
  showStakeForm = false,
  showMaxButtonInLiquidityForm = false,
  showStakeAllButton = true,
  unstakeButtonText = 'Unstake All',
}) => {
  const [values, setValues] = useState([50])
  const { toggle } = useContext(ToggleContext)
  return (
    <Wrapper maxWidth={maxWidth}>
      <TotalStaked>
        <div
          className="wallet-text w-full"
          style={{ marginBottom: '28px', paddingBottom: '26px', borderBottom: '2.05843px solid #2E0752' }}
        >
          <TotalStakedText className="wallet-label" style={{ textAlign: 'center' }}>
            Total Assets in Pool
          </TotalStakedText>
          {showEpochReward && (
            <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
              Epoch Reward
              <StakedValue> {0}</StakedValue>
            </TotalStakedText>
          )}
          <TotalStakedText className="wallet-label">
            {from}
            <StakedValue> {token1TotalAmount}</StakedValue>
          </TotalStakedText>
          <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
            {to}
            <StakedValue> {token2TotalAmount}</StakedValue>
          </TotalStakedText>
          <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
            DPR
            {showDPRInfoIcon ? (
              <>
                <InfoOutlinedIcon style={{ position: 'absolute', width: '20px', height: '20px' }} />
                <StakedValue>%{sfotbfotdpr}</StakedValue>
              </>
            ) : (
              <StakedValue>{sfotbfotdpr} %</StakedValue>
            )}
          </TotalStakedText>
        </div>
        <div>
          <div
            className="gFotCurrencyt-selection"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
          >
            <span className="wallet-label" style={{ fontSize: '18px', height: 'unset' }}>
              {from}
            </span>
            <InputWithIncDec
              handleBurnMinus={handleToken1Minus}
              burnAmount={token1Amount}
              onBurnChange={onToken1Change}
              handleBurnPlus={handleToken1Plus}
            />
          </div>
          <div
            className="gFotCurrencyt-selection"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
          >
            <span className="wallet-label" style={{ fontSize: '18px', height: 'unset' }}>
              {to}
            </span>
            <InputWithIncDec
              handleBurnMinus={handleToken2Minus}
              burnAmount={token2Amount}
              onBurnChange={onToken2Change}
              handleBurnPlus={handleToken2Plus}
              maxW="216px"
            />
          </div>
        </div>
        <MaxButton onClick={handleLiquidityMax} className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}>
          Max
        </MaxButton>
        <button
          className={`default-btn ${!toggle && 'secondary-btn'}`}
          style={{ minWidth: 'unset', padding: '8px 30px' }}
          onClick={handleAddLiquidity}
        >
          Add Liquidity
        </button>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2em',
            width: '100%',
          }}
        >
          <Range
            values={values}
            step={0.1}
            min={0}
            max={100}
            onChange={values => setValues(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: '36px',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values: values,
                      colors: ['#548BF4', '#ccc'],
                      min: 0,
                      max: 100,
                    }),
                    alignSelf: 'center',
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '42px',
                  width: '42px',
                  borderRadius: '4px',
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 2px 6px #AAA',
                }}
              >
                <div
                  style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC',
                  }}
                />
              </div>
            )}
          />
          <output
            style={{ marginTop: '10px', color: '#080451', fontSize: '19.761px', fontWeight: '600', lineHeight: '30px' }}
            id="output"
          >
            {values[0].toFixed(1)}
          </output>
        </div>

        <button
          className={`default-btn ${!toggle && 'secondary-btn'}`}
          style={{ minWidth: 'unset', padding: '8px 30px' }}
          onClick={() => handleRemoveLiquidity(values[0])}
        >
          Remove Liquidity
        </button>
      </TotalStaked>
      <MyStaked>
        <MyStakedContent className="wallet-text">
          <MyRewardsUp visible={showStakeForm}>
            <div
              className="gFotCurrencyt-selection"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
            >
              <MyStakedDescription
                className="wallet-label"
                style={{ fontSize: '18px', height: 'unset', textAlign: 'left' }}
              >
                {from}
              </MyStakedDescription>
              <InputWithIncDec handleBurnMinus={null} burnAmount={0} onBurnChange={null} handleBurnPlus={null} />
            </div>
            <div
              className="gFotCurrencyt-selection"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}
            >
              <MyStakedDescription
                className="wallet-label"
                style={{ fontSize: '18px', height: 'unset', textAlign: 'left' }}
              >
                {to}
              </MyStakedDescription>
              <InputWithIncDec
                handleBurnMinus={null}
                burnAmount={0}
                onBurnChange={null}
                handleBurnPlus={null}
                maxW="216px"
              />
            </div>
            <button className={`default-btn  ${!toggle && 'secondary-btn'}`} style={{ marginTop: '36px' }}>
              Stake
            </button>
          </MyRewardsUp>
          <MyRewardsMiddle>
            <div>
              <MyStakedText className="wallet-label" style={{ textAlign: 'center' }}>
                My Liquidity
              </MyStakedText>
              <MyStakedText className="wallet-label">
                {from}
                <StakedValue> {myToken1Amount}</StakedValue>
              </MyStakedText>
              <MyStakedText className="wallet-label">
                {to}
                <StakedValue> {myToken2Amount}</StakedValue>
              </MyStakedText>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '2em',
                width: '100%',
              }}
            ></div>
            {showLpAmount && (
              <div>
                <MyStakedText className="wallet-label">
                  {'LP Amount'}
                  <StakedValue> {lpAmount}</StakedValue>
                </MyStakedText>
                <MyStakedText className="wallet-label">
                  {'Staked LP Amount'}
                  <StakedValue> {lpStakingMyStaked}</StakedValue>
                </MyStakedText>
              </div>
            )}
            <div>
              {showMaxButtonInLiquidityForm && (
                <button
                  className={`default-btn ${!toggle && 'secondary-btn outlined'}`}
                  style={{ minWidth: 'unset', padding: '13px 30px' }}
                  onClick={() => console.log('here')}
                >
                  Max
                </button>
              )}
              {showStakeAllButton && (
                <button
                  className={`default-btn  ${!toggle && 'secondary-btn'}`}
                  style={{ minWidth: 'unset', padding: '3px 20px', marginRight: '20px' }}
                  onClick={handleLpStaking}
                >
                  Stake All
                </button>
              )}
              <button
                className={`default-btn ${!toggle && 'secondary-btn outlined'}`}
                style={{ minWidth: 'unset', padding: '3px 10px' }}
                onClick={handleLpCreateUnstake}
              >
                {unstakeButtonText}
              </button>
            </div>
            <div style={{ overflowY: 'auto' }}>
              <table className="w-full">
                {lpStakingMyUnstakingList.length > 0 && (
                  <tr>
                    {/* <th>Amount</th> */}
                    <th>Release date</th>
                    <th>Action</th>
                  </tr>
                )}
                {lpStakingMyUnstakingList.map((d, idx) => (
                  <tr key={`${idx}-unstakelp`}>
                    {/* <td>{convertMicroDenomToDenom2(d[0], gfotTokenInfo.decimals)}</td> */}
                    <td>{moment(new Date(Number(d[1]) * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                    <td>
                      <button
                        className={`default-btn  ${!toggle && 'secondary-btn'}`}
                        style={{ minWidth: 'unset', padding: '3px 30px' }}
                        onClick={() => handleLpFetchUnstake(d)}
                      >
                        Fetch Unstake
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
              {/* <table className="w-full">
                                {lpStakingMyUnstakingList > 0 && <tr>
                                    <th>{moment(new Date(Number(lpStakingMyUnstakingList) * 1000)).format('YYYY/MM/DD HH:mm:ss')}</th>
                                    <th>
                                        <button
                                            className={`default-btn  ${!toggle && 'secondary-btn'}`}
                                            style={{ minWidth: 'unset', padding: '3px 30px' }}
                                            onClick={handleLpFetchUnstake}

                                        >
                                            Fetch Unstake
                                        </button>
                                    </th>
                                </tr>}

                            </table> */}
            </div>
            {/*                         <MyStakedText className="wallet-label" style={{ textAlign: 'center', fontSize:"16px" }}>Unbonding period is 14 days</MyStakedText> */}
          </MyRewardsMiddle>
          <div className="w-full">
            <MyStakedText className="wallet-label">
              My Rewards
              <StakedValue> {lpStakingMyReward}</StakedValue>
            </MyStakedText>
            <button className={`default-btn ${!toggle && 'secondary-btn'}`} onClick={handleLpStakingReward}>
              Claim
            </button>
          </div>
        </MyStakedContent>
      </MyStaked>
    </Wrapper>
  )
}

export default StakeNClaimSecond
