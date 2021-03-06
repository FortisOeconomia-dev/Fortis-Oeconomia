import styled from 'styled-components'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { ToggleContext } from '../Layout/Layout'
import InputWithIncDec from '../InputWithIncDec'
import { useSigningClient } from '../../contexts/cosmwasm'
import { convertToNoExponents } from '../../util/conversion'

const WalletTitle = styled.label`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  margin-bottom: 32px;
  background-color: ${props => props.slot !== '/gFOTmodule' && 'transparent !important'};
  color: ${props => (props.slot === '/sFOTVault' || props.slot === '/communitySale') && '#FBFCFD'};
`

const MaxButton = styled.span`
  margin-bottom: 30px;
  padding: 5px !important;
  width: 100px !important;
  min-width: unset !important;
  cursor: pointer;
`
const AssetSubtitle = styled.div`
  font-size: 14px;
  padding-top: 10px;
  line-height: 15px;
`

const FromConv = ({
  from,
  fromImage,
  handleBurnMinus,
  burnAmount,
  onBurnChange,
  handleBurnPlus,
  balance,
  handleChange,
  maxW,
  showBalance,
}) => {
  const router = useRouter()
  const { pathname } = router
  const { walletAddress } = useSigningClient()
  const { toggle } = useContext(ToggleContext)
  const [isMax, setIsMax] = useState(false)

  return (
    <div className="gFotCurrencyt-selection" style={{ maxWidth: maxW }}>
      <WalletTitle slot={pathname} defaultChecked={fromImage}>
        {fromImage &&
          (typeof fromImage === 'string' ? (
            <img src={fromImage} style={{ background: 'transparent', color: 'transparent' }} />
          ) : (
            fromImage(toggle)
          ))}{' '}
        {from}
        {from === 'UST' && <AssetSubtitle>(Classic) </AssetSubtitle>}
      </WalletTitle>
      <InputWithIncDec
        handleBurnMinus={handleBurnMinus}
        burnAmount={burnAmount}
        onBurnChange={onBurnChange}
        handleBurnPlus={handleBurnPlus}
      />
      {showBalance && walletAddress.length != 0 && (
        <div className="banner-wrapper-content" style={{ height: 'fit-content', textAlign: 'right' }}>
          <span className="sub-title ms-2" style={{ background: '#83B8DD' }}>
            Balance {convertToNoExponents(balance)}
          </span>
        </div>
      )}
      {isMax && from === 'JUNO' && (
        <div style={{ padding: '5px' }}>Please do not forget to allocate funds for the gas fee!</div>
      )}
      <MaxButton
        onClick={() => {
          setIsMax(true)
          handleChange(balance)
        }}
        className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
      >
        Max
      </MaxButton>
    </div>
  )
}

export default FromConv
