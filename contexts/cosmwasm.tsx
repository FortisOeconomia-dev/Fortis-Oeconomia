import { createContext, useContext, ReactNode } from 'react'

import { useSigningCosmWasmClient, ISigningCosmWasmClientContext } from '../hooks/cosmwasm'

let CosmWasmContext: any
let { Provider } = (CosmWasmContext = createContext<ISigningCosmWasmClientContext>({
  walletAddress: '',
  eligible: false,
  client: null,
  signingClient: null,
  loading: false,
  error: null,
  connectWallet: (inBackground: boolean) => {},
  disconnect: () => {},

  getBalances: () => {},

  nativeBalance: 0,
  atomBalance: 0,
  osmoBalance: 0,
  ustBalance: 0,
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
  fotBurnAmount: '',
  setFotBurnAmount: () => {},
  expectedBfotAmount: 0,

  handleFotChange: (value: number) => {},
  executeFotBurn: () => {},

  gfotBalance: 0,
  gfotBalanceStr: '',
  gfotTokenInfo: null,
  bfotBurnContractInfo: null,
  bfotBurnAmount: '',
  setbFotBurnAmount: () => {},
  expectedGfotAmount: 0,

  handlebFotChange: (value: number) => {},
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

  sfotStakingContractInfo: null,
  sfotStakingAmount: '',
  setsFotStakingAmount: () => {},
  sfotStakingApy: 0,
  sfotStakingMyStaked: 0,
  sfotStakingMyReward: 0,
  handlesFotStakingChange: () => {},
  executesFotStaking: () => {},
  executesFotClaimReward: () => {},

  sFotUnstakingList: [],
  createsFotUnstake: () => {},
  executesFotFetchUnstake: () => {},
  sFotUnstakeAmount: 0,
  handlesFotUnstakeChange: () => {},

  bFot2Juno: 0,
  Juno2bFot: 0,
  bFot2Ust: 0,
  sFot2Ust: 0,
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
  stableGfotAmount: '',
  stableExpectedSfotAmount: 0,

  handleStableGfotChange: () => {},

  sfotUstLpBalance: 0,
  sfotBfotLpBalance: 0,
  sfotGfotLpBalance: 0,
  sfotJunoLpBalance: 0,
  sfotAtomLpBalance: 0,
  sfotUstLpTokenInfo: null,
  sfotBfotLpTokenInfo: null,
  sfotGfotLpTokenInfo: null,
  sfotJunoLpTokenInfo: null,
  sfotAtomLpTokenInfo: null,
  sfotUstPoolInfo: null,
  sfotBfotPoolInfo: null,
  sfotGfotPoolInfo: null,
  sfotJunoPoolInfo: null,
  sfotAtomPoolInfo: null,

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
  lpStakingInfo: null,
  getAirdropBalances: () => {},
  getBfotBalances: () => {},
  getGfotBalances: () => {},
  getSfotBalances: () => {},
  getCommonBalances: () => {},
  getWalletBalances: () => {},
  getCommunitySaleBalances: () => {},
  updateInterval: 0,

  // dungeon
  executeAddLiquidityForDungeon: () => {},
  executeRemoveLiquidityForDungeon: () => {},
  calcExpectedSwapAmountForDungeon: () => {},
  executeSwapForDungeon: () => {},
  getLpStakingInfoForDungeon: () => {},
  executeLpCreateUnstakeForDungeon: () => {},
  executeLpFetchUnstakeForDungeon: () => {},

  pool1LpBfotLpBalance: 0,
  pool2LpSfotLpBalance: 0,
  pool3LpUstLpBalance: 0,
  pool4LpJunoLpBalance: 0,
  pool5LpAtomLpBalance: 0,
  pool6LpGfotLpBalance: 0,

  pool1LpBfotLpTokenInfo: null,
  pool2LpSfotLpTokenInfo: null,
  pool3LpUstLpTokenInfo: null,
  pool4LpJunoLpTokenInfo: null,
  pool5LpAtomLpTokenInfo: null,
  pool6LpGfotLpTokenInfo: null,
  pool7LpFotLpTokenInfo: null,

  pool7LpFotLpBalance: null,
  pool1LpBfotPoolInfo: null,
  pool2LpSfotPoolInfo: null,
  pool3LpUstPoolInfo: null,
  pool4LpJunoPoolInfo: null,
  pool5LpAtomPoolInfo: null,
  pool6LpGfotPoolInfo: null,
  pool7LpFotPoolInfo: null,

  pool1LpBfotLpStakingContractInfo: null,
  pool2LpSfotLpStakingContractInfo: null,
  pool3LpUstLpStakingContractInfo: null,
  pool4LpJunoLpStakingContractInfo: null,
  pool5LpAtomLpStakingContractInfo: null,
  pool6LpGfotLpStakingContractInfo: null,
  pool7LpFotLpStakingContractInfo: null,

  communitySaleDepositList: null,
  communitySaleContractInfo: null,
  sfotDepositAmount: null,
  handlesFotDepositChange: () => {},
  executesFotDeposit: () => {},
  executeFotClaim: () => {},
}))

export const useSigningClient = (): ISigningCosmWasmClientContext => useContext(CosmWasmContext)

export const SigningCosmWasmProvider = ({ children }: { children: ReactNode }) => {
  const value = useSigningCosmWasmClient()
  return <Provider value={value}>{children}</Provider>
}
