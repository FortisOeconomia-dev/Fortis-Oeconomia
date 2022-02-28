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

    getIsAdmin: () => {},
    isAdmin: false,

    getManagerConstants: () => {},
    setManagerConstants: () => {},
    setManagerAddr: () => {},
    setMinStake: () => {},
    setRateClient: () => {},
    setRateManager: () => {},
    
    managerAddr: '',
    minStake: 0,
    rateClient: 0,
    rateManager: 0,

    getBalances: () => {},
    nativeBalanceStr: '',
    cw20Balance: 0,
    nativeBalance: 0,

    executeSendContract:(plainMsg:string, amount:number) => {},

    getDetailsAll:() => {},
    detailsAll: null,

    executeApproveContract:() => {},
    executeRefundContract:() => {},
    executeRemoveContract:() => {},
    
    executeUploadImage:(file:Object) => {}
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
