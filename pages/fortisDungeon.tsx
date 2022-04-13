import React, { useState } from 'react'
import { useEffect, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from '../components/Layout/Layout'
import Converter from '../components/Converter'
import Pool from '../components/Pool'
import PoolDetail from '../components/PoolDetail'
import { useSigningClient } from '../contexts/cosmwasm'
import 'react-notifications/lib/notifications.css'
import {
  bFOTImage,
  gFOTImage,
  sFOTImage,
  fotImage,
  lp1Image,
  lp2Image,
  lp3Image,
  lp4Image,
  lp5Image,
  lp6Image,
  lp7Image,
} from '../util/tokenImageUtils'
import ThemeContext from '../contexts/ThemeContext'

//styled components
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 90px 0;
  display: flex;
  align-items: flex-start;
  flex: 1;
  flex-wrap: wrap;
  background-image: url('/images/chain-left.svg'), url('/images/chain-right.svg');
  background-position: left center, right center;
  background-repeat: no-repeat;
  background-size: 50% 100%;
  img {
    filter: ${props => props.defaultChecked && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg) '};
  }
`
const Title = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #fbfcfd;
  text-align: center;
`

const Assets = styled.div`
  display: flex;
  width: 240px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 43px 0 32px;
`

const ConverterContainer = styled.div`
  padding: 22px 50px;
`

const fortisDungeon = () => {
  const {
    walletAddress,
    signingClient,
    nativeBalance,
    atomBalance,
    fotBalance,
    bfotBalance,
    gfotBalance,
    sfotBalance,
    ustBalance,
    sfotBfotLpBalance,
    pool1LpBfotLpBalance,
    pool2LpSfotLpBalance,
    pool3LpUstLpBalance,
    pool4LpJunoLpBalance,
    pool5LpAtomLpBalance,
    pool6LpGfotLpBalance,
    pool7LpFotLpBalance,
    swapToken1,
    expectedToken2Amount,
    executeSwap,
    calcExpectedSwapAmount,
    executeSwapForDungeon,
    calcExpectedSwapAmountForDungeon,
    swapAmount,
    setSwapAmount,
    getBfotBalances,
    getSfotBalances,
    updateInterval,
  } = useSigningClient()

  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getBfotBalances()
    getSfotBalances()
  }, [signingClient, walletAddress])

  // only pool3 and pool8
  useEffect(() => {
    // setAsset(2)
  }, [])

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = null
    if (seconds === 0) {
      getSfotBalances()
    }
    interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const { toggle,setToggle, asset, setAsset } = useContext(ToggleContext)
  const [swapBalance, setSwapBalance] = useState(0)
  const onSwapAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > Number(swapBalance)) return
    if (Number(value) < 0) return
    setSwapAmount(Number(value))
  }

  const handleSwapAmountPlus = () => {
    if (Number(swapAmount) + 1 > Number(swapBalance)) return

    setSwapAmount(Number(swapAmount) + 1)
  }
  const handleSwapAmountMinus = () => {
    if (Number(swapAmount) - 1 < 0) return
    setSwapAmount(Number(swapAmount) - 1)
  }

  const handleSwapMax = () => {
    setSwapAmount(swapBalance)
  }

  const handleSwap = () => {
    executeSwapForDungeon(asset)
  }

  const [swapBalances, setSwapBalances] = useState([0, 0])

  useEffect(() => {
    if (toggle) setToggle(false)
  }, [toggle])

  useEffect(() => {
    setTheme('theme' + (asset + 2))
  }, [asset])

  useEffect(() => {
    let balances = []
    setSwapAmount(0)
    setSwapBalance(0)

    if (asset == 0) balances = [bfotBalance, sfotBalance]
    else if (asset == 1) balances = [bfotBalance, sfotBfotLpBalance]
    else if (asset == 2) balances = [sfotBalance, pool1LpBfotLpBalance]
    else if (asset == 3) balances = [ustBalance, pool2LpSfotLpBalance]
    else if (asset == 4) balances = [nativeBalance, pool3LpUstLpBalance]
    else if (asset == 5) balances = [atomBalance, pool4LpJunoLpBalance]
    else if (asset == 6) balances = [gfotBalance, pool5LpAtomLpBalance]
    else if (asset == 7) balances = [fotBalance, pool6LpGfotLpBalance]

    // console.log(`[j]===> fotbalance: ${fotBalance}, lp7balance: ${pool6LpGfotLpBalance}` )
    setSwapBalances(balances)
    if (swapToken1) {
      setSwapBalance(balances[0])
    } else {
      setSwapBalance(balances[1])
    }
  }, [asset, fotBalance, sfotBalance, swapToken1, ustBalance, bfotBalance, gfotBalance, atomBalance, nativeBalance,
    sfotBfotLpBalance,
    pool1LpBfotLpBalance,
    pool2LpSfotLpBalance,
    pool3LpUstLpBalance,
    pool4LpJunoLpBalance,
    pool5LpAtomLpBalance,
    pool6LpGfotLpBalance,
    pool7LpFotLpBalance,
  ])

  useEffect(() => {
    if (!signingClient || walletAddress == '') return

    calcExpectedSwapAmountForDungeon(asset)

  }, [swapAmount, signingClient, walletAddress])

  const assets = [
    {
      from: 'bFOT',
      to: 'sFOT',
      fromImage: bFOTImage(toggle),
      toImage: sFOTImage(toggle),
      showMaxButton: false,
      showUnstakeAllButton: false,
      lpfetchunstake:false,
      level: 1,
      showTorch: true,
      showStakeAllButton:false,
      showLpAmount:false,
      showDPR:false,
      showClaimForm: false,
      showReward:false,
    },
    {
      from: 'bFOT',
      to: 'LP1',
      fromImage: bFOTImage(toggle),
      toImage: lp1Image(toggle),
      showMaxButton: false,
      showUnstakeAllButton: false,
      lpfetchunstake:false,
      showStakeAllButton:false,
      level: 2,
      showTorch: true,
      showLpAmount:false,
      showDPR:false,
      showClaimForm: false,
      showReward:false,
    },
    {
      from: 'sFOT',
      to: 'LP2',
      fromImage: sFOTImage(toggle),
      toImage: lp2Image(toggle),
      showStakeForm: true,
      showMaxButton: true,
      showUnstakeAllButton: true,
      showClaimForm: true,
      level: 3,
      showDPR:true,
      showStakeAllButton:true,
      showLpAmount:true,
      lpfetchunstake:false,
      showReward:false,
    },
    {
      from: 'UST',
      to: 'LP3',
      fromImage: '../images/ust.png',
      toImage: lp3Image(toggle),
      showMaxButton: false,
      showUnstakeAllButton: false,
      showStakeAllButton:false,
      level: 4,
      showTorch: true,
      showLpAmount:false,
      lpfetchunstake:false,
      showDPR:false,
      showClaimForm: false,
      showReward:false,
    },
    {
      from: 'JUNO',
      to: 'LP4',
      fromImage: '../images/juno.png',
      toImage: lp4Image(toggle),
      showMaxButton: false,
      showUnstakeAllButton: false,
      showStakeAllButton:false,
      level: 5,
      showTorch: true,
      showLpAmount:false,
      lpfetchunstake:false,
      showDPR:false,
      showClaimForm: false,
      showReward:false,
    },
    {
      from: 'ATOM',
      to: 'LP5',
      fromImage: '../images/atom.png',
      toImage: lp5Image(toggle),
      showMaxButton: false,
      showUnstakeAllButton: false,
      showStakeAllButton:false,
      level: 6,
      showTorch: true,
      showLpAmount:false,
      lpfetchunstake:false,
      showDPR:false,
      showClaimForm: false,
      showReward:false,
    },
    {
      from: 'gFOT',
      to: 'LP6',
      fromImage: gFOTImage(toggle),
      toImage: lp6Image(toggle),
      showMaxButton: false,
      showUnstakeAllButton: false,
      showStakeAllButton:false,
      level: 7,
      showTorch: true,
      showLpAmount:false,
      lpfetchunstake:false,
      showDPR:false,
      showClaimForm: false,
      showReward:false,
    },
    {
      from: 'FOT',
      to: 'LP7',
      fromImage: fotImage(toggle),
      toImage: lp7Image(toggle),
      showStakeForm: true,
      showMaxButton: true,
      showUnstakeAllButton: true,
      showClaimForm: true,
      level: 8,
      showDPR:true,
      showStakeAllButton:true,
      showLpAmount:true,
      lpfetchunstake:false,
      showReward:false,
   },
  ]

  return (
    <Wrapper defaultChecked={toggle}>
      <Assets>
        <Title>Assets</Title>
        {assets.map((item, index) => (
          <Pool
            key={index}
            from={item.from}
            to={item.to}
            fromImage={item.fromImage}
            toImage={item.toImage}
            onClick={() => setAsset(index)}
            // onClick={() => { if (index == 2 || index == 7) setAsset(index)}}
            isActive={asset === index}
            imagesPosition="top"
            level={item.level}
          />
        ))}
      </Assets>
      <PoolDetail
        asset={asset + 10}
        from={assets[asset].from}
        to={assets[asset].to}
        fromImage={assets[asset].fromImage}
        toImage={assets[asset].toImage}
        level={asset + 1}
        showEpochReward={true}
        showDPR={assets[asset].showDPR}
        showLpAmount={assets[asset].showLpAmount}
        showTorch={assets[asset].showTorch}
        maxWidth={'none'}
        showStakeForm={assets[asset].showStakeForm}
        showClaimForm={assets[asset].showClaimForm}
        showReward={assets[asset].showReward}
        showMaxButtonInLiquidityForm={assets[asset].showMaxButton}
        showStakeAllButton={assets[asset].showStakeAllButton}
        showUnstakeAllButton={assets[asset].showUnstakeAllButton}
        lpfetchunstake={assets[asset].lpfetchunstake}
        unstakeButtonText="Unstake"
        middletext='My Liquidity'
      />
      <ConverterContainer>
        <Converter
          maxW="328px"
          wfull={false}
          handleBurnMinus={handleSwapAmountMinus}
          burnAmount={swapAmount}
          onBurnChange={onSwapAmountChange}
          handleBurnPlus={handleSwapAmountPlus}
          expectedAmount={expectedToken2Amount}
          convImg={() => (
            <svg width="127" height="70" viewBox="0 0 127 94" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.23677" y1="2.15124" x2="63.3153" y2="92.6086" stroke="#171E0E" strokeWidth="3" />
              <line x1="62.7632" y1="91.6095" x2="124.841" y2="1.15126" stroke="#171E0E" strokeWidth="3" />
            </svg>
          )}
          convImg2={(func: any) => {
            return (
              <svg
                onClick={func}
                cursor="pointer"
                width="32"
                height="70"
                viewBox="0 0 32 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.76721 1.23279C8.34349 0.809067 7.65651 0.809067 7.23279 1.23279L0.327891 8.13769C-0.0958281 8.56141 -0.0958281 9.24839 0.327891 9.67211C0.75161 10.0958 1.43859 10.0958 1.86231 9.67211L8 3.53442L14.1377 9.67211C14.5614 10.0958 15.2484 10.0958 15.6721 9.67211C16.0958 9.24839 16.0958 8.56141 15.6721 8.13769L8.76721 1.23279ZM9.085 68L9.085 2H6.915L6.915 68H9.085Z"
                  fill="#171E0E"
                />
                <path
                  d="M23.2328 68.7672C23.6565 69.1909 24.3435 69.1909 24.7672 68.7672L31.6721 61.8623C32.0958 61.4386 32.0958 60.7516 31.6721 60.3279C31.2484 59.9042 30.5614 59.9042 30.1377 60.3279L24 66.4656L17.8623 60.3279C17.4386 59.9042 16.7516 59.9042 16.3279 60.3279C15.9042 60.7516 15.9042 61.4386 16.3279 61.8623L23.2328 68.7672ZM22.915 2L22.915 68H25.085L25.085 2L22.915 2Z"
                  fill="#171E0E"
                />
              </svg>
            )
          }}
          from={assets[asset].from}
          to={assets[asset].to}
          fromImage={assets[asset].fromImage}
          toImage={assets[asset].toImage}
          handleSubmit={handleSwap}
          balance={swapBalances[0]}
          handleChange={handleSwapMax}
          sbalance={swapBalances[1]}
          submitTitle="Swap"
          showBalance={true}
        />
      </ConverterContainer>
    </Wrapper>
  )
}

export default fortisDungeon
