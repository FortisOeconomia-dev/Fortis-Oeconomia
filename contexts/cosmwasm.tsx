import { createContext, useContext, ReactNode } from 'react'
import {
  useSigningCosmWasmClient,
  ISigningCosmWasmClientContext,
} from '../hooks/cosmwasm'

let CosmWasmContext: any
let { Provider } = (CosmWasmContext =
  createContext<ISigningCosmWasmClientContext>({
    walletAddress: '',
    client: null,
    signingClient: null,
    loading: false,
    error: null,
    connectWallet: (inBackground:boolean) => {},
    disconnect: () => {},

    getBalances: () => {},
    
    nativeBalance: 0,
    atomBalance:0,
    osmoBalance:0,
    ustBalance:0,
    nativeBalanceStr: '',
    fotBalance: 0,
    fotBalanceStr: '',
    fotTokenInfo: null,

    alreadyAirdropped: false,
    airdropAmount: 0,
    airdropAmountDenom: 0,
    merkleProof: [],

    getMyAirdropAmount: () => {},
    GetAlreadyAirdropped: () => {},
    executeAirdrop: () => {},

    bfotBalance: 0,
    bfotBalanceStr: '',
    bfotTokenInfo: null,
    fotBurnContractInfo: null,
    fotBurnAmount:'',
    setFotBurnAmount: () => {},
    expectedBfotAmount: 0,

    handleFotChange:(value:number) => {},
    executeFotBurn: () => {},

    gfotBalance: 0,
    gfotBalanceStr: '',
    gfotTokenInfo: null,
    bfotBurnContractInfo: null,
    bfotBurnAmount: '',
    setbFotBurnAmount: () => {},
    expectedGfotAmount:0,

    handlebFotChange:(value:number) => {},
    executebFotBurn: () => {},

    gfotStakingContractInfo: null,
    gfotStakingAmount: '',
    setgFotStakingAmount: () => {},
    gfotStakingApy: 0,
    gfotStakingMyStaked: 0,
    gfotStakingMyReward: 0,
    handlegFotStakingChange: () => {},
    executegFotStaking: () => {},
    executegFotClaimReward: () => {},

    bFot2Juno: 0,
    Juno2bFot: 0,
    bFot2Ust: 0,
    poolDpr: 0,

    executeMonetaAirdrop: () => {},
    monetaLatestStage: 0,
    monetaAirdropCount: 0,
    monetaAirdropList: [],

    unstakingList: [],
    createUnstake: () => {},
    executeFetchUnstake: () => {},
    unstakeAmount: 0,
    handleUnstakeChange: () => {},

    sfotBalance: 0,
    sfotBalanceStr: '',
    sfotTokenInfo: null,
    stableContractInfo: null,
    clearanceContractInfo: null,
    stableGfotAmount: '',
    stableExpectedSfotAmount: 0,
    clearanceSfotAmount: '',
    clearanceExpectedGfotAmount: 0,

    handleStableGfotChange: () => {},
    executeStable: () => {},
    handleClearanceSfotChange: () => {},
    executeClearance: () => {},

    sfotUstLpBalance: 0,
    sfotBfotLpBalance: 0,
    sfotUstLpTokenInfo: null,
    sfotBfotLpTokenInfo: null,
    sfotUstPoolInfo: null,
    sfotBfotPoolInfo: null,

    handleAddLiquidityValuesChange: () => {},
    executeAddLiquidity: () => {},
    executeRemoveLiquidity: () => {},

    swapToken1: true,
    setSwapToken1: () => {},
    swapAmount: 0,
    setSwapAmount: () => {},
    expectedToken2Amount: 0,
    executeSwap: () => {},
    calcExpectedSwapAmount: () => {},

    sfotUstLpStakingContractInfo: null,
    sfotBfotLpStakingContractInfo: null,
    getLpStakingInfo: () => {},
    executeLpStakeAll: () => {},
    executeLpClaimReward: () => {},
    executeLpCreateUnstake: () => {},
    executeLpFetchUnstake: () => {},
    lpStakingInfo: null
    
  }))

export const useSigningClient = (): ISigningCosmWasmClientContext =>
  useContext(CosmWasmContext)

export const SigningCosmWasmProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const value = useSigningCosmWasmClient()
  return <Provider value={value}>{children}</Provider>
}
