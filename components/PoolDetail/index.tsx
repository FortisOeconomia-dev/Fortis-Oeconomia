import styled from 'styled-components'
import StakeNClaimSecond from '../StakeNClaimSecond'
import { useContext, useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import { ToggleContext } from '../Layout/Layout'
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertMicroDenomToDenom2,
  convertDenomToMicroDenom2,
  convertFromMicroDenom,
} from '../../util/conversion'
import { useSigningClient } from '../../contexts/cosmwasm'
import { NotificationContainer, NotificationManager } from 'react-notifications'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 37px;
`

const TitleWrapper = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #fbfcfd;
  text-align: center;
`

const Divider = styled.div`
  width: 2.06px;
  background: linear-gradient(180deg, #171e0e 0%, #ffffff 100%);
`
const PoolDetail = ({ asset, from, to, fromImage, toImage }) => {
  const { toggle } = useContext(ToggleContext)
  const {
    fotTokenInfo,
    gfotTokenInfo,
    gfotStakingContractInfo,
    gfotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    gfotBalance,
    sfotBalance,
    ustBalance,
    nativeBalance,
    atomBalance,
    bfotBalance,
    sfotUstLpBalance,
    sfotBfotLpBalance,
    sfotGfotLpBalance,
    sfotJunoLpBalance,
    sfotAtomLpBalance,
    sfotUstLpTokenInfo,
    sfotBfotLpTokenInfo,
    sfotGfotLpTokenInfo,
    sfotJunoLpTokenInfo,
    sfotAtomLpTokenInfo,
    sfotUstPoolInfo,
    sfotBfotPoolInfo,
    sfotGfotPoolInfo,
    sfotJunoPoolInfo,
    sfotAtomPoolInfo,
    sfotTokenInfo,
    bfotTokenInfo,
    handleAddLiquidityValuesChange,
    executeAddLiquidity,
    executeRemoveLiquidity,
    loading,
    signingClient,
    walletAddress,
    bFot2Ust,

    sfotUstLpStakingContractInfo,
    sfotBfotLpStakingContractInfo,
    getLpStakingInfo,
    executeLpStakeAll,
    executeLpClaimReward,
    executeLpCreateUnstake,
    executeLpFetchUnstake,
    getSfotBalances,
    updateInterval,
    getCommonBalances,
  } = useSigningClient()

  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    let interval = null
    if (seconds === 0) {
      getCommonBalances()
      getSfotBalances()
    }
    interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % updateInterval)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const [poolInfo, setPoolInfo] = useState(null)
  const [decimals, setDecimals] = useState([10, 10])

  const [token1Balance, setToken1Balance] = useState(0)
  const [token2Balance, setToken2Balance] = useState(0)

  const [token1TotalAmount, setToken1TotalAmount] = useState(0)
  const [token2TotalAmount, setToken2TotalAmount] = useState(0)
  const [sfotbfotdpr, setsfotbfotdpr] = useState(0)
  //    const[sfotbfotdpr1, setsfotbfotdpr1] = useState(0)

  const [token1Amount, setToken1Amount] = useState(0)
  const [token2Amount, setToken2Amount] = useState(0)

  const [myToken1Amount, setMyToken1Amount] = useState(0)
  const [myToken2Amount, setMyToken2Amount] = useState(0)
  const [myLpBalance, setMyLpBalance] = useState(0)
  const [lpStakingInfo, setLpStakingInfo] = useState(null)

  const [lpTokenInfo, setLpTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })

  useEffect(() => {
    // if (loading)
    //     return
    setToken1Balance(sfotBalance)

    if (asset == 0) {
      setPoolInfo(sfotUstPoolInfo)
      setDecimals([10, 6])
      setToken2Balance(ustBalance)
      setLpTokenInfo(sfotUstLpTokenInfo)
      setMyLpBalance(sfotUstLpBalance)
    } else if (asset == 1) {
      setPoolInfo(sfotBfotPoolInfo)
      setDecimals([10, 10])
      setToken2Balance(bfotBalance)
      setLpTokenInfo(sfotBfotLpTokenInfo)
      setMyLpBalance(sfotBfotLpBalance)
    } else if (asset == 2) {
      setPoolInfo(sfotGfotPoolInfo)
      setDecimals([10, 10])
      setToken2Balance(gfotBalance)
      setLpTokenInfo(sfotGfotLpTokenInfo)
      setMyLpBalance(sfotGfotLpBalance)
    } else if (asset == 3) {
      setPoolInfo(sfotJunoPoolInfo)
      setDecimals([10, 6])
      setToken2Balance(nativeBalance)
      setLpTokenInfo(sfotJunoLpTokenInfo)
      setMyLpBalance(sfotJunoLpBalance)
    } else if (asset == 4) {
      setPoolInfo(sfotAtomPoolInfo)
      setDecimals([10, 6])
      setToken2Balance(atomBalance)
      setLpTokenInfo(sfotAtomLpTokenInfo)
      setMyLpBalance(sfotAtomLpBalance)
    }
    

    getLpStakingInfo(asset).then((response: any) => {
      setLpStakingMyReward(convertMicroDenomToDenom2(response.staked_reward, fotTokenInfo.decimals))
      setLpStakingMyStaked(convertMicroDenomToDenom2(response.staked_amount, 6))
      setLpStakingMyUnstakingList(response.unstakingList)
      // setLpStakingMyDeadline(response.deadline)
    })
  }, [asset, loading])

  // update dpr
  useEffect(() => {
    if (token1TotalAmount == 0 || token2TotalAmount == 0) return

    if (asset == 0) {
      setsfotbfotdpr((5000000 * bFot2Ust) / token1TotalAmount)
    } else if (asset == 1) {
      setsfotbfotdpr(5000000 / token2TotalAmount)
    } else if (asset == 2) {
      setsfotbfotdpr(5000000 / ((Math.floor(gfotTokenInfo.total_supply / 10000000000) + 10000) * token2TotalAmount))
    } else if (asset == 3) {
      setsfotbfotdpr(5000000 / token2TotalAmount)
    } else if (asset == 4) {
      setsfotbfotdpr(5000000 / token2TotalAmount)
    }
  }, [bFot2Ust, gfotTokenInfo, token1TotalAmount, token2TotalAmount])

  // update my token balance
  useEffect(() => {
    if (lpTokenInfo.total_supply == 0) return
    setMyToken1Amount((myLpBalance * token1TotalAmount) / lpTokenInfo.total_supply)
    setMyToken2Amount((myLpBalance * token2TotalAmount) / lpTokenInfo.total_supply)
  }, [myLpBalance, lpTokenInfo, token1TotalAmount, token2TotalAmount])

  useEffect(() => {
    if (poolInfo == null) return
    setToken1TotalAmount(convertMicroDenomToDenom2(poolInfo.token1_reserve, decimals[0]))
    setToken2TotalAmount(convertMicroDenomToDenom2(poolInfo.token2_reserve, decimals[1]))
  }, [poolInfo])

  const updateAmounts = async (token1: number, token2: number, fix: number) => {
    let ret = await handleAddLiquidityValuesChange(asset, token1, token2, fix)
    setToken1Amount(ret.token1Amount)
    setToken2Amount(ret.token2Amount)
  }

  const handleLiquidityMax = async () => {
    let ret = await handleAddLiquidityValuesChange(asset, token1Balance, token2Balance, 1)
    setToken1Amount(ret.token1Amount)
    setToken2Amount(ret.token2Amount)
  }

  const onToken1Change = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > token1Balance) return
    if (Number(value) < 0) return
    updateAmounts(Number(value), token2Amount, 1)
  }
  const handleToken1Plus = () => {
    if (token1Amount + 1 > token1Balance) return
    updateAmounts(token1Amount + 1, token2Amount, 1)
  }
  const handleToken1Minus = () => {
    if (token1Amount - 1 < 0) return
    updateAmounts(token1Amount - 1, token2Amount, 1)
  }
  const onToken2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    if (Number(value) > token2Balance) return
    if (Number(value) < 0) return
    updateAmounts(token1Amount, Number(value), 2)
  }
  const handleToken2Plus = () => {
    if (token2Amount + 1 > token2Balance) return
    updateAmounts(token1Amount, token2Amount + 1, 2)
  }
  const handleToken2Minus = () => {
    if (token2Amount - 1 < 0) return
    updateAmounts(token1Amount, token2Amount - 1, 2)
  }

  const handleAddLiquidity = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }
    if (token1Amount == 0 || token2Amount == 0) return
    event.preventDefault()

    await executeAddLiquidity(asset, token1Amount, token2Amount)
    setToken1Amount(0)
    setToken2Amount(0)
  }

  const handleRemoveLiquidity = async (value: number) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }
    await executeRemoveLiquidity(asset, value)
    // setToken1Amount(0)
    // setToken2Amount(0)
  }

  const [lpStakingMyReward, setLpStakingMyReward] = useState(0)
  const [lpStakingMyStaked, setLpStakingMyStaked] = useState(0)
  const [lpStakingMyUnstakingList, setLpStakingMyUnstakingList] = useState([])
  const [lpStakingMyDeadline, setLpStakingMyDeadline] = useState(0)

  const handleLpStaking = async () => {
    await executeLpStakeAll(asset)
  }
  const handleLpCreateUnstake = async () => {
    await executeLpCreateUnstake(asset)
  }
  const handleLpStakingReward = async () => {
    // if (asset == 2)
    //     return
    await executeLpClaimReward(asset)
  }
  const handleLpFetchUnstake = async lpState => {
    await executeLpFetchUnstake(lpState)
  }
  return (
    <Wrapper>
      <div className="w-full">
        <TitleWrapper>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {fromImage(toggle)}
            <span>-</span>
            {typeof toImage === 'string' ? <img src={`${toImage}`} /> : toImage(toggle)}
          </div>
          <Title>
            {from}-{to} Pool
          </Title>
        </TitleWrapper>
        <StakeNClaimSecond
          token1TotalAmount={token1TotalAmount}
          token2TotalAmount={token2TotalAmount}
          sfotbfotdpr={sfotbfotdpr}
          handleToken1Minus={handleToken1Minus}
          handleToken1Plus={handleToken1Plus}
          onToken1Change={onToken1Change}
          token1Amount={token1Amount}
          handleToken2Minus={handleToken2Minus}
          handleToken2Plus={handleToken2Plus}
          onToken2Change={onToken2Change}
          token2Amount={token2Amount}
          handleLiquidityMax={handleLiquidityMax}
          handleAddLiquidity={handleAddLiquidity}
          handleRemoveLiquidity={handleRemoveLiquidity}
          myToken1Amount={myToken1Amount}
          myToken2Amount={myToken2Amount}
          handleLpStaking={handleLpStaking}
          handleLpCreateUnstake={handleLpCreateUnstake}
          handleLpStakingReward={handleLpStakingReward}
          handleLpFetchUnstake={handleLpFetchUnstake}
          lpStakingMyReward={lpStakingMyReward}
          lpStakingMyStaked={lpStakingMyStaked}
          lpStakingMyUnstakingList={lpStakingMyUnstakingList}
          // lpStakingMyDeadline={lpStakingMyDeadline}
          lpAmount={convertMicroDenomToDenom2(myLpBalance, 6)}
          from={from}
          to={to}
          APY={0}
        />
      </div>
      <Divider />
    </Wrapper>
  )
}

export default PoolDetail
