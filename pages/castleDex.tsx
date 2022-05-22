import React, { useState, useEffect, MouseEvent, useContext, ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../components/Layout/Layout'
import Converter from '../components/CastleConverter'
import { useSigningClient } from '../contexts/cosmwasm'
import ThemeContext from '../contexts/ThemeContext'
import 'react-notifications/lib/notifications.css'
import Pool from '../components/Pool/WidePool'
import StatisticBox from '../components/StatisticBox'
import PoolDetail from '../components/PoolDetail'

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
  margin-top: 0;
  padding: 0 20px;
  gap: 37px;
  img {
    filter: ${props => props.defaultChecked && 'invert(1) hue-rotate(-170deg)'};
  }
`
const Divider = styled.div`
  width: 2.06px;
  background: linear-gradient(180deg, #171e0e 0%, #ffffff 100%);
`
const LeftPart = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 10px;
  width: 40%;
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  align-self: center;
  min-width: 40%;
`

const Pools = styled.div`
  display: flex;
`

const PoolsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`
interface ElementProps {
  small?: boolean
}

const OutWrapper = styled.div<ElementProps>`
  filter: ${props => props.defaultChecked && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg)'};
  background: linear-gradient(105deg, #98acff 0%, #6774ad 81.65%);
  box-shadow: ${props => props.slot};
  border-radius: 100%;
  width: ${props => (props.small ? '30px' : '48px')};
  height: ${props => (props.small ? '30px' : '48px')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
`

const AssetImageWrapper = styled.div<ElementProps>`
  background: ${props => props.slot};
  border: 1.4694px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100%;
  width: ${props => (props.small ? '24px' : '40px')};
  height: ${props => (props.small ? '24px' : '40px')};
  display: flex;
  align-items: center;
  justify-content: center;
`
const PoolButtonsLower = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin-left: 5%;
`

const PoolButtonsUpper = styled.div`
  display: flex;
  justify-content: space-between;
`

const castleDex = () => {
  const {
    walletAddress,
    signingClient,
    swapAmount,
    setSwapAmount,
    nativeBalance,
    atomBalance,
    bfotBalance,
    gfotBalance,
    sfotBalance,
    ustBalance,
    expectedToken2Amount,
    getSfotBalances,
    getCommonBalances,
    swapToken1,
    executeSwap,
    updateInterval,
    calcExpectedSwapAmount,
  } = useSigningClient()

  const { setTheme } = useContext(ThemeContext)
  const [swapBalances, setSwapBalances] = useState([0, 0])
  const [swapBalance, setSwapBalance] = useState(ustBalance)
  const [seconds, setSeconds] = useState(0)

  const [asset, setAsset] = useState(0)

  const [swapTo, setSwapTo] = useState(3)
  const [swapToBalance, setSwapToBalance] = useState([])

  const [swapFrom, setSwapFrom] = useState(0)
  const [swapFromBalance, setSwapFromBalance] = useState([])

  const [poolAsset, setPoolAsset] = useState(0)
  const { toggle } = useContext(ToggleContext)

  const sFOTImage = (toggle, small = false) => (
    <OutWrapper
      defaultChecked={toggle}
      small={small}
      slot={`101.76px 27.2666px 210.7px rgba(26, 30, 44, 0.338), inset -37.9905px -10.1795px 39.3307px #606CA1, inset 37.9905px 10.1795px 39.3307px #9FB4FF`}
    >
      <AssetImageWrapper small={small} slot={`linear-gradient(180deg, #85B79D 0%, #FAFDFC 100%)`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" viewBox="0 0 34 20" fill="none">
          <path
            d="M15.3539 0.360624C12.905 0.89715 10.9542 2.12497 9.51187 4.06471C7.18752 7.17037 6.84509 11.2768 8.60911 14.7643L8.89965 15.3421L7.58183 15.6619C5.75555 16.1056 5.04995 16.2191 4.03304 16.2294C3.09915 16.2397 2.73598 16.1262 2.63221 15.796C2.53882 15.4865 2.81899 15.0428 3.53497 14.3825C3.89815 14.0523 4.0538 13.8666 3.8774 13.9801C2.49731 14.8055 0.982337 16.1468 0.857819 16.6421C0.826689 16.8072 0.837066 17.0445 0.899325 17.1786C1.20025 17.8286 3.42083 17.5913 7.70635 16.4564L9.45998 15.9921L9.62601 16.2191C10.1448 16.9723 11.8673 18.4683 12.2201 18.4683C12.2824 18.4683 12.3343 18.5096 12.3343 18.5612C12.3343 18.7057 13.8908 19.366 14.7832 19.6033C15.8623 19.8922 17.4396 19.9747 18.5914 19.8097C19.0894 19.7478 19.463 19.6446 19.4319 19.593C19.4007 19.5414 19.546 19.5001 19.7535 19.5001C20.1893 19.5001 21.6109 18.943 21.9015 18.6541C22.0052 18.5509 22.1401 18.4683 22.2128 18.4683C22.5552 18.4683 24.2466 16.9104 24.9626 15.9302C25.4399 15.2698 26.27 13.5364 26.4775 12.742C26.7369 11.7721 26.8926 10.2451 26.82 9.32679L26.7473 8.49104L27.9199 7.85134C29.5801 6.93306 31.2923 5.77746 32.1535 4.983C33.1912 4.02344 33.4091 3.52819 32.9733 3.13611C32.7865 2.97103 32.5997 2.94007 31.7488 2.95039C30.8668 2.96071 28.5736 3.32183 28.4179 3.4766C28.3868 3.50755 28.7396 3.50755 29.1962 3.46628C31.0225 3.32183 31.4894 3.8274 30.5244 4.8695C30.2442 5.1584 29.7669 5.59174 29.4556 5.82905C28.6981 6.40685 26.6851 7.73785 26.5605 7.73785C26.5087 7.73785 26.4153 7.52117 26.3426 7.24259C25.9691 5.74651 24.8484 3.86867 23.6759 2.78531C22.3788 1.57812 20.7185 0.71143 19.0583 0.370941C18.0829 0.174904 16.267 0.164587 15.3539 0.360624ZM18.996 1.29954C22.2958 2.04242 24.9314 4.68378 25.6578 7.96484C25.72 8.22278 25.6578 8.27437 24.2881 9.00693C20.3242 11.153 16.4123 12.8245 11.4834 14.496L9.84392 15.0532L9.57413 14.5889C7.92425 11.8031 8.06952 7.85134 9.91655 5.08617C11.141 3.24961 13.0399 1.89798 15.1567 1.34081C16.1321 1.09319 17.9688 1.07255 18.996 1.29954ZM25.8653 9.39901C25.9795 9.96649 25.938 10.6887 25.7304 11.7411C25.3465 13.7222 24.4749 15.2801 22.9391 16.735C21.9845 17.6326 20.6148 18.4683 20.0856 18.4683C19.9403 18.4683 19.8054 18.5096 19.7847 18.5715C19.7224 18.7572 18.3319 18.9842 17.2632 18.9842C16.1944 18.9842 14.8039 18.7572 14.7416 18.5715C14.7209 18.5096 14.5756 18.4683 14.4304 18.4683C13.7559 18.4683 12.189 17.5191 11.058 16.4254C10.1345 15.5278 10.1033 15.6103 11.5042 15.1667C15.0218 14.0214 19.878 11.9991 23.8004 10.0284C24.8277 9.5125 25.6993 9.08948 25.7304 9.08948C25.7719 9.07916 25.8238 9.22361 25.8653 9.39901Z"
            fill="#246B51"
          />
        </svg>
      </AssetImageWrapper>
    </OutWrapper>
  )

  const bFOTImage = (toggle, small = false) => (
    <OutWrapper
      defaultChecked={toggle}
      small={small}
      slot={`77.5316px 20.7745px 160.533px rgba(26, 30, 44, 0.338), inset -28.9451px -7.75583px 29.9662px #606CA1, inset 28.9451px 7.75583px 29.9662px #9FB4FF`}
    >
      <AssetImageWrapper small={small} slot={`linear-gradient(179.97deg, #C1292E -90.61%, #FAFDFC 112.72%)`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" viewBox="0 0 34 20" fill="none">
          <path
            d="M15.3539 0.360624C12.905 0.89715 10.9542 2.12497 9.51187 4.06471C7.18752 7.17037 6.84509 11.2768 8.60911 14.7643L8.89965 15.3421L7.58183 15.6619C5.75555 16.1056 5.04995 16.2191 4.03304 16.2294C3.09915 16.2397 2.73598 16.1262 2.63221 15.796C2.53882 15.4865 2.81899 15.0428 3.53497 14.3825C3.89815 14.0523 4.0538 13.8666 3.8774 13.9801C2.49731 14.8055 0.982337 16.1468 0.857819 16.6421C0.826689 16.8072 0.837066 17.0445 0.899325 17.1786C1.20025 17.8286 3.42083 17.5913 7.70635 16.4564L9.45998 15.9921L9.62601 16.2191C10.1448 16.9723 11.8673 18.4683 12.2201 18.4683C12.2824 18.4683 12.3343 18.5096 12.3343 18.5612C12.3343 18.7057 13.8908 19.366 14.7832 19.6033C15.8623 19.8922 17.4396 19.9747 18.5914 19.8097C19.0894 19.7478 19.463 19.6446 19.4319 19.593C19.4007 19.5414 19.546 19.5001 19.7535 19.5001C20.1893 19.5001 21.6109 18.943 21.9015 18.6541C22.0052 18.5509 22.1401 18.4683 22.2128 18.4683C22.5552 18.4683 24.2466 16.9104 24.9626 15.9302C25.4399 15.2698 26.27 13.5364 26.4775 12.742C26.7369 11.7721 26.8926 10.2451 26.82 9.32679L26.7473 8.49104L27.9199 7.85134C29.5801 6.93306 31.2923 5.77746 32.1535 4.983C33.1912 4.02344 33.4091 3.52819 32.9733 3.13611C32.7865 2.97103 32.5997 2.94007 31.7488 2.95039C30.8668 2.96071 28.5736 3.32183 28.4179 3.4766C28.3868 3.50755 28.7396 3.50755 29.1962 3.46628C31.0225 3.32183 31.4894 3.8274 30.5244 4.8695C30.2442 5.1584 29.7669 5.59174 29.4556 5.82905C28.6981 6.40685 26.6851 7.73785 26.5605 7.73785C26.5087 7.73785 26.4153 7.52117 26.3426 7.24259C25.9691 5.74651 24.8484 3.86867 23.6759 2.78531C22.3788 1.57812 20.7185 0.71143 19.0583 0.370941C18.0829 0.174904 16.267 0.164587 15.3539 0.360624ZM18.996 1.29954C22.2958 2.04242 24.9314 4.68378 25.6578 7.96484C25.72 8.22278 25.6578 8.27437 24.2881 9.00693C20.3242 11.153 16.4123 12.8245 11.4834 14.496L9.84392 15.0532L9.57413 14.5889C7.92425 11.8031 8.06952 7.85134 9.91655 5.08617C11.141 3.24961 13.0399 1.89798 15.1567 1.34081C16.1321 1.09319 17.9688 1.07255 18.996 1.29954ZM25.8653 9.39901C25.9795 9.96649 25.938 10.6887 25.7304 11.7411C25.3465 13.7222 24.4749 15.2801 22.9391 16.735C21.9845 17.6326 20.6148 18.4683 20.0856 18.4683C19.9403 18.4683 19.8054 18.5096 19.7847 18.5715C19.7224 18.7572 18.3319 18.9842 17.2632 18.9842C16.1944 18.9842 14.8039 18.7572 14.7416 18.5715C14.7209 18.5096 14.5756 18.4683 14.4304 18.4683C13.7559 18.4683 12.189 17.5191 11.058 16.4254C10.1345 15.5278 10.1033 15.6103 11.5042 15.1667C15.0218 14.0214 19.878 11.9991 23.8004 10.0284C24.8277 9.5125 25.6993 9.08948 25.7304 9.08948C25.7719 9.07916 25.8238 9.22361 25.8653 9.39901Z"
            fill="#2B064D"
          />
        </svg>
      </AssetImageWrapper>
    </OutWrapper>
  )

  const gFOTImage = (toggle, small = false) => (
    <OutWrapper
      defaultChecked={toggle}
      small={small}
      slot={`77.5316px 20.7745px 160.533px rgba(26, 30, 44, 0.338), inset -28.9451px -7.75583px 29.9662px #606CA1, inset 28.9451px 7.75583px 29.9662px #9FB4FF`}
    >
      <AssetImageWrapper small={small} slot={`linear-gradient(180.02deg, #4B0C86 -128.9%, #F4F6FF 99.98%)`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" viewBox="0 0 34 20" fill="none">
          <path
            d="M15.3539 0.360624C12.905 0.89715 10.9542 2.12497 9.51187 4.06471C7.18752 7.17037 6.84509 11.2768 8.60911 14.7643L8.89965 15.3421L7.58183 15.6619C5.75555 16.1056 5.04995 16.2191 4.03304 16.2294C3.09915 16.2397 2.73598 16.1262 2.63221 15.796C2.53882 15.4865 2.81899 15.0428 3.53497 14.3825C3.89815 14.0523 4.0538 13.8666 3.8774 13.9801C2.49731 14.8055 0.982337 16.1468 0.857819 16.6421C0.826689 16.8072 0.837066 17.0445 0.899325 17.1786C1.20025 17.8286 3.42083 17.5913 7.70635 16.4564L9.45998 15.9921L9.62601 16.2191C10.1448 16.9723 11.8673 18.4683 12.2201 18.4683C12.2824 18.4683 12.3343 18.5096 12.3343 18.5612C12.3343 18.7057 13.8908 19.366 14.7832 19.6033C15.8623 19.8922 17.4396 19.9747 18.5914 19.8097C19.0894 19.7478 19.463 19.6446 19.4319 19.593C19.4007 19.5414 19.546 19.5001 19.7535 19.5001C20.1893 19.5001 21.6109 18.943 21.9015 18.6541C22.0052 18.5509 22.1401 18.4683 22.2128 18.4683C22.5552 18.4683 24.2466 16.9104 24.9626 15.9302C25.4399 15.2698 26.27 13.5364 26.4775 12.742C26.7369 11.7721 26.8926 10.2451 26.82 9.32679L26.7473 8.49104L27.9199 7.85134C29.5801 6.93306 31.2923 5.77746 32.1535 4.983C33.1912 4.02344 33.4091 3.52819 32.9733 3.13611C32.7865 2.97103 32.5997 2.94007 31.7488 2.95039C30.8668 2.96071 28.5736 3.32183 28.4179 3.4766C28.3868 3.50755 28.7396 3.50755 29.1962 3.46628C31.0225 3.32183 31.4894 3.8274 30.5244 4.8695C30.2442 5.1584 29.7669 5.59174 29.4556 5.82905C28.6981 6.40685 26.6851 7.73785 26.5605 7.73785C26.5087 7.73785 26.4153 7.52117 26.3426 7.24259C25.9691 5.74651 24.8484 3.86867 23.6759 2.78531C22.3788 1.57812 20.7185 0.71143 19.0583 0.370941C18.0829 0.174904 16.267 0.164587 15.3539 0.360624ZM18.996 1.29954C22.2958 2.04242 24.9314 4.68378 25.6578 7.96484C25.72 8.22278 25.6578 8.27437 24.2881 9.00693C20.3242 11.153 16.4123 12.8245 11.4834 14.496L9.84392 15.0532L9.57413 14.5889C7.92425 11.8031 8.06952 7.85134 9.91655 5.08617C11.141 3.24961 13.0399 1.89798 15.1567 1.34081C16.1321 1.09319 17.9688 1.07255 18.996 1.29954ZM25.8653 9.39901C25.9795 9.96649 25.938 10.6887 25.7304 11.7411C25.3465 13.7222 24.4749 15.2801 22.9391 16.735C21.9845 17.6326 20.6148 18.4683 20.0856 18.4683C19.9403 18.4683 19.8054 18.5096 19.7847 18.5715C19.7224 18.7572 18.3319 18.9842 17.2632 18.9842C16.1944 18.9842 14.8039 18.7572 14.7416 18.5715C14.7209 18.5096 14.5756 18.4683 14.4304 18.4683C13.7559 18.4683 12.189 17.5191 11.058 16.4254C10.1345 15.5278 10.1033 15.6103 11.5042 15.1667C15.0218 14.0214 19.878 11.9991 23.8004 10.0284C24.8277 9.5125 25.6993 9.08948 25.7304 9.08948C25.7719 9.07916 25.8238 9.22361 25.8653 9.39901Z"
            fill="#2B064D"
          />
        </svg>
      </AssetImageWrapper>
    </OutWrapper>
  )

  const assets = [
    {
      from: 'sFOT',
      to: 'UST',
      fromImage: sFOTImage,
      toImage: '/images/ust.png',
    },
    {
      from: 'sFOT',
      to: 'bFOT',
      fromImage: sFOTImage,
      toImage: bFOTImage,
    },
    {
      from: 'sFOT',
      to: 'gFOT',
      fromImage: sFOTImage,
      toImage: gFOTImage,
    },
    {
      from: 'sFOT',
      to: 'Juno',
      fromImage: sFOTImage,
      toImage: '/images/juno.png',
    },
    {
      from: 'sFOT',
      to: 'Atom',
      fromImage: sFOTImage,
      toImage: '/images/atom.png',
    },
  ]

  const assetArray = [
    {
      name: 'UST',
      image: '/images/ust.png',
    },
    {
      name: 'bFOT',
      image: bFOTImage,
    },
    {
      name: 'gFOT',
      image: gFOTImage,
    },
    {
      name: 'sFOT',
      image: sFOTImage,
    },
    {
      name: 'Juno',
      image: '/images/juno.png',
    },
    {
      name: 'Atom',
      image: '/images/atom.png',
    },
  ]

  useEffect(() => {
    setTheme('primary')
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getSfotBalances()
    getCommonBalances()
  }, [signingClient, walletAddress])

  useEffect(() => {
    if (seconds === 0) {
      getSfotBalances()
      getCommonBalances()
    }
    const interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  useEffect(() => {
    setSwapAmount(0)
    let swapToBalances = []
    if (swapTo == 0) swapToBalances = [ustBalance]
    else if (swapTo == 1) swapToBalances = [bfotBalance]
    else if (swapTo == 2) swapToBalances = [gfotBalance]
    else if (swapTo == 3) swapToBalances = [sfotBalance]
    else if (swapTo == 4) swapToBalances = [nativeBalance]
    else if (swapTo == 5) swapToBalances = [atomBalance]
    setSwapToBalance(swapToBalances[0])

    let swapFromBalance = []
    if (swapFrom == 0) swapFromBalance = [ustBalance]
    else if (swapFrom == 1) swapFromBalance = [bfotBalance]
    else if (swapFrom == 2) swapFromBalance = [gfotBalance]
    else if (swapFrom == 3) swapFromBalance = [sfotBalance]
    else if (swapFrom == 4) swapFromBalance = [nativeBalance]
    else if (swapFrom == 5) swapFromBalance = [atomBalance]
    setSwapFromBalance(swapFromBalance[0])

    setSwapBalances([swapFromBalance[0], swapToBalances[0]])

    if (swapToken1) {
      setSwapBalance(swapFromBalance[0])
    } else {
      setSwapBalance(swapToBalances[0])
    }
  }, [swapTo, swapFrom, swapToken1, sfotBalance, ustBalance, bfotBalance, gfotBalance, atomBalance, nativeBalance])

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

  const handleChange = balance => {
    setSwapAmount(balance)
  }

  const handleExchangeToFrom = useCallback(
    (to: string, from: string) => {
      let toIndex = findAssetFromName(to)
      let fromIndex = findAssetFromName(from)
      setSwapFrom(toIndex)
      setSwapTo(fromIndex)
    },
    [swapFrom, swapTo],
  )

  const findAssetFromName = (name: string): number => {
    return assetArray.findIndex(item => item.name === name)
  }
  const handleSwap = async () => {
    let swap1 = await executeSwap(swapFrom, true)
    console.log(swap1, 'SWAP 1 RES')
    if (swap1 && swapFrom !== 3 && swapTo !== 3) {
      console.log('transaction do not included SFOT')
      await executeSwap(swapTo, false)
    }
  }

  const handleChangeAsset = useCallback(
    (name: string, from: boolean, to: boolean) => {
      const newAsset = findAssetFromName(name)

      if (from && newAsset !== swapTo) {
        setSwapFrom(newAsset)
        setAsset(newAsset)
      }
      if (to && newAsset !== swapFrom) {
        setSwapTo(newAsset)
        setAsset(newAsset)
      }
    },
    [swapFrom, swapTo],
  )

  const { page, setPage } = useContext(ToggleContext)

  useEffect(() => {
    if (!signingClient || walletAddress == '') return

    calcExpectedSwapAmount(swapFrom, swapTo)
  }, [swapAmount, signingClient, walletAddress])

  const handlePoolAssetChange = (poolAsset: number) => {
    setPoolAsset(poolAsset)
    setPage(4)
  }
  return (
    <Wrapper defaultChecked={toggle}>
      {page < 4 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '50px',
          }}
          className="w-full"
        >
          <LeftPart>
            <Converter
              wfull={false}
              handleBurnMinus={handleSwapAmountMinus}
              burnAmount={swapAmount}
              onBurnChange={onSwapAmountChange}
              handleBurnPlus={handleSwapAmountPlus}
              expectedAmount={expectedToken2Amount}
              handleExchange={handleExchangeToFrom}
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
              assets={assetArray}
              from={assetArray[swapFrom].name}
              fromImage={assetArray[swapFrom].image}
              to={assetArray[swapTo].name}
              toImage={assetArray[swapTo].image}
              handleSubmit={handleSwap}
              balance={swapToBalance}
              handleChange={handleChange}
              sbalance={swapFromBalance}
              submitTitle={'Swap'}
              showBalance={true}
              handleChangeAsset={handleChangeAsset}
            />
          </LeftPart>
          <RightPart>
            <Pools>
              <PoolsContent>
                <StatisticBox page={page} setPage={setPage} maxWidth={null}></StatisticBox>

                <PoolButtonsUpper>
                  <Pool
                    from="sFOT"
                    to="UST"
                    fromImage={sFOTImage}
                    toImage="/images/ust.png"
                    onClick={() => handlePoolAssetChange(0)}
                    isActive={poolAsset === 0}
                  />
                  <Pool
                    from="sFOT"
                    to="bFOT"
                    fromImage={sFOTImage}
                    toImage={bFOTImage}
                    onClick={() => handlePoolAssetChange(1)}
                    isActive={poolAsset === 1}
                  />
                  <Pool
                    from="sFOT"
                    to="gFOT"
                    fromImage={sFOTImage}
                    toImage={gFOTImage}
                    onClick={() => handlePoolAssetChange(2)}
                    isActive={poolAsset === 2}
                  />
                </PoolButtonsUpper>
                <PoolButtonsLower>
                  <Pool
                    from="sFOT"
                    to="Juno"
                    fromImage={sFOTImage}
                    toImage="/images/juno.png"
                    onClick={() => handlePoolAssetChange(3)}
                    isActive={poolAsset === 3}
                  />
                  <Pool
                    from="sFOT"
                    to="Atom"
                    fromImage={sFOTImage}
                    toImage="/images/atom.png"
                    onClick={() => handlePoolAssetChange(4)}
                    isActive={poolAsset === 4}
                  />
                </PoolButtonsLower>
              </PoolsContent>
            </Pools>
          </RightPart>
        </div>
      ) : (
        <>
          <Pools>
            <PoolsContent>
              {assets.map(({ from, to, fromImage, toImage }, index) => (
                <Pool
                  key={index}
                  from={from}
                  to={to}
                  fromImage={fromImage}
                  toImage={toImage}
                  onClick={() => setPoolAsset(index)}
                  isActive={poolAsset === index}
                />
              ))}
            </PoolsContent>
            <Divider />
          </Pools>
          <PoolDetail
            asset={poolAsset}
            from={assets[poolAsset].from}
            to={assets[poolAsset].to}
            fromImage={assets[poolAsset].fromImage}
            toImage={assets[poolAsset].toImage}
            maxWidth={'none'}
          />
        </>
      )}
    </Wrapper>
  )
}

export default castleDex
