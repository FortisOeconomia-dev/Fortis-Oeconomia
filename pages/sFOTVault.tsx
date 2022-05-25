import React, { useState } from 'react'
import { useEffect, MouseEvent, ChangeEvent } from 'react'
import styled from 'styled-components'

import { useContext } from 'react'
import { ToggleContext } from '../components/Layout/Layout'
import StakeNClaim from '../components/StakeNClaim'
import { useSigningClient } from '../contexts/cosmwasm'
import { NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

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
  }
`

const sFOTVault = () => {
  const {
    walletAddress,
    signingClient,
    sfotBalance,
    sfotTokenInfo,
    calcExpectedSwapAmount,
    swapAmount,
    getSfotBalances,
    updateInterval,

    sfotStakingContractInfo,
    sfotStakingAmount,
    sfotStakingApy,
    sfotStakingMyStaked,
    sfotStakingMyReward,
    handlesFotStakingChange,
    executesFotStaking,
    executesFotClaimReward,
    sFotUnstakingList,
    createsFotUnstake,
    executesFotFetchUnstake,
    handlesFotUnstakeChange,
    sFotUnstakeAmount,
  } = useSigningClient()
  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getSfotBalances()
  }, [signingClient, walletAddress])

  const { toggle, asset, setAsset, page, setPage } = useContext(ToggleContext)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds === 0 && page < 4) {
      getSfotBalances()
    }

    const interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)

    if (page >= 2) {
      setSeconds(0)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [seconds, page])

  /**
   * Stable Handling
   * Because sFot mint is halted, this function isn't used now. When user clicks this button, nothing will happen.
   * @returns
   */

  useEffect(() => {
    if (signingClient && walletAddress != '') {
      calcExpectedSwapAmount(asset)
    }
  }, [swapAmount, signingClient, walletAddress])

  const handlesFotStaking = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    if (Number(sfotStakingAmount) == 0) {
      NotificationManager.error('Please input the GFOT amount first')
      return
    }
    if (Number(sfotStakingAmount) > Number(sfotBalance)) {
      NotificationManager.error('Please input correct GFOT amount')
      return
    }

    event.preventDefault()
    executesFotStaking()
  }

  const handlesFotStakingClaimReward = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    event.preventDefault()
    executesFotClaimReward()
  }

  const onsFotStakingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > Number(sfotBalance)) return
    if (Number(value) < 0) return
    handlesFotStakingChange(Number(value))
  }

  const handlesFotStakingPlus = () => {
    if (Number(sfotStakingAmount) + 1 > Number(sfotBalance)) return

    handlesFotStakingChange(Number(sfotStakingAmount) + 1)
  }
  const handlesFotStakingMinus = () => {
    if (Number(sfotStakingAmount) - 1 < 0) return
    handlesFotStakingChange(Number(sfotStakingAmount) - 1)
  }

  return (
    <Wrapper defaultChecked={toggle}>
      <div
        style={{
          display: 'flex',
          gap: '50px',
          justifyContent: 'center',
        }}
        className="w-full"
      >
        {page === 0 && (
          <StakeNClaim
            showInfoIcon={true}
            showDivider={true}
            showStakeNClaimReward={true}
            Note={true}
            handleBurnMinus={handlesFotStakingMinus}
            onBurnChange={onsFotStakingChange}
            handleBurnPlus={handlesFotStakingPlus}
            handleFotStaking={handlesFotStaking}
            handleFotStakingClaimReward={handlesFotStakingClaimReward}
            tokenType="sFOT"
            gfotTokenInfo={sfotTokenInfo}
            gfotStakingContractInfo={sfotStakingContractInfo}
            gfotStakingAmount={sfotStakingAmount}
            gfotStakingApy={sfotStakingApy}
            gfotStakingMyStaked={sfotStakingMyStaked}
            gfotStakingMyReward={sfotStakingMyReward}
            gfotBalance={sfotBalance}
            handlegFotStakingChange={handlesFotStakingChange}
            unstakingList={sFotUnstakingList}
            createUnstake={createsFotUnstake}
            executeFetchUnstake={executesFotFetchUnstake}
            handleUnstakeChange={handlesFotUnstakeChange}
            unstakeAmount={sFotUnstakeAmount}
            targetHour={12}
          />
        )}
      </div>
    </Wrapper>
  )
}

export default sFOTVault
