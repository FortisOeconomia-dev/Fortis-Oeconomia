import React, { useState, useEffect, MouseEvent, useContext, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../components/Layout/Layout'
import Converter from '../components/Converter'
import StatisticBox from '../components/StatisticBox'
import { useSigningClient } from '../contexts/cosmwasm'
import { convertMicroDenomToDenom2 } from '../util/conversion'
import ThemeContext from '../contexts/ThemeContext'
import 'react-notifications/lib/notifications.css'
import { NotificationManager } from 'react-notifications'
import moment from 'moment'
import { textAlign } from '@mui/system'

//styled components
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  width: 100%;
  margin: 20px;
  padding: 0 20px;
  gap: 37px;
  img {
    filter: ${props =>
    props.defaultChecked ? 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg)' : 'hue-rotate(-240deg)'};
  },
`

const Announcement = styled.span`
  font-size: 28px;
  font-weight: 600;
  line-height: 32px;
  color: #fbfcfd;
`

const LeftPart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  margin-top: 34px;
  max-width: 100%;
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  flex: 2;
  max-width: 100%;
`

const MyStaked = styled.div`
  display: flex;
  padding-left: 27px;
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
const TableTh = styled.th`
  padding: 20px 50px;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  color: #fbfcfd;
  min-width: unset !important;
`

const MyRewardsMiddle = styled('div') <{ visible: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1px;
  padding-top: 16px;
  border-bottom: ${props => (props.visible ? '2.05843px solid #2e0752' : '0')};
  padding-bottom: 20px;
`

const communitySale = () => {
  const {
    walletAddress,
    signingClient,
    fotBalance,
    sfotBalance,
    fotTokenInfo,
    sfotTokenInfo,
    communitySaleContractInfo,
    sfotDepositAmount,
    handlesFotDepositChange,
    executesFotDeposit,
    getCommunitySaleBalances,
    communitySaleDepositList,
    executeFotClaim,
    updateInterval,
  } = useSigningClient()

  const { setTheme, changeTheme } = useContext(ThemeContext)
  const [statisticBoxValues, setStatisticBoxValues] = useState([])
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTheme('theme10')
    return () => changeTheme('primary')
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getCommunitySaleBalances()
  }, [signingClient, walletAddress])

  const { toggle } = useContext(ToggleContext)

  useEffect(() => {
    if (seconds === 0) {
      getCommunitySaleBalances()
    }
    const interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  useEffect(() => {
    toggle ? changeTheme('primary') : changeTheme('theme10')
  }, [toggle])

  useEffect(() => {
    const values = [
      {
        key: 'Total Burned sFOT',
        value: `${convertMicroDenomToDenom2(communitySaleContractInfo.burned_sfot_amount, sfotTokenInfo.decimals)}`,
      },
      {
        key: 'Total Sold FOT',
        value: `${convertMicroDenomToDenom2(communitySaleContractInfo.sfot_amount * 2, fotTokenInfo.decimals)}`,
      },
    ]

    setStatisticBoxValues(values)
  }, [convertMicroDenomToDenom2, communitySaleContractInfo, sfotTokenInfo, fotTokenInfo])

  const handlesFotDeposit = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    if (Number(sfotDepositAmount) == 0) {
      NotificationManager.error('Please input the sFOT amount first')
      return
    }
    if (Number(sfotDepositAmount) > Number(sfotBalance)) {
      NotificationManager.error('Please input correct sFOT amount')
      return
    }

    event.preventDefault()
    await executesFotDeposit()
    getCommunitySaleBalances()
  }

  const handleCommunitySaleClaim = async (event: MouseEvent<HTMLElement>, idx) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    event.preventDefault()
    executeFotClaim(idx)
  }

  const onsFotDepositChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > Number(sfotBalance)) return
    if (Number(value) < 0) return
    handlesFotDepositChange(Number(value))
  }

  const handlesFotDepositPlus = () => {
    if (Number(sfotDepositAmount) + 1 > Number(sfotBalance)) return

    handlesFotDepositChange(Number(sfotDepositAmount) + 1)
  }
  const handlesFotDepositMinus = () => {
    if (Number(sfotDepositAmount) - 1 < 0) return
    handlesFotDepositChange(Number(sfotDepositAmount) - 1)
  }

  const handlesFotDepositAll = balance => {
    handlesFotDepositChange(Number(balance))
  }

  if (!signingClient || walletAddress == '') return null

  return (
    <Wrapper defaultChecked={toggle}>
      <Announcement>Bought FOTs are subject to 20 month vesting period with %5 opening per month.</Announcement>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '50px',
          maxWidth: 1368,
        }}
        className="w-full"
      >
        <LeftPart>
          <Converter
            wfull={false}
            handleBurnMinus={handlesFotDepositMinus}
            onBurnChange={onsFotDepositChange}
            handleBurnPlus={handlesFotDepositPlus}
            burnAmount={sfotDepositAmount}
            expectedAmount={Number(sfotDepositAmount) * 2}
            convImg={() => (
              <svg width="127" height="70" viewBox="0 0 127 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.23677" y1="2.15124" x2="63.3153" y2="92.6086" stroke="#171E0E" strokeWidth="3" />
                <line x1="62.7632" y1="91.6095" x2="124.841" y2="1.15126" stroke="#171E0E" strokeWidth="3" />
              </svg>
            )}
            from={'sFOT'}
            to={'FOT'}
            handleSubmit={handlesFotDeposit}
            balance={sfotBalance}
            handleChange={handlesFotDepositAll}
            sbalance={fotBalance}
            submitTitle={'Purchase'}
            showBalance={true}
          />
        </LeftPart>
        <RightPart>
          <StatisticBox values={statisticBoxValues} maxWidth={null} />
          <MyStaked>
            <MyStakedContent className="wallet-text">
              <MyRewardsMiddle visible={false}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginTop: '2em',
                    width: '100%',
                  }}
                ></div>
                <div style={{ fontSize: '18px', overflowY: 'auto', textAlign: 'center', margin: '0 auto' }}>
                  <table className="w-full">
                    {communitySaleDepositList.length > 0 && (
                      <tr>
                        <TableTh>Total Bought Fot</TableTh>
                        <TableTh>Unlocking Fot</TableTh>
                        <TableTh>Claim Date</TableTh>
                        <TableTh>Action</TableTh>
                      </tr>
                    )}
                    {communitySaleDepositList.map((d, idx) => (
                      <tr key={`${idx}-unstakelp`}>
                        <td>{convertMicroDenomToDenom2(d[0] * 2 - d[1], 10)}</td>
                        <td>
                          {
                            <div className='col'>
                              <div>
                                {convertMicroDenomToDenom2(d[1], 10)}
                              </div>
                              <div style={{fontSize: '12px'}}>
                                {`${convertMicroDenomToDenom2(0.1 * d[0], 10)} at Claim Date`}
                              </div>
                            </div>
                          }
                        </td>
                        {/* <td>{convertMicroDenomToDenom2(Math.floor((new Date().getTime() / 1000 - d[3]) / 2592000) * 0.05 * d[1], 10)}</td> */}
                        <td>{moment(new Date((Number(d[3]) + 2592000) * 1000)).format('YYYY/MM/DD HH:mm:ss')}</td>
                        <td>

                          <button
                            className={`default-btn  ${!toggle && 'secondary-btn'}`}
                            style={{ minWidth: 'unset', padding: '3px 30px' }}
                            onClick={(e) => handleCommunitySaleClaim(e, idx)}
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
        </RightPart>
        {/* <DepositNClaim
          from={'sFot'}
          to={'Fot'}
          token1TotalAmount={convertMicroDenomToDenom2(communitySaleContractInfo.sfot_amount, sfotTokenInfo.decimals)}
          token2TotalAmount={convertMicroDenomToDenom2(communitySaleContractInfo.fot_amount, fotTokenInfo.decimals)}
          totalBurnedAmount={convertMicroDenomToDenom2(communitySaleContractInfo.burned_sfot_amount, sfotTokenInfo.decimals) }

          handleToken1Minus={handlesFotDepositMinus}
          handleToken1Plus={handlesFotDepositPlus}
          onToken1Change={onsFotDepositChange}
          token1Amount={sfotDepositAmount}

          myToken1Amount={sfotBalance}
          myToken2Amount={fotBalance}
          handleToken1Deposit={handlesFotDeposit}
          handleToken2Claim={handleCommunitySaleClaim}
          communitySaleDepositList={communitySaleDepositList}

          handleToken1DepositChange={handlesFotDepositAll}
          maxWidth={'1000px'}
        /> */}
      </div>
    </Wrapper>
  )
}

export default communitySale
