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
