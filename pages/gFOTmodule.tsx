import { NotificationManager } from 'react-notifications'
import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import { useSigningClient } from '../contexts/cosmwasm'
import { convertMicroDenomToDenom2 } from '../util/conversion'
import styled from 'styled-components'
//components
import Converter from '../components/Converter'
import StakeNClaim from '../components/StakeNClaim'
import StatisticBox from '../components/StatisticBox'

//styled components
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  margin: 24px;
  padding: 0 10px;
  gap: 50px;
  max-width: 1368px;
`
const LeftPart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  max-width: 100%;
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  max-width: 100%;
`

const gfotmodule = () => {
  const {
    walletAddress,
    signingClient,
    bfotBalance,
    bfotTokenInfo,
    gfotBalance,
    gfotTokenInfo,
    fotBurnContractInfo,
    bfotBurnContractInfo,
    bfotBurnAmount,
    expectedGfotAmount,
    handlebFotChange,
    executebFotBurn,
    gfotStakingContractInfo,
    gfotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    handlegFotStakingChange,
    executegFotStaking,
    executegFotClaimReward,
    unstakingList,
    createUnstake,
    executeFetchUnstake,
    handleUnstakeChange,
    unstakeAmount,
    getGfotBalances,
    updateInterval,
  } = useSigningClient()

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getGfotBalances()
  }, [signingClient, walletAddress])

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds === 0) {
      getGfotBalances()
    }
    const interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const defaultValues = [
    {
      key: 'bFOT Supply',
      value: `${convertMicroDenomToDenom2(fotBurnContractInfo.bfot_sent_amount, bfotTokenInfo.decimals)}`,
    },
    {
      key: 'Burned bFOT',
      value: `${convertMicroDenomToDenom2(bfotBurnContractInfo.bfot_burn_amount, bfotTokenInfo.decimals)}`,
    },
    {
      key: 'gFOT Supply',
      value: `${convertMicroDenomToDenom2(bfotBurnContractInfo.gfot_sent_amount, gfotTokenInfo.decimals)}`,
    },
    {
      key: 'gFOT Minting Ratio(Required bFOT for 1 gFOT',
      value: `${Math.floor(gfotTokenInfo.total_supply / 10000000000) + 10000}`,
    },
  ]

  const handlebFotBurn = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    if (Number(bfotBurnAmount) == 0) {
      NotificationManager.error('Please input the BFOT amount first')
      return
    }
    if (Number(bfotBurnAmount) > Number(bfotBalance)) {
      NotificationManager.error('Please input correct FOT amount')
      return
    }

    event.preventDefault()
    executebFotBurn()
  }

  const onbFotBurnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > Number(bfotBalance)) return
    if (Number(value) < 0) return
    handlebFotChange(Number(value))
  }

  const handlebFotBurnPlus = () => {
    if (Number(bfotBurnAmount) + 1 > Number(bfotBalance)) return

    handlebFotChange(Number(bfotBurnAmount) + 1)
  }
  const handlebFotBurnMinus = () => {
    if (Number(bfotBurnAmount) - 1 < 0) return
    handlebFotChange(Number(bfotBurnAmount) - 1)
  }

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
    executegFotStaking()
  }

  const handlegFotStakingClaimReward = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    event.preventDefault()
    executegFotClaimReward()
  }

  const ongFotStakingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > Number(gfotBalance)) return
    if (Number(value) < 0) return
    handlegFotStakingChange(Number(value))
  }

  const handlegFotStakingPlus = () => {
    if (Number(gfotStakingAmount) + 1 > Number(gfotBalance)) return

    handlegFotStakingChange(Number(gfotStakingAmount) + 1)
  }
  const handlegFotStakingMinus = () => {
    if (Number(gfotStakingAmount) - 1 < 0) return
    handlegFotStakingChange(Number(gfotStakingAmount) - 1)
  }

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '50px',
        }}
        className="w-full"
      >
        <LeftPart>
          <Converter
            handleBurnMinus={handlebFotBurnMinus}
            burnAmount={bfotBurnAmount}
            onBurnChange={onbFotBurnChange}
            handleBurnPlus={handlebFotBurnPlus}
            expectedAmount={expectedGfotAmount}
            convImg="/images/gfotarrow.png"
            from="bFOT"
            to="gFOT"
            handleSubmit={handlebFotBurn}
            balance={bfotBalance}
            handleChange={handlebFotChange}
            sbalance={gfotBalance}
          />
        </LeftPart>
        <RightPart>
          <StakeNClaim
            handleBurnMinus={handlegFotStakingMinus}
            onBurnChange={ongFotStakingChange}
            handleBurnPlus={handlegFotStakingPlus}
            handleFotStaking={handlegFotStaking}
            handleFotStakingClaimReward={handlegFotStakingClaimReward}
            tokenType="gFOT"
            gfotTokenInfo={gfotTokenInfo}
            showStakeNClaimReward={true}
            gfotStakingContractInfo={gfotStakingContractInfo}
            gfotStakingAmount={gfotStakingAmount}
            gfotStakingApy={gfotStakingApy}
            gfotStakingMyStaked={gfotStakingMyStaked}
            gfotStakingMyReward={gfotStakingMyReward}
            gfotBalance={gfotBalance}
            handlegFotStakingChange={handlegFotStakingChange}
            unstakingList={unstakingList}
            createUnstake={createUnstake}
            executeFetchUnstake={executeFetchUnstake}
            handleUnstakeChange={handleUnstakeChange}
            unstakeAmount={unstakeAmount}
            targetHour={0}
          />
          <StatisticBox values={defaultValues} />
        </RightPart>
      </div>
    </Wrapper>
  )
}

export default gfotmodule
