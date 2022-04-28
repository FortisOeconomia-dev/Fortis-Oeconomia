import React, { useEffect, MouseEvent, useContext, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../components/Layout/Layout'
import Converter from '../components/Converter'
import StatisticBox from '../components/StatisticBox'
import { useSigningClient } from '../contexts/cosmwasm'
import { convertMicroDenomToDenom2 } from '../util/conversion'
import ThemeContext from '../contexts/ThemeContext'
import 'react-notifications/lib/notifications.css'
import { NotificationManager } from 'react-notifications'

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
    updateInterval,
  } = useSigningClient()

  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getCommunitySaleBalances()
  }, [signingClient, walletAddress])

  const { toggle } = useContext(ToggleContext)

  useEffect(() => {
    setTheme('theme10')
    getCommunitySaleBalances()
    const interval = setInterval(() => getCommunitySaleBalances(), updateInterval * 1000)
    return () => {
      setTheme('primary')
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    toggle ? setTheme('primary') : setTheme('theme10')
  }, [toggle])

  const defaultValues = [
    {
      key: 'Total Burned sFot',
      value: `${convertMicroDenomToDenom2(communitySaleContractInfo.burned_sfot_amount, sfotTokenInfo.decimals)}`,
    },
    {
      key: 'Total Sold Fot',
      value: `${convertMicroDenomToDenom2(communitySaleContractInfo.sfot_amount * 2, fotTokenInfo.decimals)}`,
    },
  ]

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
    executesFotDeposit()
  }

  // const handleCommunitySaleClaim = async (event: MouseEvent<HTMLElement>, idx) => {
  //   if (!signingClient || walletAddress.length === 0) {
  //     NotificationManager.error('Please connect wallet first')
  //     return
  //   }

  //   event.preventDefault()
  //   executeFotClaim(idx)
  // }

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
            submitTitle={'Buy'}
            showBalance={true}
          />
        </LeftPart>
        <RightPart>
          <StatisticBox values={defaultValues} maxWidth={null} />
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
