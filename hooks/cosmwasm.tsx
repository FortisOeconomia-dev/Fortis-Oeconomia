import { useState } from 'react'
import { connectKeplr } from '../services/keplr'
import { SigningCosmWasmClient, CosmWasmClient, JsonObject } from '@cosmjs/cosmwasm-stargate'
import { fromBase64, toBase64 } from '@cosmjs/encoding'
import {
  convertMicroDenomToDenom, 
  convertDenomToMicroDenom,
  convertFromMicroDenom
} from '../util/conversion'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import { create } from 'ipfs-http-client'
import {voters} from '../proposal.json'
import {Airdrop} from '../util/merkle-airdrop-cli/airdrop'

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
  fotBalance: number,
  fotBalanceStr: string,
  fotTokenInfo: any,

  alreadyAirdropped: boolean,
  airdropAmount: number,
  airdropAmountDenom: number,
  merkleProof:any[],
  
  getMyAirdropAmount: Function,
  GetAlreadyAirdropped: Function,
  executeAirdrop: Function

}

export const PUBLIC_CHAIN_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || ''
export const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
export const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || 'ujuno'
export const PUBLIC_AIRDROP_CONTRACT = process.env.NEXT_PUBLIC_AIRDROP_CONTRACT || ''
export const PUBLIC_CW20_CONTRACT = process.env.NEXT_PUBLIC_CW20_CONTRACT || ''

export const defaultFee = {
  amount: [],
  gas: "400000",
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
  const [fotBalance, SetFotBalance] = useState(0)
  const [fotBalanceStr, SetFotBalanceStr] = useState('')
  
  const [fotTokenInfo, setFotTokenInfo] = useState({ name: '', symbol: '', decimals: 10, total_supply:0 })
    
  /////////////////////////////////////////////////////////////////////
  /////////////////////  Airdrop Variables   //////////////////////////
  /////////////////////////////////////////////////////////////////////
  const [alreadyAirdropped, setAlreadyAirdropped] = useState(false)
  const [airdropAmount, setAirdropAmount] = useState(0)
  const [airdropAmountDenom, setAirdropAmountDenom] = useState(0)
  const [merkleProof, setMerkleProof] = useState([])

  

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  ///////////////////////    connect & disconnect   //////////////////////
  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////

  const showNotification = false;

  const connectWallet = async (inBackground:boolean) => {
    if (!inBackground)
      setLoading(true)

    try {
      await connectKeplr()

      // enable website to access kepler
      await (window as any).keplr.enable(PUBLIC_CHAIN_ID)

      // get offline signer for signing txs
      const offlineSigner = await (window as any).getOfflineSigner(
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
      const objectNative:JsonObject = await signingClient.getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      setNativeBalanceStr(`${convertMicroDenomToDenom(objectNative.amount)} ${convertFromMicroDenom(objectNative.denom)}`)
      setNativeBalance(convertMicroDenomToDenom(objectNative.amount))



      const objectFotTokenInfo:JsonObject = await signingClient.queryContractSmart(PUBLIC_CW20_CONTRACT, {
        token_info: {},
      })
      setFotTokenInfo(objectFotTokenInfo)
      console.log(objectFotTokenInfo)
      
      const objectCrew:JsonObject = await signingClient.queryContractSmart(PUBLIC_CW20_CONTRACT, {
        balance: { address: walletAddress },
      })


      console.log((objectCrew.balance) / Math.pow(10, objectFotTokenInfo.decimals))
      SetFotBalance(parseInt(objectCrew.balance) / Math.pow(10, objectFotTokenInfo.decimals))
      SetFotBalanceStr(parseInt(objectCrew.balance) / Math.pow(10, objectFotTokenInfo.decimals) + objectFotTokenInfo.symbol)
      
      
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
    let proof = airdrop.getMerkleProof({address: walletAddress, amount: amount.toString()})
    setMerkleProof(proof)
    
    setLoading(false)
  }

  const GetAlreadyAirdropped = async () => {
    if (walletAddress == '') 
      return
    setLoading(true)
    try {
      const response:JsonObject = await signingClient.queryContractSmart(PUBLIC_AIRDROP_CONTRACT, {
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
      
      if (showNotification)
        NotificationManager.success('Successfully airdropped')
    } catch (error) {
      setLoading(false)
      if (showNotification) {
        NotificationManager.error(`Airdrop error : ${error}`)
        console.log(error.toString())
      }
    }
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
    nativeBalanceStr,
    fotBalance,
    fotBalanceStr,
    fotTokenInfo,

    alreadyAirdropped,
    airdropAmount,
    airdropAmountDenom,
    merkleProof,

    getMyAirdropAmount,
    GetAlreadyAirdropped,
    executeAirdrop
    

  }
}
