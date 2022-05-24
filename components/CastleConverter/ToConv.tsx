import styled from 'styled-components'
import { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'

import { useSigningClient } from '../../contexts/cosmwasm'
import { ToggleContext } from '../Layout/Layout'
import { convertToNoExponents } from '../../util/conversion'
import AssetSelector from './AssetSelector'

const WalletTitle = styled.label`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  margin-bottom: 32px;
  margin-top: 0px !important;
  background-color: ${props => props.slot !== '/gFOTmodule' && 'transparent !important'};
  color: ${props => (props.slot === '/sFOTVault' || props.slot === '/communitySale') && '#FBFCFD'};
`

const ExpectedValWrapper = styled.label`
  display: flex !important;
  margin-bottom: 30px !important;
  width: ${props => props.slot} !important;
  height: 79px !important;
  border-radius: 20px !important;
  background: rgba(255, 255, 255, 0.6) !important;
`

const ExpectedVal = styled.span`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  color: #080451;
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
`

const BannerWrapperContent = styled.div`
  height: fit-content;
  text-align: right !important;
`

const SubTitle = styled.span`
  background: #83b8dd;
  margin-top: 10px;
  margin-bottom: 32px;
`

const ToConv = ({ assets, to, expectedAmount, sbalance, maxW, toImage, showBalance, onSelect }) => {
  const router = useRouter()
  const { pathname } = router
  const { toggle } = useContext(ToggleContext)
  const { walletAddress } = useSigningClient()

  const realValue = useMemo(() => {
    if (expectedAmount && Number(expectedAmount) > 0 && String(expectedAmount)?.includes('e'))
      return convertToNoExponents(expectedAmount)
    else return expectedAmount
  }, [expectedAmount])

  return (
    <div className="gFotCurrencyt-selection">
      <span style={{ fontSize: 18, fontWeight: 700 }}>To</span>
      <WalletTitle slot={pathname}>
        <AssetSelector assets={assets} onSelect={onSelect}>
          {toImage &&
            (typeof toImage === 'string' ? (
              <img src={toImage} style={{ background: 'transparent', color: 'transparent' }} />
            ) : (
              toImage(toggle)
            ))}{' '}
          {to}
        </AssetSelector>
      </WalletTitle>
      <ExpectedValWrapper className="wallet-label" slot={maxW}>
        <ExpectedVal>{realValue}</ExpectedVal>
      </ExpectedValWrapper>
      {showBalance && walletAddress.length != 0 && (
        <BannerWrapperContent className="banner-wrapper-content">
          <SubTitle className="sub-title ms-2">Balance {convertToNoExponents(sbalance)}</SubTitle>
        </BannerWrapperContent>
      )}
    </div>
  )
}

export default ToConv
