import { useState } from 'react'
import { connectKeplr } from '../services/keplr'
import { SigningCosmWasmClient, CosmWasmClient, JsonObject, cosmWasmTypes } from '@cosmjs/cosmwasm-stargate'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertMicroDenomToDenom2,
  convertDenomToMicroDenom2,
  convertFromMicroDenom,
} from '../util/conversion'
import { coin } from '@cosmjs/launchpad'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { create } from 'ipfs-http-client'
import { voters } from '../proposal.json'
import { moneta_voters } from '../monetaairdrop.json'
import { Airdrop } from '../util/merkle-airdrop-cli/airdrop'

export interface ISigningCosmWasmClientContext {
  walletAddress: string
  client: CosmWasmClient | null
  signingClient: SigningCosmWasmClient | null
  loading: boolean
  error: any
  connectWallet: Function,
  disconnect: Function,

  getBalances: Function,


  nativeBalance: number,
  nativeBalanceStr: string,
  atomBalance: number,
  osmoBalance: number,
  ustBalance: number,
  fotBalance: number,
  fotBalanceStr: string,
  fotTokenInfo: any,

  bfotBalance: number,
  bfotBalanceStr: string,
  bfotTokenInfo: any,
  fotBurnContractInfo: any,

  gfotBalance: number,
  gfotBalanceStr: string,
  gfotTokenInfo: any,
  bfotBurnContractInfo: any,


  alreadyAirdropped: boolean,
  airdropAmount: number,
  airdropAmountDenom: number,
  merkleProof: any[],

  getMyAirdropAmount: Function,
  GetAlreadyAirdropped: Function,
  executeAirdrop: Function,

  //fotburn part
  fotBurnAmount: string,
  setFotBurnAmount: Function,
  expectedBfotAmount: number,

  handleFotChange: Function,
  executeFotBurn: Function,

  //bfotburn part
  bfotBurnAmount: string,
  setbFotBurnAmount: Function,
  expectedGfotAmount: number,
  handlebFotChange: Function,
  executebFotBurn: Function,

  //gfotstaking part
  gfotStakingContractInfo: any,
  gfotStakingAmount: string,
  setgFotStakingAmount: Function,
  gfotStakingApy : number,
  gfotStakingMyStaked: number,
  gfotStakingMyReward: number,
  handlegFotStakingChange: Function,
  executegFotStaking: Function,
  executegFotClaimReward: Function,

  //bFOT Juno Pool Part
  bFot2Juno: number,
  Juno2bFot: number,
  bFot2Ust: number,
  poolDpr: number,

  executeMonetaAirdrop: Function,
  monetaLatestStage: number,
  monetaAirdropCount: number,
  monetaAirdropList: any,

  unstakingList: any[],
  createUnstake: Function,
  executeFetchUnstake: Function,
  unstakeAmount: number,
  handleUnstakeChange: Function,

  //Stable and Clearance
  sfotBalance: number,
  sfotBalanceStr: string,
  sfotTokenInfo: any,
  stableContractInfo: any,
  clearanceContractInfo: any,
  stableGfotAmount: string,
  stableExpectedSfotAmount: number,
  clearanceSfotAmount: string,
  clearanceExpectedGfotAmount: number,

  handleStableGfotChange: Function,
  executeStable: Function,
  handleClearanceSfotChange: Function,
  executeClearance: Function,

  //pools
  sfotUstLpBalance: number,
  sfotBfotLpBalance: number,
  sfotUstLpTokenInfo: any,
  sfotBfotLpTokenInfo: any,
  sfotUstPoolInfo: any,
  sfotBfotPoolInfo: any,

  handleAddLiquidityValuesChange: Function,
  executeAddLiquidity: Function,
  executeRemoveLiquidity: Function,

  swapToken1: boolean,
  setSwapToken1: Function,
  swapAmount: number,
  setSwapAmount: Function,
  expectedToken2Amount: number,
  executeSwap: Function,
  calcExpectedSwapAmount: Function


  
}

export const PUBLIC_CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
export const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
export const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'

export const PUBLIC_MONETA_AIRDROP_CONTRACT = process.env.NEXT_PUBLIC_MONETA_AIRDROP_CONTRACT || ''
export const PUBLIC_AIRDROP_CONTRACT = process.env.NEXT_PUBLIC_AIRDROP_CONTRACT || ''
export const PUBLIC_FOTBURN_CONTRACT = process.env.NEXT_PUBLIC_FOTBURN_CONTRACT || ''
export const PUBLIC_BFOTBURN_CONTRACT = process.env.NEXT_PUBLIC_BFOTBURN_CONTRACT || ''
export const PUBLIC_GFOTSTAKING_CONTRACT = process.env.NEXT_PUBLIC_GFOTSTAKING_CONTRACT || ''
export const PUBLIC_STABLE_CONTRACT = process.env.NEXT_PUBLIC_STABLE_CONTRACT || ''
export const PUBLIC_CLEARANCE_CONTRACT = process.env.NEXT_PUBLIC_CLEARANCE_CONTRACT || ''

export const PUBLIC_FOT_CONTRACT = process.env.NEXT_PUBLIC_FOT_CONTRACT || ''
export const PUBLIC_BFOT_CONTRACT = process.env.NEXT_PUBLIC_BFOT_CONTRACT || ''
export const PUBLIC_GFOT_CONTRACT = process.env.NEXT_PUBLIC_GFOT_CONTRACT || ''
export const PUBLIC_SFOT_CONTRACT = process.env.NEXT_PUBLIC_SFOT_CONTRACT || ''

export const PUBLIC_BFOT_JUNO_POOL_CONTRACT = process.env.NEXT_PUBLIC_BFOT_JUNO_POOL_CONTRACT || ''
export const PUBLIC_UST_JUNO_POOL_CONTRACT = process.env.NEXT_PUBLIC_UST_JUNO_POOL_CONTRACT || ''

export const PUBLIC_SFOT_UST_POOL_CONTRACT = process.env.NEXT_PUBLIC_SFOT_UST_POOL_CONTRACT || ''
export const PUBLIC_SFOT_BFOT_POOL_CONTRACT = process.env.NEXT_PUBLIC_SFOT_BFOT_POOL_CONTRACT || ''

export const defaultFee = {
  amount: [],
  gas: "800000",
}

export const CW20_DECIMAL = 1000000

const atom_denom = "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
const osmo_denom = "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518"
const ust_denom = "ibc/2DA4136457810BCB9DAAB620CA67BC342B17C3C70151CA70490A170DF7C9CB27"

export const useSigningCosmWasmClient = (): ISigningCosmWasmClientContext => {
  const [client, setClient] = useState<CosmWasmClient | null>(null)
  const [signingClient, setSigningClient] =
    useState<SigningCosmWasmClient | null>(null)

  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [nativeBalance, setNativeBalance] = useState(0)
  const [nativeBalanceStr, setNativeBalanceStr] = useState('')
  const [atomBalance, setAtomBalance] = useState(0)
  const [osmoBalance, setOsmoBalance] = useState(0)
  const [ustBalance, setUstBalance] = useState(0)
  const [fotBalance, SetFotBalance] = useState(0)
  const [fotBalanceStr, SetFotBalanceStr] = useState('')
  const [bfotBalance, SetBfotBalance] = useState(0)
  const [bfotBalanceStr, SetBfotBalanceStr] = useState('')
  const [gfotBalance, SetGfotBalance] = useState(0)
  const [gfotBalanceStr, SetGfotBalanceStr] = useState('')
  const [sfotBalance, SetSfotBalance] = useState(0)
  const [sfotBalanceStr, SetSfotBalanceStr] = useState('')
  const [sfotUstLpBalance, SetSfotUstLpBalance] = useState(0)
  const [sfotBfotLpBalance, SetSfotBfotLpBalance] = useState(0)

  const [fotTokenInfo, setFotTokenInfo] = useState({ name: '', symbol: '', decimals: 10, total_supply: 0 })
  const [bfotTokenInfo, setBfotTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })
  const [gfotTokenInfo, setGfotTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })
  const [sfotTokenInfo, setSfotTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })
  const [sfotUstLpTokenInfo, setSfotUstLpTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })
  const [sfotBfotLpTokenInfo, setSfotBfotLpTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })
  
  const [fotBurnContractInfo, setFotBurnContractInfo] = useState({ owner: '', fot_burn_amount: 0, bfot_sent_amount: 0, bfot_current_amount: 0 })
  const [bfotBurnContractInfo, setbFotBurnContractInfo] = useState({ owner: '', bfot_burn_amount: 0, gfot_sent_amount: 0, gfot_current_amount: 0 })
  const [gfotStakingContractInfo, setgFotStakingContractInfo] = useState({ owner: '', fot_amount: 0, gfot_amount: 0, last_time: 0, apy_prefix: 0 })
  const [stableContractInfo, setStableContractInfo] = useState({ owner: '', sfot_mint_amount: 0, gfot_sent_amount: 0, bfot_price: 0 })
  const [clearanceContractInfo, setClearanceContractInfo] = useState({ owner: '', gfot_amount: 0, gfot_sell_amount: 0, sfot_burn_amount: 0, sfot_price: 0 })
  const [sfotUstPoolInfo, setSfotUstPoolInfo] = useState({ token1_reserve: 0, token2_reserve: 0, lp_token_supply: 0, lp_token_address: '' })
  const [sfotBfotPoolInfo, setSfotBfotPoolInfo] = useState({ token1_reserve: 0, token2_reserve: 0, lp_token_supply: 0, lp_token_address: '' })
  

  /////////////////////////////////////////////////////////////////////
  /////////////////////  Airdrop Variables   //////////////////////////
  /////////////////////////////////////////////////////////////////////
  const [alreadyAirdropped, setAlreadyAirdropped] = useState(false)
  const [airdropAmount, setAirdropAmount] = useState(0)
  const [airdropAmountDenom, setAirdropAmountDenom] = useState(0)
  const [merkleProof, setMerkleProof] = useState([])

  /////////////////////////////////////////////////////////////////////
  /////////////////////  Moneta Airdrop Variables   //////////////////////////
  /////////////////////////////////////////////////////////////////////
  const [monetaLatestStage, setMonetaLatestStage] = useState(0)
  const [monetaAirdropCount, setMonetaAirdropCount] = useState(0)
  const [monetaAirdropList, setMonetaAirdropList] = useState([])
  /////////////////////////////////////////////////////////////////////
  /////////////////////  FotBurn Variables   //////////////////////////
  /////////////////////////////////////////////////////////////////////
  const [fotBurnAmount, setFotBurnAmount] = useState('')
  const [expectedBfotAmount, setExpectedBfotAmount] = useState(0)

  //////////////////////////////////////////////////////////////////////
  /////////////////////  bFotBurn Variables   //////////////////////////
  //////////////////////////////////////////////////////////////////////

  const [bfotBurnAmount, setbFotBurnAmount] = useState('')
  const [expectedGfotAmount, setExpectedGfotAmount] = useState(0)

  //////////////////////////////////////////////////////////////////////
  /////////////////////  gFotStaking Variables   ///////////////////////
  //////////////////////////////////////////////////////////////////////


  const [gfotStakingAmount, setgFotStakingAmount] = useState('')
  const [gfotStakingApy, setgFotStakingApy] = useState(0)
  const [gfotStakingMyStaked, setgFotStakingMyStaked] = useState(0)
  const [gfotStakingMyReward, setgFotStakingMyReward] = useState(0)

  const [unstakingList, setUnstakingList] = useState([])
  const [unstakeAmount, setUnstakeAmount] = useState(0)
  //////////////////////////////////////////////////////////////////////
  /////////////////////  bFOT JUno Pool Variables   ////////////////////
  //////////////////////////////////////////////////////////////////////

  const [bFot2Juno, setbFot2Juno] = useState(0)
  const [Juno2bFot, setJuno2bFot] = useState(0)
  const [Juno2Ust, setJuno2Ust] = useState(0)
  const [bFot2Ust, setbFot2Ust] = useState(0)
  const [poolDpr, setPoolDpr] = useState(0)

  //////////////////////////////////////////////////////////////////////
  /////////////////////  Stable and Clearance Variables   //////////////
  //////////////////////////////////////////////////////////////////////
  const [stableGfotAmount, setStableGfotAmount] = useState('')
  const [stableExpectedSfotAmount, setStableExpectedSfotAmount] = useState(0)

  const [clearanceSfotAmount, setClearanceSfotAmount] = useState('')
  const [clearanceExpectedGfotAmount, setClearanceExpectedGfotAmount] = useState(0)

  //////////////////////////////////////////////////////////////////////
  /////////////////////  Pool Variables   //////////////////////////////
  //////////////////////////////////////////////////////////////////////
  const [token1Amount, setToken1Amount] = useState('')
  const [token2Amount, setToken2Amount] = useState('')
  const [sfotSwapAmount, setSfotSwapAmount] = useState('')
  const [expectedSwapAmount, setExpectedSwapAmount] = useState(0)
    
  const [swapToken1, setSwapToken1] = useState(true)
  const [swapAmount, setSwapAmount] = useState(0)
  const [expectedToken2Amount, setExpectedToken2Amount] = useState(0)
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    connect & disconnect   //////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const showNotification = false;

  const connectWallet = async (inBackground: boolean) => {
    if (!inBackground)
      setLoading(true)

    try {
      await connectKeplr()

      // enable website to access kepler
      await (window as any).keplr.enable(PUBLIC_CHAIN_ID)

      // console.log((window as any).keplr)

      await (window as any).keplr.suggestToken(PUBLIC_CHAIN_ID, PUBLIC_FOT_CONTRACT, PUBLIC_FOT_CONTRACT)
      await (window as any).keplr.suggestToken(PUBLIC_CHAIN_ID, PUBLIC_BFOT_CONTRACT, PUBLIC_BFOT_CONTRACT)
      await (window as any).keplr.suggestToken(PUBLIC_CHAIN_ID, PUBLIC_GFOT_CONTRACT, PUBLIC_GFOT_CONTRACT)
      await (window as any).keplr.suggestToken(PUBLIC_CHAIN_ID, PUBLIC_SFOT_CONTRACT, PUBLIC_SFOT_CONTRACT)

      // get offline signer for signing txs
      const offlineSigner = await (window as any).getOfflineSignerOnlyAmino(
        PUBLIC_CHAIN_ID
      )

      // make client
      setClient(
        await CosmWasmClient.connect(PUBLIC_CHAIN_RPC_ENDPOINT)
      )

      // make client
      setSigningClient(
        await SigningCosmWasmClient.connectWithSigner(
          PUBLIC_CHAIN_RPC_ENDPOINT,
          offlineSigner
        )
      )

      // get user address
      const [{ address }] = await offlineSigner.getAccounts()
      setWalletAddress(address)

      localStorage.setItem("address", address)
      if (!inBackground) {
        setLoading(false)
        NotificationManager.success(`Connected successfully`)
      }


      // //for atom and osmo balance
      // const offlineSigner_osmo = await (window as any).getOfflineSignerOnlyAmino(
      //   'osmosis-1'
      // )
      // let osmoClient = await SigningCosmWasmClient.connectWithSigner(
      //   'https://rpc-osmosis.blockapsis.com:443',
      //   offlineSigner_osmo
      // )

      // const listOsmo = await offlineSigner_osmo.getAccounts()
      // const osmoAddress = listOsmo[0].address;
      // const objectOsmo:JsonObject = await osmoClient.getBalance(osmoAddress, 'uosmo')
      // setOsmoBalance(convertMicroDenomToDenom(objectOsmo.amount))


      // const offlineSigner_atom = await (window as any).getOfflineSignerOnlyAmino(
      //   'cosmoshub-4'
      // )
      // let atomClient = await SigningCosmWasmClient.connectWithSigner(
      //   'https://cosmoshub.validator.network:443',
      //   offlineSigner_atom
      // )

      // const listAtom = await offlineSigner_atom.getAccounts()
      // const atomAddress = listAtom[0].address;
      // const objectAtom:JsonObject = await atomClient.getBalance(atomAddress, 'uatom')
      // setAtomBalance(convertMicroDenomToDenom(objectAtom.amount))

    } catch (error) {
      NotificationManager.error(`ConnectWallet error : ${error}`)
      if (!inBackground) {
        setLoading(false)
      }
    }
  }

  const disconnect = () => {
    if (signingClient) {
      localStorage.removeItem("address")
      signingClient.disconnect()

    }
    setWalletAddress('')
    setSigningClient(null)
    setAirdropAmount(0)
    setAirdropAmountDenom(0)
    setAlreadyAirdropped(false)
    setLoading(false)
    NotificationManager.info(`Disconnected successfully`)
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    global variables    /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const getBalances = async () => {
    setLoading(true)
    try {
      //Native balance
      const objectAtom:JsonObject = await signingClient.getBalance(walletAddress, atom_denom);
      const objectOsmo:JsonObject = await signingClient.getBalance(walletAddress, osmo_denom);
      const objectUst:JsonObject = await signingClient.getBalance(walletAddress, ust_denom);
      setAtomBalance(convertMicroDenomToDenom(objectAtom.amount))
      setOsmoBalance(convertMicroDenomToDenom(objectOsmo.amount))
      setUstBalance(convertMicroDenomToDenom(objectUst.amount))
      
      const objectNative: JsonObject = await signingClient.getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      setNativeBalanceStr(`${convertMicroDenomToDenom(objectNative.amount)} ${convertFromMicroDenom(objectNative.denom)}`)
      setNativeBalance(convertMicroDenomToDenom(objectNative.amount))

      ////////////////////////////////////////////////////////////////////////////
      //////////////////            Tokens          //////////////////////////////
      ////////////////////////////////////////////////////////////////////////////

      //FOT balance and info
      const objectFotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_FOT_CONTRACT, {
        token_info: {},
      })
      setFotTokenInfo(objectFotTokenInfo)

      const objectFot: JsonObject = await signingClient.queryContractSmart(PUBLIC_FOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      SetFotBalance(parseInt(objectFot.balance) / Math.pow(10, objectFotTokenInfo.decimals))
      SetFotBalanceStr(parseInt(objectFot.balance) / Math.pow(10, objectFotTokenInfo.decimals) + ' ' + objectFotTokenInfo.symbol)

      //BFOT balance and info
      const objectBfotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_BFOT_CONTRACT, {
        token_info: {},
      })
      setBfotTokenInfo(objectBfotTokenInfo)

      const objectBfot: JsonObject = await signingClient.queryContractSmart(PUBLIC_BFOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      SetBfotBalance(parseInt(objectBfot.balance) / Math.pow(10, objectBfotTokenInfo.decimals))
      SetBfotBalanceStr(parseInt(objectBfot.balance) / Math.pow(10, objectBfotTokenInfo.decimals) + ' ' + objectBfotTokenInfo.symbol)

      //GFOT balance and info
      const objectGfotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_GFOT_CONTRACT, {
        token_info: {},
      })
      setGfotTokenInfo(objectGfotTokenInfo)
      
      const objectGfot: JsonObject = await signingClient.queryContractSmart(PUBLIC_GFOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      SetGfotBalance(parseInt(objectGfot.balance) / Math.pow(10, objectGfotTokenInfo.decimals))
      SetGfotBalanceStr(parseInt(objectGfot.balance) / Math.pow(10, objectGfotTokenInfo.decimals) + ' ' + objectGfotTokenInfo.symbol)

      //SFOT balance and info
      const objectSfotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_SFOT_CONTRACT, {
        token_info: {},
      })
      setSfotTokenInfo(objectSfotTokenInfo)
      
      const objectSfot: JsonObject = await signingClient.queryContractSmart(PUBLIC_SFOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      SetSfotBalance(parseInt(objectSfot.balance) / Math.pow(10, objectSfotTokenInfo.decimals))
      SetSfotBalanceStr(parseInt(objectSfot.balance) / Math.pow(10, objectSfotTokenInfo.decimals) + ' ' + objectSfotTokenInfo.symbol)

      //Liquidity pools and lp token info and balances
      //SFOT-UST
      const sfotUstPoolInfo = await signingClient.queryContractSmart(PUBLIC_SFOT_UST_POOL_CONTRACT, {
        info: {},
      })
      setSfotUstPoolInfo(sfotUstPoolInfo)
      const sfotUstLpTokenInfo = await signingClient.queryContractSmart(sfotUstPoolInfo.lp_token_address, {
        token_info: {},
      })
      setSfotUstLpTokenInfo(sfotUstLpTokenInfo)

      const sfotUstLpBalance = await signingClient.queryContractSmart(sfotUstPoolInfo.lp_token_address, {
        balance: { address: walletAddress },
      })
      SetSfotUstLpBalance(sfotUstLpBalance.balance)
      
      //SFOT-BFOT
      const sfotBfotPoolInfo = await signingClient.queryContractSmart(PUBLIC_SFOT_BFOT_POOL_CONTRACT, {
        info: {},
      })
      setSfotBfotPoolInfo(sfotBfotPoolInfo)
      const sfotBfotLpTokenInfo = await signingClient.queryContractSmart(sfotBfotPoolInfo.lp_token_address, {
        token_info: {},
      })
      setSfotBfotLpTokenInfo(sfotBfotLpTokenInfo)

      const sfotBfotLpBalance = await signingClient.queryContractSmart(sfotBfotPoolInfo.lp_token_address, {
        balance: { address: walletAddress },
      })
      SetSfotBfotLpBalance(sfotBfotLpBalance.balance)

      ////////////////////////////////////////////////////////////////////////////
      //////////////////            Contracts       //////////////////////////////
      ////////////////////////////////////////////////////////////////////////////

      //FotBurn Contract Info
      const fotBurnContractInfo = await signingClient.queryContractSmart(PUBLIC_FOTBURN_CONTRACT, {
        config: {},
      })
      setFotBurnContractInfo(fotBurnContractInfo)

      //BFotBurn Contract Info
      const bfotBurnContractInfo = await signingClient.queryContractSmart(PUBLIC_BFOTBURN_CONTRACT, {
        config: {},
      })
      setbFotBurnContractInfo(bfotBurnContractInfo)

      //GFotStaking Contract Info
      const gfotStakingContractInfo = await signingClient.queryContractSmart(PUBLIC_GFOTSTAKING_CONTRACT, {
        config: {},
      })
      setgFotStakingContractInfo(gfotStakingContractInfo)

      //Changed APY formula
      // dpr formula is (100x30)/staked gFOT amount
      // apr formula is 365xdpr
      setgFotStakingApy( 365 * 100 * 30.0 / Number(convertMicroDenomToDenom2(gfotStakingContractInfo.gfot_amount, objectGfotTokenInfo.decimals)))

      const gfotStakingMyInfo = await signingClient.queryContractSmart(PUBLIC_GFOTSTAKING_CONTRACT, {
        staker: {
          address: `${walletAddress}`
        },
      })

      let new_reward = gfotStakingContractInfo.daily_fot_amount * (Math.floor((new Date().getTime()) /1000 / 86400) - Math.floor(gfotStakingMyInfo.last_time/86400) ) * gfotStakingMyInfo.amount / gfotStakingContractInfo.gfot_amount

      setgFotStakingMyStaked(gfotStakingMyInfo.amount)
      setgFotStakingMyReward(gfotStakingMyInfo.reward + new_reward)

      const unstaking_list = await signingClient.queryContractSmart(PUBLIC_GFOTSTAKING_CONTRACT, {
        unstaking: {
          address: `${walletAddress}`
        },
      })
      setUnstakingList(unstaking_list)

      // bFOT Juno Pool related
      const poolInfo = await signingClient.queryContractSmart(PUBLIC_BFOT_JUNO_POOL_CONTRACT, {
        info: {
        },
      })
      setPoolDpr(10000000 / Number(convertMicroDenomToDenom2(poolInfo.token2_reserve, objectBfotTokenInfo.decimals)))
      
      const bFot2JunoPriceInfo = await signingClient.queryContractSmart(PUBLIC_BFOT_JUNO_POOL_CONTRACT, {
        token2_for_token1_price: { token2_amount: '10000000000' },
        
      })
      setbFot2Juno(Number(convertMicroDenomToDenom2(bFot2JunoPriceInfo.token1_amount, 6)))

      const Juno2bFotPriceInfo = await signingClient.queryContractSmart(PUBLIC_BFOT_JUNO_POOL_CONTRACT, {
        token1_for_token2_price: { token1_amount: '1000000' },
      })
      setJuno2bFot(Number(convertMicroDenomToDenom2(Juno2bFotPriceInfo.token2_amount, objectBfotTokenInfo.decimals)))

      const Juno2UstPriceInfo =  await signingClient.queryContractSmart(PUBLIC_UST_JUNO_POOL_CONTRACT, {
        token1_for_token2_price: { token1_amount: '1000000' },
      })
      setJuno2Ust(Number(convertMicroDenomToDenom2(Juno2UstPriceInfo.token2_amount, 6)))

      const bfot2ustval = Math.round(Juno2UstPriceInfo.token2_amount * bFot2JunoPriceInfo.token1_amount / 1000000)

      setbFot2Ust(Number(convertMicroDenomToDenom2(bfot2ustval, 6)))
      
      // let apy = 10.0 * gfotStakingContractInfo.apy_prefix * 10000000000 / (Math.floor(gfotTokenInfo.total_supply / 10000000000) + 10000.0) / gfotStakingContractInfo.gfot_amount 

      // setgFotStakingApy(apy)
      // console.log("gfotStakingMyInfo")
      // console.log(gfotStakingMyInfo)

      // Moneta airdrop action
      const latest_val = await signingClient.queryContractSmart(PUBLIC_MONETA_AIRDROP_CONTRACT, {
        latest_stage: {
          
        },
      })
      setMonetaLatestStage(latest_val.latest_stage)
      let cnt = 0;
      let arr = [];
      for (let i = 1; i <= latest_val.latest_stage; i ++) {
        try {
          let val = await signingClient.queryContractSmart(PUBLIC_MONETA_AIRDROP_CONTRACT, {
            is_claimed: {
              stage: i,
              address: walletAddress
            },
          })
          if (val.is_claimed == true) {
            cnt ++;
            arr.push(1)
          } else 
            arr.push(0)
        } catch(error) {
          arr.push(0)
          continue;
        }
      }
      while (arr.length < 20)
        arr.push(0)
      setMonetaAirdropCount(cnt)
      setMonetaAirdropList(arr)
      

      //Stable Contract Info
      const stableContractInfo = await signingClient.queryContractSmart(PUBLIC_STABLE_CONTRACT, {
        config: {},
      })
      setStableContractInfo(stableContractInfo)

      //Clearance Contract Info
      const clearanceContractInfo = await signingClient.queryContractSmart(PUBLIC_CLEARANCE_CONTRACT, {
        config: {},
      })
      setClearanceContractInfo(clearanceContractInfo)


      setLoading(false)
      if (showNotification)
        NotificationManager.info(`Successfully got balances`)
    } catch (error) {
      setLoading(false)
      if (showNotification)
        NotificationManager.error(`GetBalances error : ${error}`)
    }

    

  }
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    airdrop Functions   /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

   const getMyAirdropAmount = async () => {
    if (walletAddress == '')
      return
    setLoading(true)
    var amount = 0
    voters.forEach((rec) => {
      if (rec.address == walletAddress) {
        amount = parseInt(rec.amount)
      }
    });
    setAirdropAmount(amount)
    setAirdropAmountDenom(amount / Math.pow(10, fotTokenInfo.decimals))
    if (amount == 0)
      return

    let receivers: Array<{ address: string; amount: string }> = voters
    let airdrop = new Airdrop(receivers)
    let proof = airdrop.getMerkleProof({ address: walletAddress, amount: amount.toString() })
    setMerkleProof(proof)

    setLoading(false)
  }

  const GetAlreadyAirdropped = async () => {
    if (walletAddress == '')
      return
    setLoading(true)
    try {
      const response: JsonObject = await signingClient.queryContractSmart(PUBLIC_AIRDROP_CONTRACT, {
        is_claimed: {
          stage: 1,
          address: walletAddress
        },
      })
      setAlreadyAirdropped(response.is_claimed)
      setLoading(false)
      if (showNotification)
        NotificationManager.info('AlreadyAirdropped')
    } catch (error) {
      setLoading(false)
      if (showNotification)
        NotificationManager.error(`GetAlreadyAirdropped error : ${error}`)
    }
  }

  const executeAirdrop = async () => {
    if (alreadyAirdropped) {
      if (showNotification)
        NotificationManager.warning('Already airdropped')
    }
    setLoading(true)

    try {
      await signingClient.execute(
        walletAddress, // sender address
        PUBLIC_AIRDROP_CONTRACT, // token escrow contract
        {
          "claim": {
            "stage": 1,
            "amount": `${airdropAmount}`,
            "proof": merkleProof
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      getBalances()
      setAlreadyAirdropped(true)

      // if (showNotification)
      NotificationManager.success('Successfully airdropped')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Airdrop error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    Moneta airdrop Functions   /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////


  // const GetAlreadyMonetaAirdropped = async () => {
  //   if (walletAddress == '')
  //     return
  //   setLoading(true)
  //   try {

  //     for (let i = 1; i < 20; i ++) {
  //       try {
  //         const response: JsonObject = await signingClient.queryContractSmart(PUBLIC_MONETA_AIRDROP_CONTRACT, {
  //           is_claimed: {
  //             stage: stage,
  //             address: walletAddress
  //           },
  //         })

  //       }
  //     }
      
  //     setAlreadyAirdropped(response.is_claimed)
  //     setLoading(false)
  //     if (showNotification)
  //       NotificationManager.info('AlreadyAirdropped')
  //   } catch (error) {
  //     setLoading(false)
  //     if (showNotification)
  //       NotificationManager.error(`GetAlreadyAirdropped error : ${error}`)
  //   }
  // }

  
  const executeMonetaAirdrop = async () => {
    // if (alreadyAirdropped) {
    //   if (showNotification)
    //     NotificationManager.warning('Already airdropped')
    // }
    setLoading(true)
    let amount = "111000000000"
    let receivers: Array<{ address: string; amount: string }> = moneta_voters
    let airdrop = new Airdrop(receivers)
    let proof = airdrop.getMerkleProof({ address: walletAddress, amount: amount.toString() })
    console.log(proof)
    try {
      const stage = await signingClient.queryContractSmart(PUBLIC_MONETA_AIRDROP_CONTRACT, {
        latest_stage: {},
      })
      console.log(stage)
      let val = stage.latest_stage
      console.log("stage:" + val)
      await signingClient.execute(
        walletAddress, // sender address
        PUBLIC_MONETA_AIRDROP_CONTRACT, // token escrow contract
        {
          "claim": {
            "stage": val,
            "amount": `${amount}`,
            "proof": proof
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      getBalances()
      setAlreadyAirdropped(true)

      // if (showNotification)
      NotificationManager.success('Successfully moneta airdropped')
    } catch (error) {
      setLoading(false)
      console.log(error)
      // if (showNotification) {
        NotificationManager.error(`Moneta Airdrop error : ${error}`)
        console.log(error.toString())
      // }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    fotburn Functions   /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const FOT_STEP: number = 10000000000000000;
  const calc_fot_rate = (fot_amount: number) => {
    // console.log(fot_amount + ":" + BigInt(--fot_amount))
    let step = Math.floor(fot_amount / FOT_STEP)
    if (fot_amount % FOT_STEP == 0)
      step--;

    // let step = Math.floor((fot_amount - 1) / FOT_STEP);
    step = step + 1;
    return 110 - step;
  }

  //calculate bfot amount to send according to the fot_amount and fot_rate
  const calc_bfot_amount = (fot_amount: number, fot_rate: number) => {
    return fot_amount * fot_rate;
  }

  const handleFotChange = (value) => {
    if (Number(value) > fotBalance || Number(value) < 0)
      return;
    setFotBurnAmount(value)

    let bfot_send_amount = 0;
    let amount = Number(convertDenomToMicroDenom2(value, fotTokenInfo.decimals))
    // console.log("FOT microdenom amount:" + amount)
    let fot_amount = fotTokenInfo.total_supply
    // console.log("fot_unburn_amount:" + fot_amount)
    // let FOT_STEP = Math.pow(10,12);
    while (amount > 0) {
      let sliceamount = fot_amount % FOT_STEP;
      if (sliceamount == 0) {
        sliceamount = FOT_STEP;
      }
      if (sliceamount > amount) {
        sliceamount = amount;
      }
      bfot_send_amount = bfot_send_amount + calc_bfot_amount(sliceamount, calc_fot_rate(fot_amount));
      fot_amount = fot_amount - sliceamount;
      amount = amount - sliceamount;
    }

    setExpectedBfotAmount(Number(convertMicroDenomToDenom2(bfot_send_amount, bfotTokenInfo.decimals)))
  }

  const executeFotBurn = async () => {

    setLoading(true)
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_FOT_CONTRACT, // token sale contract
        {
          "send": {
            "amount": convertDenomToMicroDenom2(fotBurnAmount, fotTokenInfo.decimals),
            "contract": PUBLIC_FOTBURN_CONTRACT,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      setFotBurnAmount('')
      setExpectedBfotAmount(0)
      getBalances()
      NotificationManager.success(`Successfully burned`)
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Burnmodule error : ${error}`)
        console.log(error.toString())
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    bfotburn Functions   /////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const handlebFotChange = async (value) => {
    if (Number(value) > bfotBalance || Number(value) < 0)
      return;
    setbFotBurnAmount(value)

    let bamount = Number(convertDenomToMicroDenom2(value, bfotTokenInfo.decimals))

    // console.log("BFOT microdenom amount:" + bamount)
    let bfot_amount = bfotTokenInfo.total_supply
    // console.log("BFOT_unburn_amount:" + bfot_amount)
    // let BFOT_STEP = Math.pow(10,12);
    const expectedInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_BFOTBURN_CONTRACT, {
      expected_amount: {bfot_amount: `${bamount}`},
    })
    
    setExpectedGfotAmount(Number(convertMicroDenomToDenom2(expectedInfo.gfot_send_amount, gfotTokenInfo.decimals)))
  }

  const executebFotBurn = async () => {

    setLoading(true)
    
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_BFOT_CONTRACT, // token sale contract
        {
          "send": {
            "amount": convertDenomToMicroDenom2(bfotBurnAmount, bfotTokenInfo.decimals),
            "contract": PUBLIC_BFOTBURN_CONTRACT,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      setbFotBurnAmount('')
      setExpectedGfotAmount(0)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully burned')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Burnmodule error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////    gfotstaking Functions   ////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const handlegFotStakingChange = async (value) => {
//    if (Number(value) > bfotBalance || Number(value) < 0)
//    return;
    setgFotStakingAmount(value)
  }

  const executegFotStaking = async () => {

    setLoading(true)
    
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_GFOT_CONTRACT, 
        {
          "send": {
            "amount": convertDenomToMicroDenom2(gfotStakingAmount, gfotTokenInfo.decimals),
            "contract": PUBLIC_GFOTSTAKING_CONTRACT,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      setgFotStakingAmount('')
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully staked')
    } catch (error) {
      setLoading(false)
      console.log(error);
      //if (showNotification) {
        NotificationManager.error(`Stakemodule error : ${error}`)
        console.log(error.toString())
      //}
    }
  }

  const executegFotClaimReward = async () => {

    setLoading(true)
    
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_GFOTSTAKING_CONTRACT, 
        {
          "claim_reward": {}
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully clamied reward')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Stakemodule claim error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  const createUnstake = async () => {

    setLoading(true)
    
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_GFOTSTAKING_CONTRACT, 
        {
          "create_unstake": {
            "unstake_amount": convertDenomToMicroDenom2(unstakeAmount, gfotTokenInfo.decimals)
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully unstaked')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Stakemodule unstake error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  const executeFetchUnstake = async (num) => {

    setLoading(true)
    
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_GFOTSTAKING_CONTRACT, 
        {
          "fetch_unstake": {
            index: num
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully unstaked')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Stakemodule unstake error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  const handleUnstakeChange = async (e) => {
    setUnstakeAmount(Number(e))
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    Stable and Clearance Functions   ////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const handleStableGfotChange = async (value) => {
    if (Number(value) > gfotBalance || Number(value) < 0)
      return;
    setStableGfotAmount(value)

    let gamount = Number(convertDenomToMicroDenom2(value, gfotTokenInfo.decimals))
    const expectedInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_STABLE_CONTRACT, {
      expected_amount: {gfot_amount: `${gamount}`},
    })
    
    setStableExpectedSfotAmount(Number(convertMicroDenomToDenom2(expectedInfo.sfot_mint_amount, sfotTokenInfo.decimals)))
  }

  const executeStable = async () => {
    setLoading(true)
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_GFOT_CONTRACT, // token sale contract
        {
          "send": {
            "amount": convertDenomToMicroDenom2(stableGfotAmount, gfotTokenInfo.decimals),
            "contract": PUBLIC_STABLE_CONTRACT,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      setStableGfotAmount('')
      setStableExpectedSfotAmount(0)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully swapped into SFOT')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Stable Module error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  const handleClearanceSfotChange = async (value) => {
    if (Number(value) > sfotBalance || Number(value) < 0)
      return;
    setClearanceSfotAmount(value)

    let samount = Number(convertDenomToMicroDenom2(value, sfotTokenInfo.decimals))
    const expectedInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_CLEARANCE_CONTRACT, {
      expected_amount: {sfot_amount: `${samount}`},
    })
    setClearanceExpectedGfotAmount(Number(convertMicroDenomToDenom2(expectedInfo.gfot_sell_amount, gfotTokenInfo.decimals)))
  }

  const executeClearance = async () => {
    setLoading(true)
    try {
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_SFOT_CONTRACT, // token sale contract
        {
          "send": {
            "amount": convertDenomToMicroDenom2(clearanceSfotAmount, sfotTokenInfo.decimals),
            "contract": PUBLIC_CLEARANCE_CONTRACT,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      setClearanceSfotAmount('')
      setClearanceExpectedGfotAmount(0)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully bought GFOT')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Clearance Module error : ${error}`)
        console.log(error.toString())
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    Pool Related Functions   ////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  //slip default : 1.004008990478986
  let slip = 1.004009
  const handleAddLiquidityValuesChange = async (asset:number, token1Amount:number, token2Amount:number, fix:number) => {
    let contract = ""
    let decimals = [10, 10]
    let token1Balance = sfotBalance
    let token2Balance:number
    switch (asset) {
      case 0:
        contract = PUBLIC_SFOT_UST_POOL_CONTRACT;
        decimals = [10, 6]
        token2Balance = ustBalance
        break;
      case 1:
        contract = PUBLIC_SFOT_BFOT_POOL_CONTRACT;
        token2Balance = bfotBalance
        break;
      default:
        return;
    }
    // console.log("handleLiquidityChange")
    
    const price1to2 = await signingClient.queryContractSmart(contract, {
      token1_for_token2_price: { token1_amount: `${Math.pow(10, decimals[0])}` },
    })
    
    // console.log("price1to2: " + price1to2.token2_amount)
    
    //This is the token1 amount of 1 token2 
    const price2to1 = await signingClient.queryContractSmart(contract, {
      token2_for_token1_price: { token2_amount: `${Math.pow(10, decimals[1])}` },
    })
    
    // console.log("price2to1: " + price2to1.token1_amount)

    // console.log("token1")
    // console.log(token1Amount)
    // console.log(token2Amount * Number(convertMicroDenomToDenom2(price2to1.token1_amount, decimals[0])))
    // console.log("token2")
    // console.log(token2Amount)
    // console.log(token1Amount * Number(convertMicroDenomToDenom2(price1to2.token2_amount, decimals[1])))

    if (fix == 1) {
      //changed token1amount
      token2Amount = slip * token1Amount * Number(convertMicroDenomToDenom2(price1to2.token2_amount, decimals[1]))
      if (token2Amount > token2Balance) {
        token2Amount = token2Balance
        token1Amount = token2Amount * Number(convertMicroDenomToDenom2(price2to1.token1_amount, decimals[0])
        ) / slip
      }
    } else {
      token1Amount = token2Amount * Number(convertMicroDenomToDenom2(price2to1.token1_amount, decimals[0])) / slip
      if (token1Amount > token1Balance) {
        token1Amount = token1Balance
        token2Amount = slip * token1Amount * Number(convertMicroDenomToDenom2(price1to2.token2_amount, decimals[1]))
      }
    }

    return {token1Amount, token2Amount}
  }

  const executeAddLiquidity = async (asset:number, token1Amount:number, token2Amount:number) => {
    setLoading(true)
    let contract = ""
    let decimals = [10, 10]
    switch (asset) {
      case 0:
        contract = PUBLIC_SFOT_UST_POOL_CONTRACT;
        decimals = [10, 6]
        break;
      case 1:
        contract = PUBLIC_SFOT_BFOT_POOL_CONTRACT;
        break;
      default:
        return;
    }
    try {
      let token1 = convertDenomToMicroDenom2(token1Amount, decimals[0])
      let token2 = convertDenomToMicroDenom2(token2Amount, decimals[1])
      
      
      // token2 = convertDenomToMicroDenom2(token2Amount * slip, decimals[1])
      await signingClient?.execute(
        walletAddress, // sender address
        PUBLIC_SFOT_CONTRACT, // token sale contract
        {
          "increase_allowance": {
            "amount": token1,
            "spender": contract,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )
      let funds = []
      
      if (asset == 0) {
        funds = [coin(token2, ust_denom)]
      } else {
        let token2_contract = ''
        if (asset == 1)
          token2_contract = PUBLIC_BFOT_CONTRACT

        await signingClient?.execute(
          walletAddress, // sender address
          token2_contract, // token sale contract
          {
            "increase_allowance": {
              "amount": token2,
              "spender": contract,
              "msg": ""
            }
          }, // msg
          defaultFee,
          undefined,
          []
        )
      }

      await signingClient?.execute(
        walletAddress, // sender address
        contract, // token sale contract
        {
          "add_liquidity": {
            "token1_amount": token1,
            "max_token2": token2,
            "min_liquidity": "1"
          }
        }, // msg
        defaultFee,
        undefined,
        funds
      )

      setLoading(false)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully added liquidity')
    } catch (error) {
      setLoading(false)
      //if (showNotification) {
        NotificationManager.error(`Add Liquidity error : ${error}`)
        console.log(error.toString())
      //}
    }
  }

  const executeRemoveLiquidity = async (asset:number) => {
    setLoading(true)
    let contract = ""
    let lpcontract = ""
    let lpbalance = 0
    let lptot = 0
    let token1 = 0
    let token2 = 0
    switch (asset) {
      case 0:
        contract = PUBLIC_SFOT_UST_POOL_CONTRACT
        lpcontract = sfotUstPoolInfo.lp_token_address
        lpbalance = sfotUstLpBalance
        lptot = sfotUstLpTokenInfo.total_supply
        token1 = sfotUstPoolInfo.token1_reserve * lpbalance / lptot
        token2 = sfotUstPoolInfo.token2_reserve * lpbalance / lptot
        break;
      case 1:
        contract = PUBLIC_SFOT_BFOT_POOL_CONTRACT
        lpcontract = sfotBfotPoolInfo.lp_token_address
        lpbalance = sfotBfotLpBalance
        lptot = sfotBfotLpTokenInfo.total_supply
        token1 = sfotBfotPoolInfo.token1_reserve * lpbalance / lptot
        token2 = sfotBfotPoolInfo.token2_reserve * lpbalance / lptot
        break;
      default:
        return;
    }
    // lpbalance *= 0.7

    try {
      await signingClient?.execute(
        walletAddress, // sender address
        lpcontract, // token sale contract
        {
          "increase_allowance": {
            "amount": `${lpbalance}`,
            "spender": contract,
            "msg": ""
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )
      
      await signingClient?.execute(
        walletAddress, // sender address
        contract, // token sale contract
        {
          "remove_liquidity": {
            "amount": `${lpbalance}`,
            "min_token1": "0",
            "min_token2": "0"
          }
        }, // msg
        defaultFee,
        undefined,
        []
      )

      setLoading(false)
      getBalances()
      if (showNotification)
        NotificationManager.success('Successfully removed liquidity')
    } catch (error) {
      setLoading(false)
      //if (showNotification) {
        NotificationManager.error(`Remove Liquidity error : ${error}`)
        console.log(error.toString())
      //}
    }
  }
  
  const calcExpectedSwapAmount = async () => {
    
  }
  
  const executeSwap = async () => {
    // setLoading(true)
    // let contract = ""
    // let lpcontract = ""
    // let lpbalance = 0
    // let lptot = 0
    // let token1 = 0
    // let token2 = 0
    // switch (asset) {
    //   case 0:
    //     contract = PUBLIC_SFOT_UST_POOL_CONTRACT
    //     lpcontract = sfotUstPoolInfo.lp_token_address
    //     lpbalance = sfotUstLpBalance
    //     lptot = sfotUstLpTokenInfo.total_supply
    //     token1 = sfotUstPoolInfo.token1_reserve * lpbalance / lptot
    //     token2 = sfotUstPoolInfo.token2_reserve * lpbalance / lptot
    //     break;
    //   case 1:
    //     contract = PUBLIC_SFOT_BFOT_POOL_CONTRACT
    //     lpcontract = sfotBfotPoolInfo.lp_token_address
    //     lpbalance = sfotBfotLpBalance
    //     lptot = sfotBfotLpTokenInfo.total_supply
    //     token1 = sfotBfotPoolInfo.token1_reserve * lpbalance / lptot
    //     token2 = sfotBfotPoolInfo.token2_reserve * lpbalance / lptot
    //     break;
    //   default:
    //     return;
    // }
    // // lpbalance *= 0.7

    // try {
    //   await signingClient?.execute(
    //     walletAddress, // sender address
    //     lpcontract, // token sale contract
    //     {
    //       "increase_allowance": {
    //         "amount": `${lpbalance}`,
    //         "spender": contract,
    //         "msg": ""
    //       }
    //     }, // msg
    //     defaultFee,
    //     undefined,
    //     []
    //   )
      
    //   await signingClient?.execute(
    //     walletAddress, // sender address
    //     contract, // token sale contract
    //     {
    //       "remove_liquidity": {
    //         "amount": `${lpbalance}`,
    //         "min_token1": "0",
    //         "min_token2": "0"
    //       }
    //     }, // msg
    //     defaultFee,
    //     undefined,
    //     []
    //   )

    //   setLoading(false)
    //   getBalances()
    //   if (showNotification)
    //     NotificationManager.success('Successfully removed liquidity')
    // } catch (error) {
    //   setLoading(false)
    //   //if (showNotification) {
    //     NotificationManager.error(`Remove Liquidity error : ${error}`)
    //     console.log(error.toString())
    //   //}
    // }
  }
  

  return {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,

    getBalances,
    nativeBalance,
    atomBalance,
    osmoBalance,
    ustBalance,
    nativeBalanceStr,
    fotBalance,
    fotBalanceStr,
    fotTokenInfo,

    bfotBalance,
    bfotBalanceStr,
    bfotTokenInfo,
    fotBurnContractInfo,

    gfotBalance,
    gfotBalanceStr,
    gfotTokenInfo,
    bfotBurnContractInfo,


    alreadyAirdropped,
    airdropAmount,
    airdropAmountDenom,
    merkleProof,

    getMyAirdropAmount,
    GetAlreadyAirdropped,
    executeAirdrop,

    fotBurnAmount,
    setFotBurnAmount,
    expectedBfotAmount,
    handleFotChange,
    executeFotBurn,

    bfotBurnAmount,
    setbFotBurnAmount,
    expectedGfotAmount,
    handlebFotChange,
    executebFotBurn,

    gfotStakingContractInfo,
    gfotStakingAmount,
    setgFotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    handlegFotStakingChange,
    executegFotStaking,
    executegFotClaimReward,

    bFot2Juno,
    Juno2bFot,
    bFot2Ust,
    poolDpr,

    executeMonetaAirdrop,
    monetaLatestStage,
    monetaAirdropCount,
    monetaAirdropList,

    unstakingList,
    createUnstake,
    executeFetchUnstake,
    unstakeAmount,
    handleUnstakeChange,

    sfotBalance,
    sfotBalanceStr,
    sfotTokenInfo,
    stableContractInfo,
    clearanceContractInfo,
    stableGfotAmount,
    stableExpectedSfotAmount,
    clearanceSfotAmount,
    clearanceExpectedGfotAmount,

    handleStableGfotChange,
    executeStable,
    handleClearanceSfotChange,
    executeClearance,

    sfotUstLpBalance,
    sfotBfotLpBalance,
    sfotUstLpTokenInfo,
    sfotBfotLpTokenInfo,
    sfotUstPoolInfo,
    sfotBfotPoolInfo,

    handleAddLiquidityValuesChange,
    executeAddLiquidity,
    executeRemoveLiquidity,

    swapToken1,
    setSwapToken1,
    swapAmount,
    setSwapAmount,
    expectedToken2Amount,
    executeSwap,
    calcExpectedSwapAmount
  }
}
