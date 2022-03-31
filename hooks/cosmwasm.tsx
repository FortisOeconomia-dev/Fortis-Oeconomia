import { useState } from 'react'
import { connectKeplr } from '../services/keplr'
import { SigningCosmWasmClient, CosmWasmClient, JsonObject } from '@cosmjs/cosmwasm-stargate'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertMicroDenomToDenom2,
  convertDenomToMicroDenom2,
  convertFromMicroDenom,
} from '../util/conversion'
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
  fotBurnContractInfo: any

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
  executeFotBurn: Function

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
}

export const PUBLIC_CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
export const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
export const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'

export const PUBLIC_MONETA_AIRDROP_CONTRACT = process.env.NEXT_PUBLIC_MONETA_AIRDROP_CONTRACT || ''
export const PUBLIC_AIRDROP_CONTRACT = process.env.NEXT_PUBLIC_AIRDROP_CONTRACT || ''
export const PUBLIC_FOTBURN_CONTRACT = process.env.NEXT_PUBLIC_FOTBURN_CONTRACT || ''
export const PUBLIC_BFOTBURN_CONTRACT = process.env.NEXT_PUBLIC_BFOTBURN_CONTRACT || ''
export const PUBLIC_GFOTSTAKING_CONTRACT = process.env.NEXT_PUBLIC_GFOTSTAKING_CONTRACT || ''

export const PUBLIC_FOT_CONTRACT = process.env.NEXT_PUBLIC_FOT_CONTRACT || ''
export const PUBLIC_BFOT_CONTRACT = process.env.NEXT_PUBLIC_BFOT_CONTRACT || ''
export const PUBLIC_GFOT_CONTRACT = process.env.NEXT_PUBLIC_GFOT_CONTRACT || ''

export const BFOT_JUNO_POOL_CONTRACT = "juno19859m5x8kgepwafc3h0n36kz545ngc2vlqnqxx7gx3t2kguv6fws93cu25"
export const defaultFee = {
  amount: [],
  gas: "800000",
}

export const CW20_DECIMAL = 1000000


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


  const [fotTokenInfo, setFotTokenInfo] = useState({ name: '', symbol: '', decimals: 10, total_supply: 0 })
  const [bfotTokenInfo, setBfotTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })
  const [gfotTokenInfo, setGfotTokenInfo] = useState({ name: '', symbol: '', decimals: 6, total_supply: 0 })

  
  const [fotBurnContractInfo, setFotBurnContractInfo] = useState({ owner: '', fot_burn_amount: 0, bfot_sent_amount: 0, bfot_current_amount: 0 })
  const [bfotBurnContractInfo, setbFotBurnContractInfo] = useState({ owner: '', bfot_burn_amount: 0, gfot_sent_amount: 0, gfot_current_amount: 0 })
  const [gfotStakingContractInfo, setgFotStakingContractInfo] = useState({ owner: '', fot_amount: 0, gfot_amount: 0, last_time: 0, apy_prefix: 0 })

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

  //////////////////////////////////////////////////////////////////////
  /////////////////////  bFOT JUno Pool Variables   ////////////////////
  //////////////////////////////////////////////////////////////////////

  const [bFot2Juno, setbFot2Juno] = useState(0)
  const [Juno2bFot, setJuno2bFot] = useState(0)
  const [poolDpr, setPoolDpr] = useState(0)

  const [unstakingList, setUnstakingList] = useState([])
  const [unstakeAmount, setUnstakeAmount] = useState(0)
  
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
      const objectAtom:JsonObject = await signingClient.getBalance(walletAddress, "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9");
      const objectOsmo:JsonObject = await signingClient.getBalance(walletAddress, "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518");
      const objectUST:JsonObject = await signingClient.getBalance(walletAddress, "ibc/2DA4136457810BCB9DAAB620CA67BC342B17C3C70151CA70490A170DF7C9CB27");

      setAtomBalance(convertMicroDenomToDenom(objectAtom.amount))
      setOsmoBalance(convertMicroDenomToDenom(objectOsmo.amount))
      setUstBalance(convertMicroDenomToDenom(objectUST.amount))
      
      const objectNative: JsonObject = await signingClient.getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      setNativeBalanceStr(`${convertMicroDenomToDenom(objectNative.amount)} ${convertFromMicroDenom(objectNative.denom)}`)
      setNativeBalance(convertMicroDenomToDenom(objectNative.amount))
      // console.log(objectNative.amount)

      //FOT balance and info
      const objectFotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_FOT_CONTRACT, {
        token_info: {},
      })
      setFotTokenInfo(objectFotTokenInfo)
      // console.log(objectFotTokenInfo)

      const objectFot: JsonObject = await signingClient.queryContractSmart(PUBLIC_FOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      // console.log((objectFot.balance) / Math.pow(10, objectFotTokenInfo.decimals))
      SetFotBalance(parseInt(objectFot.balance) / Math.pow(10, objectFotTokenInfo.decimals))
      SetFotBalanceStr(parseInt(objectFot.balance) / Math.pow(10, objectFotTokenInfo.decimals) + ' ' + objectFotTokenInfo.symbol)

      //BFOT balance and info
      const objectBfotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_BFOT_CONTRACT, {
        token_info: {},
      })
      setBfotTokenInfo(objectBfotTokenInfo)
      // console.log(objectBfotTokenInfo)

      const objectBfot: JsonObject = await signingClient.queryContractSmart(PUBLIC_BFOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      // console.log((objectBfot.balance) / Math.pow(10, objectBfotTokenInfo.decimals))
      SetBfotBalance(parseInt(objectBfot.balance) / Math.pow(10, objectBfotTokenInfo.decimals))
      SetBfotBalanceStr(parseInt(objectBfot.balance) / Math.pow(10, objectBfotTokenInfo.decimals) + ' ' + objectBfotTokenInfo.symbol)

      //GFOT balance and info
      const objectGfotTokenInfo: JsonObject = await signingClient.queryContractSmart(PUBLIC_GFOT_CONTRACT, {
        token_info: {},
      })
      setGfotTokenInfo(objectGfotTokenInfo)
      // console.log(objectGfotTokenInfo)

      const objectGfot: JsonObject = await signingClient.queryContractSmart(PUBLIC_GFOT_CONTRACT, {
        balance: { address: walletAddress },
      })

      // console.log((objectGfot.balance) / Math.pow(10, objectGfotTokenInfo.decimals))
      SetGfotBalance(parseInt(objectGfot.balance) / Math.pow(10, objectGfotTokenInfo.decimals))
      SetGfotBalanceStr(parseInt(objectGfot.balance) / Math.pow(10, objectGfotTokenInfo.decimals) + ' ' + objectGfotTokenInfo.symbol)

      //FotBurn Contract Info
      const fotBurnContractInfo = await signingClient.queryContractSmart(PUBLIC_FOTBURN_CONTRACT, {
        config: {},
      })
      setFotBurnContractInfo(fotBurnContractInfo)
      // console.log(fotBurnContractInfo)

      //BFotBurn Contract Info
      const bfotBurnContractInfo = await signingClient.queryContractSmart(PUBLIC_BFOTBURN_CONTRACT, {
        config: {},
      })
      setbFotBurnContractInfo(bfotBurnContractInfo)
      // console.log(bfotBurnContractInfo)

      //GFotStaking Contract Info
      const gfotStakingContractInfo = await signingClient.queryContractSmart(PUBLIC_GFOTSTAKING_CONTRACT, {
        config: {},
      })
      setgFotStakingContractInfo(gfotStakingContractInfo)
      // console.log(gfotStakingContractInfo)

      //GFotStaking APY and myInfo
      // const gfotStakingApy = await signingClient.queryContractSmart(PUBLIC_GFOTSTAKING_CONTRACT, {
      //   apy: {},
      // })
      // setgFotStakingApy(gfotStakingApy)


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

      // bFOT Juno Pool related
      const poolInfo = await signingClient.queryContractSmart(BFOT_JUNO_POOL_CONTRACT, {
        info: {
        },
      })
      setPoolDpr(10000000 / Number(convertMicroDenomToDenom2(poolInfo.token2_reserve, objectBfotTokenInfo.decimals)))
      
      const bFot2JunoPriceInfo = await signingClient.queryContractSmart(BFOT_JUNO_POOL_CONTRACT, {
        token2_for_token1_price: {
          token2_amount: '10000000000'
        },
        
      })
      setbFot2Juno(Number(convertMicroDenomToDenom2(bFot2JunoPriceInfo.token1_amount, 6)))

      const Juno2bFotPriceInfo = await signingClient.queryContractSmart(BFOT_JUNO_POOL_CONTRACT, {
        token1_for_token2_price: {
          token1_amount: '1000000'
        },
      })
      setJuno2bFot(Number(convertMicroDenomToDenom2(Juno2bFotPriceInfo.token2_amount, objectBfotTokenInfo.decimals)))
      
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
      
      const unstaking_list = await signingClient.queryContractSmart(PUBLIC_GFOTSTAKING_CONTRACT, {
        unstaking: {
          address: `${walletAddress}`
        },
      })
      setUnstakingList(unstaking_list)

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
  ///////////////////////    gfotstaking Functions   /////////////////////////
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
  }
}
