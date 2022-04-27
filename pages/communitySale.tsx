import React, { useEffect, MouseEvent, useContext, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../components/Layout/Layout'
import { useSigningClient } from '../contexts/cosmwasm'
import { convertMicroDenomToDenom2 } from '../util/conversion'
import ThemeContext from '../contexts/ThemeContext'
import 'react-notifications/lib/notifications.css'
import DepositNClaim from '../components/DepositNClaim'
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

const communitySale = () => {
  const {
    walletAddress,
    signingClient,
    sfotBalance,
    fotTokenInfo,
    sfotTokenInfo,
    communitySaleDepositList,
    communitySaleContractInfo,
    sfotDepositAmount,
    handlesFotDepositChange,
    executesFotDeposit,
    executeFotClaim,
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

  const handlesFotDepositAll = () => {
    handlesFotDepositChange(Number(sfotBalance))
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
        <DepositNClaim
          from={'sFot'}
          to={'Fot'}
          token1TotalAmount={convertMicroDenomToDenom2(communitySaleContractInfo.sfot_amount, sfotTokenInfo.decimals)}
          token2TotalAmount={convertMicroDenomToDenom2(communitySaleContractInfo.fot_amount, fotTokenInfo.decimals)}
          totalBurnedAmount={convertMicroDenomToDenom2(
            communitySaleContractInfo.burned_sfot_amount,
            sfotTokenInfo.decimals,
          )}
          handleToken1Minus={handlesFotDepositMinus}
          handleToken1Plus={handlesFotDepositPlus}
          onToken1Change={onsFotDepositChange}
          token1Amount={sfotDepositAmount}
          handleToken1Deposit={handlesFotDeposit}
          handleToken2Claim={handleCommunitySaleClaim}
          communitySaleDepositList={communitySaleDepositList}
          handleToken1DepositChange={handlesFotDepositAll}
          maxWidth={'1000px'}
          balance={sfotBalance}
          walletAddress={walletAddress}
          submitButtonTitle={'Buy'}
        />
      </div>
    </Wrapper>
  )
}

export default communitySale
