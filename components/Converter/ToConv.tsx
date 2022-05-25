import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useContext, useMemo } from 'react'

import { useSigningClient } from '../../contexts/cosmwasm'
import { ToggleContext } from '../Layout/Layout'
import { convertToNoExponents } from '../../util/conversion'

const WalletTitle = styled.label`
  gap: 10px;
  display: flex;
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
  background: rgba(255, 255, 255, 0.6) !important;
  width: ${props => props.slot} !important;
  height: 79px !important;
  border-radius: 20px !important;
  margin-bottom: 30px !important;
  display: flex !important;
`

const ExpectedVal = styled.span`
  color: #080451;
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
  margin-top: 20px;
`

const ToConv = ({ to, expectedAmount, sbalance, maxW, toImage, showBalance }) => {
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
      <WalletTitle slot={pathname}>
        {toImage &&
          (typeof toImage === 'string' ? (
            <img src={toImage} style={{ background: 'transparent', color: 'transparent' }} />
          ) : (
            toImage(toggle)
          ))}{' '}
        {to}
      </WalletTitle>
      <ExpectedValWrapper className="wallet-label" slot={maxW}>
        <ExpectedVal>{realValue}</ExpectedVal>
      </ExpectedValWrapper>
      {showBalance && walletAddress.length != 0 && (
        <div className="banner-wrapper-content" style={{ height: 'fit-content', textAlign: 'right' }}>
          <span className="sub-title ms-2" style={{ background: '#83B8DD', marginTop: '10px', marginBottom: '32px' }}>
            Balance {convertToNoExponents(sbalance)}
          </span>
        </div>
      )}
    </div>
  )
}

export default ToConv
