import InputWithIncDec from '../InputWithIncDec'
import styled from 'styled-components'
import { useContext, useState } from 'react'
import { Range, getTrackBackground } from 'react-range'
import { ToggleContext } from '../Layout/Layout'
import moment from 'moment'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import {
  convertMicroDenomToDenom2, convertToFixedDecimals,
} from '../../util/conversion'
import Countdown from '../Countdown'

const Wrapper = styled('div')<{ maxWidth: string }>`
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
  flex: 2;
`

const MyStakedContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
`

const MyStakedText = styled.label`
  width: 100% !important;
  border-bottom: 0px !important;
  margin: 0 !important;
`

const MaxButton = styled.button`
  margin-bottom: 20px;
  padding: 5px !important;
  width: 100px;
  min-width: unset !important;
`

const MyRewardsMiddle = styled('div')<{ visible: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1px;
  padding-top: 16px;
  border-bottom: ${props => (props.visible ? '2.05843px solid #2e0752' : '0')};
  padding-bottom: 20px;
`

const DepositNClaim = ({
  token1TotalAmount,
  token2TotalAmount,
  totalBurnedAmount,

  handleToken1Minus,
  handleToken1Plus,
  onToken1Change,
  token1Amount,

  myToken1Amount,
  myToken2Amount,
  handleToken1Deposit,
  handleToken2Claim,
  communitySaleDepositList,

  handleToken1DepositChange,

  from,
  to,
  maxWidth
}) => {
  const [values, setValues] = useState([50])
  const { toggle } = useContext(ToggleContext)

  let total_deposited_amount = 0;
  let total_remained_amount = 0;
  if (communitySaleDepositList.length > 0) {
    communitySaleDepositList.forEach(item => {
      total_deposited_amount += Number(item[0]);
      total_remained_amount += Number(item[1]);
    });
  }

  return (
    <Wrapper maxWidth={maxWidth}>
      <TotalStaked>
        <div
          className="wallet-text w-full"
          style={{ marginBottom: '28px', paddingBottom: '26px', borderBottom: '2.05843px solid #2E0752' }}
        >
          <TotalStakedText className="wallet-label" style={{ textAlign: 'center' }}>
            Total Assets in Community Sale
          </TotalStakedText>
          <TotalStakedText className="wallet-label">
            {from}
            <StakedValue> {convertToFixedDecimals(token1TotalAmount)}</StakedValue>
          </TotalStakedText>
          <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
            {to}
            <StakedValue> {convertToFixedDecimals(token2TotalAmount)}</StakedValue>
          </TotalStakedText>
          <TotalStakedText className="wallet-label" style={{ fontSize: '18px' }}>
            Total Burned sFOT
            <StakedValue> {convertToFixedDecimals(totalBurnedAmount)}</StakedValue>
          </TotalStakedText>
        </div>
        <div style={{ width: '100%' }}>
          <div
            className="gFotCurrencyt-selection"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', width: '100%', maxWidth: 'unset' }}
          >
            <span style={{ fontSize: '18px', height: 'unset' }}>
              {from}
            </span>
            <InputWithIncDec
              handleBurnMinus={handleToken1Minus}
              burnAmount={token1Amount}
              onBurnChange={onToken1Change}
              handleBurnPlus={handleToken1Plus}
            />
          </div>
        </div>
        <MaxButton onClick={handleToken1DepositChange} className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}>
          Max
        </MaxButton>
        <button
          className={`default-btn ${!toggle && 'secondary-btn'}`}
          style={{ minWidth: 'unset', padding: '8px 30px' }}
          onClick={handleToken1Deposit}
        >
          Deposit
        </button>
      </TotalStaked>
      <MyStaked>
        <MyStakedContent className="wallet-text">
          <MyRewardsMiddle visible={false}>
            <div>
              <MyStakedText className="wallet-label">
                My Deposited sFot
                <StakedValue> {convertToFixedDecimals(convertMicroDenomToDenom2(total_deposited_amount, 10))}</StakedValue>
              </MyStakedText>
              <MyStakedText className="wallet-label">
                My burned sFot
                <StakedValue> {convertToFixedDecimals(convertMicroDenomToDenom2(total_deposited_amount - total_remained_amount, 10))}</StakedValue>
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
            <div style={{ overflowY: 'auto' }}>
              <table className="w-full">
                {communitySaleDepositList.length > 0 && (
                  <tr>
                    <th>Deposited</th>
                    <th>Burned</th>
                    <th>Claimable</th>
                    <th>Claim date</th>
                    <th>Action</th>
                  </tr>
                )}
                {communitySaleDepositList.map((d, idx) => (
                  <tr key={`${idx}-unstakelp`}>
                    <td>{convertMicroDenomToDenom2(d[0], 10)}</td>
                    <td>{convertMicroDenomToDenom2(d[0] - d[1], 10)}</td>
                    <td>{convertMicroDenomToDenom2(Math.floor((new Date().getTime() / 1000 - d[3])/2592000) * 0.05 * d[0], 10)}</td>
                    <td>{moment(new Date((Number(d[3]) + 2592000) * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                    <td>
                
                      <button
                        className={`default-btn  ${!toggle && 'secondary-btn'}`}
                        style={{ minWidth: 'unset', padding: '3px 30px' }}
                        onClick={(e) => handleToken2Claim(e, idx)}
                      >
                        Claim Fot
                      </button>
                
                    </td>
                  </tr>
                ))}
                
              </table>
            </div>
          </MyRewardsMiddle>
        </MyStakedContent>
      </MyStaked>
    </Wrapper>
  )
}

export default DepositNClaim
