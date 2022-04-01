import styled from 'styled-components'
import StakeNClaimSecond from "../StakeNClaimSecond"
import { useContext, useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import { ToggleContext } from "../Layout/Layout";
import {
    convertMicroDenomToDenom,
    convertDenomToMicroDenom,
    convertMicroDenomToDenom2,
    convertDenomToMicroDenom2,
    convertFromMicroDenom
} from '../../util/conversion'
import { useSigningClient } from "../../contexts/cosmwasm";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";

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
  color: #FBFCFD;
  text-align: center;
`

const Divider = styled.div`
  width: 2.06px;
  background: linear-gradient(180deg,#171E0E 0%,#FFFFFF 100%);
`
const PoolDetail = ({
    asset,
    from,
    to,
    fromImage,
    toImage
}) => {
    
    const {toggle} = useContext(ToggleContext)
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
        bfotBalance,
        sfotUstLpBalance,
        sfotBfotLpBalance,
        sfotUstLpTokenInfo,
        sfotBfotLpTokenInfo,
        sfotUstPoolInfo,
        sfotBfotPoolInfo,
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
    } = useSigningClient();

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
    const [myLpBalance, setMayLpBalance] = useState(0)
    const [lpStakingInfo, setLpStakingInfo] = useState(null)
    useEffect(() => {
        if (loading)
            return
        setToken1Balance(sfotBalance)
        
        if (asset == 0) {
            setPoolInfo(sfotUstPoolInfo)
            setDecimals([10, 6])
            setToken2Balance(ustBalance)
            
            setMyToken1Amount(sfotUstLpBalance * token1TotalAmount / sfotUstLpTokenInfo.total_supply)
            setMyToken2Amount(sfotUstLpBalance * token2TotalAmount / sfotUstLpTokenInfo.total_supply)
            setsfotbfotdpr(5000000 * bFot2Ust / token1TotalAmount)
            setMayLpBalance(sfotUstLpBalance)
        } else if (asset == 1) {
            setPoolInfo(sfotBfotPoolInfo)
            setDecimals([10,10])
            setToken2Balance(bfotBalance)

            setMyToken1Amount(sfotBfotLpBalance * token1TotalAmount / sfotBfotLpTokenInfo.total_supply)
            setMyToken2Amount(sfotBfotLpBalance * token2TotalAmount / sfotBfotLpTokenInfo.total_supply)
            setsfotbfotdpr(5000000/token2TotalAmount)

            setMayLpBalance(sfotBfotLpBalance)
        }
        getLpStakingInfo(asset).then((response:any) => {
            setLpStakingMyReward(convertMicroDenomToDenom2(response.staked_reward, fotTokenInfo.decimals))
            setLpStakingMyStaked(convertMicroDenomToDenom2(response.staked_amount, 6))
            setLpStakingMyUnstaking(response.unstaking_amount)
            setLpStakingMyDeadline(response.deadline)
        })
    }, [asset, loading])

    useEffect(() => {
        if (poolInfo == null)
            return
        setToken1TotalAmount(convertMicroDenomToDenom2(poolInfo.token1_reserve, decimals[0]))
        setToken2TotalAmount(convertMicroDenomToDenom2(poolInfo.token2_reserve, decimals[1]))
    }, [poolInfo])

    
    const updateAmounts = async(token1:number, token2:number, fix:number)=> {
        console.log(token1 + ":" + token2)
        let ret = await handleAddLiquidityValuesChange(asset, token1, token2, fix)
        setToken1Amount(ret.token1Amount)
        setToken2Amount(ret.token2Amount)
        console.log(ret.token1Amount, ret.token2Amount)
    }

    const handleLiquidityMax= async () => {
        let ret = await handleAddLiquidityValuesChange(asset, token1Balance, token2Balance, 1)
        setToken1Amount(ret.token1Amount)
        setToken2Amount(ret.token2Amount)
    }

    const onToken1Change = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event
        console.log(value)
        if (Number(value) > token1Balance)
            return
        if (Number(value) < 0)
            return
        updateAmounts(Number(value), token2Amount, 1)
    }
    const handleToken1Plus = () => {
        if (token1Amount + 1 > token1Balance)
          return
        updateAmounts(token1Amount + 1, token2Amount, 1)
    }
    const handleToken1Minus = () => {
        if (token1Amount - 1 < 0)
            return
        updateAmounts(token1Amount - 1, token2Amount, 1)
    }
    const onToken2Change = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event
        console.log(value)
        if (Number(value) > token2Balance)
            return
        if (Number(value) < 0)
            return
        updateAmounts(token1Amount, Number(value), 2)
    }
    const handleToken2Plus = () => {
        if (token2Amount + 1 > token2Balance)
          return
        updateAmounts(token1Amount, token2Amount + 1, 2)
    }
    const handleToken2Minus = () => {
        if (token2Amount - 1 < 0)
            return
        updateAmounts(token1Amount, token2Amount - 1, 2)
    }

    const handleAddLiquidity = async (event: MouseEvent<HTMLElement>) => {

        if (!signingClient || walletAddress.length === 0) {
            NotificationManager.error("Please connect wallet first");
            return;
        }
        if (token1Amount == 0 || token2Amount == 0)
            return
        event.preventDefault()

        await executeAddLiquidity(asset, token1Amount, token2Amount)
        setToken1Amount(0)
        setToken2Amount(0)
    }
    
    const handleRemoveLiquidity = async (event: MouseEvent<HTMLElement>) => {

        if (!signingClient || walletAddress.length === 0) {
            NotificationManager.error("Please connect wallet first");
            return;
        }
        event.preventDefault()

        await executeRemoveLiquidity(asset)
        setToken1Amount(0)
        setToken2Amount(0)
    }
    
    const [lpStakingMyReward, setLpStakingMyReward] = useState(0)
    const [lpStakingMyStaked, setLpStakingMyStaked] = useState(0)
    const [lpStakingMyUnstaking, setLpStakingMyUnstaking] = useState(0)
    const [lpStakingMyDeadline, setLpStakingMyDeadline] = useState(0)
    
    const handleLpStaking = async () => { await executeLpStakeAll(asset)}
    const handleLpCreateUnstake = async () => {executeLpCreateUnstake(asset)}
    const handleLpStakingReward = async () => {executeLpClaimReward(asset)}
    const handleLpFetchUnstake = async () => {executeLpFetchUnstake(asset)}
    return (
        <Wrapper>
            <div className='w-full'>
                <TitleWrapper>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                        {fromImage(toggle)}
                        <span>-</span>
                        {typeof toImage === 'string' ? <img src={`${toImage}`} /> : toImage(toggle)}
                    </div>
                    <Title>{from}-{to} Pool</Title>
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
                    lpStakingMyUnstaking={lpStakingMyUnstaking}
                    lpStakingMyDeadline={lpStakingMyDeadline}
                    lpAmount={myLpBalance}
                    
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