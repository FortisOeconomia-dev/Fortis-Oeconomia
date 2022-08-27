import { useEffect, useState, MouseEvent, ChangeEvent, useContext } from 'react'
import { NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import styled, { keyframes } from 'styled-components'

import { useSigningClient } from '../contexts/cosmwasm'
import { convertMicroDenomToDenom2 } from '../util/conversion'
import Converter from '../components/Converter'
import StatisticBox from '../components/StatisticBox'
import ThemeContext from '../contexts/ThemeContext'

//styled components
const shineAnimation = keyframes`
  0% {
    opacity: .3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .3;
  }
`

const Wrapper = styled.div`
  max-width: 1368px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  width: 100%;
  margin: 70px;
  padding: 0 20px;
  gap: 185px;
`

const LeftPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: 'space-between',
  flex: 1;
  max-width: 100%;
  margin-top: -50px;
  z-index: 10;
`

const RightPart = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;
  margin-top: -50px;
  z-index: 10;
`

const PageLine = styled.img`
  width: 100vw;
  position: fixed;
  left: 0px;
  top: 75%;
  z-index: 0;
  transform: translateY(-50%);
`

const DogIcon = styled.img`
  width: 480px;
  position: fixed;
  left: 44%;
  bottom: 0px;
  z-index: 1000;
  transform: translateX(-50%);
  pointer-events: none;
`

const StarsIcon = styled.img`
  position: fixed;
  top: 190px;
  left: 44%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ${shineAnimation} 2s linear infinite;
`

const AsteroidIcon = styled.img`
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translate(10px, -50%);
  z-index: -1;
`

const burnmodule = () => {
  const {
    walletAddress,
    signingClient,
    fotBalance,
    fotTokenInfo,
    bfotBalance,
    bfotTokenInfo,
    fotBurnContractInfo,
    fotBurnAmount,
    expectedBfotAmount,
    handleFotChange,
    executeFotBurn,
    getBfotBalances,
    updateInterval,
  } = useSigningClient()

  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('theme1')
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getBfotBalances()
  }, [signingClient, walletAddress])

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds === 0) {
      getBfotBalances()
    }
    const interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const defaultValues = [
    {
      key: 'FOT Supply',
      value: `${convertMicroDenomToDenom2(fotTokenInfo.total_supply, fotTokenInfo.decimals)}`,
    },
    {
      key: 'Burned FOT',
      value: `${convertMicroDenomToDenom2(fotBurnContractInfo.fot_burn_amount, bfotTokenInfo.decimals)}`,
    },
    {
      key: 'Total bFOT Supply',
      value: `${convertMicroDenomToDenom2(fotBurnContractInfo.bfot_sent_amount, bfotTokenInfo.decimals)}`,
    },
  ]

  const handleSubmit = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    if (Number(fotBurnAmount) == 0) {
      NotificationManager.error('Please input the FOT amount first')
      return
    }
    if (Number(fotBurnAmount) > Number(fotBalance)) {
      NotificationManager.error('Please input correct FOT amount')
      return
    }

    event.preventDefault()
    executeFotBurn()
  }

  const onFotBurnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > Number(fotBalance)) return
    if (Number(value) < 0) return
    handleFotChange(Number(value))
  }

  const handleFotBurnPlus = () => {
    if (Number(fotBurnAmount) + 1 > Number(fotBalance)) return

    handleFotChange(Number(fotBurnAmount) + 1)
  }
  const handleFotBurnMinus = () => {
    if (Number(fotBurnAmount) - 1 < 0) return
    handleFotChange(Number(fotBurnAmount) - 1)
  }

  return (
    <Wrapper>
      <LeftPart>
        <Converter
          handleBurnMinus={handleFotBurnMinus}
          burnAmount={fotBurnAmount}
          onBurnChange={onFotBurnChange}
          handleBurnPlus={handleFotBurnPlus}
          convImg="/images/fire-orange.png"
          from="FOT"
          to="bFOT"
          expectedAmount={expectedBfotAmount}
          handleSubmit={handleSubmit}
          handleChange={handleFotChange}
          balance={fotBalance}
          sbalance={bfotBalance}
        />
      </LeftPart>
      <RightPart>
        <AsteroidIcon src='/images/asteroid.png' alt='asteroid' />
        <StatisticBox values={defaultValues} />
      </RightPart>
      <PageLine src='/images/page-line.png' alt='page-line' />
      <DogIcon src='/images/dogXL.png' alt='dog' />
      <StarsIcon src='/images/four-stars.png' alt='four-stars' />
    </Wrapper>
  )
}

export default burnmodule
