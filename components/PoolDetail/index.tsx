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

const PoolDetail = ({
  asset,
  from,
  to,
  fromImage,
  toImage,
  level = null,
  showEpochReward = false,
  showDPRInfoIcon = false,
  showDPR = true,
  showTorch = false,
  showLpAmount = true,
  maxWidth = '770px',
  showStakeForm = false,
  showMaxButtonInLiquidityForm = false,
  showStakeAllButton = true,
  showUnstakeAllButton = true,
  lpfetchunstake = true,
  showReward = true,
  unstakeButtonText = 'Unstake All',
  showClaimForm = true,
  middletext = 'My Liquidity',
}) => {
  const { toggle } = useContext(ToggleContext)
  const {
    fotTokenInfo,
    gfotTokenInfo,
    gfotStakingContractInfo,
    gfotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    fotBalance,
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

    executeAddLiquidityForDungeon,
    executeRemoveLiquidityForDungeon,
    calcExpectedSwapAmountForDungeon,
    executeSwapForDungeon,
    getLpStakingInfoForDungeon,
    executeLpStakeAllForDungeon,
    executeLpClaimRewardForDungeon,
    executeLpCreateUnstakeForDungeon,
    executeLpFetchUnstakeForDungeon,

    pool1LpBfotLpBalance,
    pool2LpSfotLpBalance,
    pool3LpUstLpBalance,
    pool4LpJunoLpBalance,
    pool5LpAtomLpBalance,
    pool6LpGfotLpBalance,
    pool7LpFotLpBalance,

    pool1LpBfotLpTokenInfo,
    pool2LpSfotLpTokenInfo,
    pool3LpUstLpTokenInfo,
    pool4LpJunoLpTokenInfo,
    pool5LpAtomLpTokenInfo,
    pool6LpGfotLpTokenInfo,
    pool7LpFotLpTokenInfo,

    pool1LpBfotPoolInfo,
    pool2LpSfotPoolInfo,
    pool3LpUstPoolInfo,
    pool4LpJunoPoolInfo,
    pool5LpAtomPoolInfo,
    pool6LpGfotPoolInfo,
    pool7LpFotPoolInfo,
  } = useSigningClient()

  useEffect(() => {
    getCommonBalances()
    getSfotBalances()
    const interval = setInterval(() => {
      getCommonBalances()
      getSfotBalances()
    }, updateInterval * 1000)
    return () => clearInterval(interval)
  }, [])

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
    setToken1Balance(Number(convertDenomToMicroDenom2(sfotBalance, 10)))
    if (asset == 0) {
      setPoolInfo(sfotUstPoolInfo)
      setDecimals([10, 6])
      setToken2Balance(Number(convertDenomToMicroDenom2(ustBalance, 6)))
      setLpTokenInfo(sfotUstLpTokenInfo)
      setMyLpBalance(sfotUstLpBalance)
    } else if (asset == 1) {
      setPoolInfo(sfotBfotPoolInfo)
      setDecimals([10, 10])
      setToken2Balance(Number(convertDenomToMicroDenom2(bfotBalance, 10)))
      setLpTokenInfo(sfotBfotLpTokenInfo)
      setMyLpBalance(sfotBfotLpBalance)
    } else if (asset == 2) {
      setPoolInfo(sfotGfotPoolInfo)
      setDecimals([10, 10])
      setToken2Balance(Number(convertDenomToMicroDenom2(gfotBalance, 10)))
      setLpTokenInfo(sfotGfotLpTokenInfo)
      setMyLpBalance(sfotGfotLpBalance)
    } else if (asset == 3) {
      setPoolInfo(sfotJunoPoolInfo)
      setDecimals([10, 6])
      setToken2Balance(Number(convertDenomToMicroDenom2(nativeBalance, 6)))
      setLpTokenInfo(sfotJunoLpTokenInfo)
      setMyLpBalance(sfotJunoLpBalance)
    } else if (asset == 4) {
      setPoolInfo(sfotAtomPoolInfo)
      setDecimals([10, 6])
      setToken2Balance(Number(convertDenomToMicroDenom2(atomBalance, 6)))
      setLpTokenInfo(sfotAtomLpTokenInfo)
      setMyLpBalance(sfotAtomLpBalance)
    } else if (asset == 10) {
      setPoolInfo(sfotBfotPoolInfo)
      setDecimals([10, 10])
      setToken1Balance(bfotBalance)
      setToken2Balance(Number(convertDenomToMicroDenom2(sfotBalance, 10)))
      setLpTokenInfo(sfotBfotLpTokenInfo)
      setMyLpBalance(sfotBfotLpBalance)
    } else if (asset == 11) {
      setPoolInfo(pool1LpBfotPoolInfo)
      setDecimals([10, 6])
      setToken1Balance(bfotBalance)
      setToken2Balance(sfotBfotLpBalance)
      setLpTokenInfo(pool1LpBfotLpTokenInfo)
      setMyLpBalance(pool1LpBfotLpBalance)
    } else if (asset == 12) {
      setPoolInfo(pool2LpSfotPoolInfo)
      setDecimals([10, 6])
      setToken1Balance(sfotBalance)
      setToken2Balance(pool1LpBfotLpBalance)
      setLpTokenInfo(pool2LpSfotLpTokenInfo)
      setMyLpBalance(pool2LpSfotLpBalance)
    } else if (asset == 13) {
      setPoolInfo(pool3LpUstPoolInfo)
      setDecimals([6, 6])
      setToken1Balance(ustBalance)
      setToken2Balance(pool2LpSfotLpBalance)
      setLpTokenInfo(pool3LpUstLpTokenInfo)
      setMyLpBalance(pool3LpUstLpBalance)
    } else if (asset == 14) {
      setPoolInfo(pool4LpJunoPoolInfo)
      setDecimals([6, 6])
      setToken1Balance(nativeBalance)
      setToken2Balance(pool3LpUstLpBalance)
      setLpTokenInfo(pool4LpJunoLpTokenInfo)
      setMyLpBalance(pool4LpJunoLpBalance)
    } else if (asset == 15) {
      setPoolInfo(pool5LpAtomPoolInfo)
      setDecimals([6, 6])
      setToken1Balance(atomBalance)
      setToken2Balance(pool4LpJunoLpBalance)
      setLpTokenInfo(pool5LpAtomLpTokenInfo)
      setMyLpBalance(pool5LpAtomLpBalance)
    } else if (asset == 16) {
      setPoolInfo(pool6LpGfotPoolInfo)
      setDecimals([10, 6])
      setToken1Balance(gfotBalance)
      setToken2Balance(pool5LpAtomLpBalance)
      setLpTokenInfo(pool6LpGfotLpTokenInfo)
      setMyLpBalance(pool6LpGfotLpBalance)
    } else if (asset == 17) {
      setPoolInfo(pool7LpFotPoolInfo)
      setDecimals([10, 6])
      setToken1Balance(fotBalance)
      setToken2Balance(pool6LpGfotLpBalance)
      setLpTokenInfo(pool7LpFotLpTokenInfo)
      setMyLpBalance(pool7LpFotLpBalance)
    }

    if (asset < 10) {
      getLpStakingInfo(asset).then((response: any) => {
        setLpStakingMyReward(convertMicroDenomToDenom2(response.staked_reward, fotTokenInfo.decimals))
        setLpStakingMyStaked(convertMicroDenomToDenom2(response.staked_amount, 6))
        setLpStakingMyUnstakingList(response.unstakingList)
        // setLpStakingMyDeadline(response.deadline)
      })
    } else {
      getLpStakingInfoForDungeon(asset - 10).then((response: any) => {
        setLpStakingMyReward(convertMicroDenomToDenom2(response.staked_reward, fotTokenInfo.decimals))
        setLpStakingMyStaked(convertMicroDenomToDenom2(response.staked_amount, 6))
        setLpStakingMyUnstakingList(response.unstakingList)
        // setLpStakingMyDeadline(response.deadline)
      })
    }
  }, [asset, loading, sfotUstPoolInfo, sfotBfotPoolInfo, sfotGfotPoolInfo, sfotJunoPoolInfo, sfotAtomPoolInfo])

  // update dpr
  useEffect(() => {
    if (token1TotalAmount == 0 || token2TotalAmount == 0) return

    if (asset == 0) {
      setsfotbfotdpr(((5000000 * bFot2Ust) / token1TotalAmount) * 365)
    } else if (asset == 1) {
      setsfotbfotdpr((5000000 / token2TotalAmount) * 365)
    } else if (asset == 2) {
      setsfotbfotdpr((5000000 / ((Math.floor(gfotTokenInfo.total_supply / 10000000000) + 10000) * token2TotalAmount)) * 365)
    } else if (asset == 3) {
      setsfotbfotdpr(((5000000 * bFot2Ust) / (token1TotalAmount * 2)) * 365)
    } else if (asset == 4) {
      setsfotbfotdpr(((5000000 * bFot2Ust) / (token1TotalAmount * 2)) * 365)
    } else if (asset == 12) {
      setsfotbfotdpr(((5500000 * bFot2Ust) / (token1TotalAmount * 2)) * 365)
    } else if (asset == 17) {
      setsfotbfotdpr((2500000 / (token1TotalAmount * 2)) * 365)
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
    if (asset < 10) {
      setToken1TotalAmount(convertMicroDenomToDenom2(poolInfo.token1_reserve, decimals[0]))
      setToken2TotalAmount(convertMicroDenomToDenom2(poolInfo.token2_reserve, decimals[1]))
    } else {
      setToken1TotalAmount(convertMicroDenomToDenom2(poolInfo.token2_reserve, decimals[0]))
      setToken2TotalAmount(convertMicroDenomToDenom2(poolInfo.token1_reserve, decimals[1]))
    }
  }, [poolInfo])

  const updateAmounts = async (token1: number, token2: number, fix: number) => {
    let ret = await handleAddLiquidityValuesChange(asset, token1, token2, fix)
    setToken1Amount(ret.token1Amount)
    setToken2Amount(ret.token2Amount)
  }

  const handleLiquidityMax = async () => {
    const ret1 = await handleAddLiquidityValuesChange(asset, token1Balance, convertMicroDenomToDenom2(token2Balance, decimals[1]), 1)
    const ret2 = await handleAddLiquidityValuesChange(asset, token1Balance, convertMicroDenomToDenom2(token2Balance, decimals[1]), 2)
    const token1Amount = Math.min(ret1.token1Amount, ret2.token1Amount)
    const token2Amount = Math.min(ret1.token2Amount, ret2.token2Amount)
    setToken1Amount(token1Amount)
    setToken2Amount(token2Amount)
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

    if (asset > 10) await executeAddLiquidityForDungeon(asset - 10, token1Amount, token2Amount)
    else await executeAddLiquidity(asset, token1Amount, token2Amount)
    setToken1Amount(0)
    setToken2Amount(0)
  }

  const handleRemoveLiquidity = async (value: number) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }
    if (asset <= 10) await executeRemoveLiquidity(asset, value)
    else await executeRemoveLiquidityForDungeon(asset - 10, value)
    // setToken1Amount(0)
    // setToken2Amount(0)
  }

  const [lpStakingMyReward, setLpStakingMyReward] = useState(0)
  const [lpStakingMyStaked, setLpStakingMyStaked] = useState(0)
  const [lpStakingMyUnstakingList, setLpStakingMyUnstakingList] = useState([])
  const [lpStakingMyDeadline, setLpStakingMyDeadline] = useState(0)

  const handleLpStaking = async () => {
    if (asset < 10) await executeLpStakeAll(asset)
    else await executeLpStakeAllForDungeon(asset - 10)
  }
  const handleLpCreateUnstake = async () => {
    if (asset < 10) await executeLpCreateUnstake(asset)
    else await executeLpCreateUnstakeForDungeon(asset - 10)
  }
  const handleLpStakingReward = async () => {
    // if (asset == 2)
    //     return
    if (asset < 10) await executeLpClaimReward(asset)
    else await executeLpClaimRewardForDungeon(asset - 10)
  }
  const handleLpFetchUnstake = async lpState => {
    if (asset < 10) await executeLpFetchUnstake(lpState, asset)
    else await executeLpFetchUnstakeForDungeon(lpState, asset - 10)
  }

  useEffect(() => {
    setToken1Amount(0)
    setToken2Amount(0)
  }, [asset])

  return (
    <Wrapper>
      <div className="w-full">
        <TitleWrapper>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {typeof fromImage === 'string' ? <img src={`${fromImage}`} /> : fromImage(toggle)}
            <span>-</span>
            {typeof toImage === 'string' ? <img src={`${toImage}`} /> : toImage(toggle)}
          </div>
          <Title>
            {from}-{to} Pool {!!level && ` (Level ${level})`}
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
          showEpochReward={showEpochReward}
          showDPRInfoIcon={showDPRInfoIcon}
          showDPR={showDPR}
          showTorch={showTorch}
          showLpAmount={showLpAmount}
          maxWidth={maxWidth}
          showStakeForm={showStakeForm}
          showMaxButtonInLiquidityForm={showMaxButtonInLiquidityForm}
          showStakeAllButton={showStakeAllButton}
          showUnstakeAllButton={showUnstakeAllButton}
          lpfetchunstake={lpfetchunstake}
          unstakeButtonText={unstakeButtonText}
          showClaimForm={showClaimForm}
          showReward={showReward}
          middletext={middletext}
        />
      </div>
    </Wrapper>
  )
}

export default PoolDetail
