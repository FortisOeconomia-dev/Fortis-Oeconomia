import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../components/Layout/Layout'
import Converter from '../components/Converter'
import StatisticBox from '../components/StatisticBox'
import { useSigningClient } from '../contexts/cosmwasm'
import { convertMicroDenomToDenom2 } from '../util/conversion'
import ThemeContext from '../contexts/ThemeContext'
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
    clearanceSfotAmount,
    stableExpectedSfotAmount,
    getSfotBalances,
    updateInterval,
  } = useSigningClient()

  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getSfotBalances()
  }, [signingClient, walletAddress])

  const { toggle } = useContext(ToggleContext)

  useEffect(() => {
    setTheme('theme10')
    getSfotBalances()
    const interval = setInterval(() => getSfotBalances(), updateInterval * 1000)
    return () => clearInterval(interval)
  }, [])

  const defaultValues = [
    {
      key: 'sFOT Supply',
      value: `${convertMicroDenomToDenom2(sfotTokenInfo.total_supply, sfotTokenInfo.decimals)}`,
    },
    {
      key: 'FOT Supply',
      value: `${convertMicroDenomToDenom2(fotTokenInfo.total_supply, fotTokenInfo.decimals)}`,
    },
  ]

  if (!signingClient || walletAddress == '') return null

  return (
    <Wrapper defaultChecked={toggle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '50px',
          maxWidth: 1368,
        }}
        className="w-full"
      >
        <LeftPart>
          <Converter
            wfull={false}
            handleBurnMinus={null}
            onBurnChange={null}
            handleBurnPlus={null}
            burnAmount={clearanceSfotAmount}
            expectedAmount={stableExpectedSfotAmount}
            convImg={() => (
              <svg width="127" height="70" viewBox="0 0 127 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1.23677" y1="2.15124" x2="63.3153" y2="92.6086" stroke="#171E0E" strokeWidth="3" />
                <line x1="62.7632" y1="91.6095" x2="124.841" y2="1.15126" stroke="#171E0E" strokeWidth="3" />
              </svg>
            )}
            from={'sFOT'}
            to={'FOT'}
            handleSubmit={null}
            balance={fotBalance}
            handleChange={null}
            sbalance={sfotBalance}
            submitTitle={'Purchase'}
            showBalance={true}
          />
        </LeftPart>
        <RightPart>
          <StatisticBox values={defaultValues} maxWidth={null} />
        </RightPart>
      </div>
    </Wrapper>
  )
}

export default communitySale
