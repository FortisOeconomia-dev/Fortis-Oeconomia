import styled from 'styled-components'
import { useContext, useState } from 'react'
import { ToggleContext } from '../Layout/Layout'
import InputWithIncDec from '../InputWithIncDec'
import { useRouter } from 'next/router'
import { useSigningClient } from '../../contexts/cosmwasm'
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
  background-color: ${props => props.slot !== '/gFOTmodule' && 'transparent !important'};
  color: ${props => (props.slot === '/sFOTVault' || props.slot === '/communitySale') && '#FBFCFD'};
`

const MaxButton = styled.span`
  padding: 5px !important;
  width: 100px !important;
  min-width: unset !important;
  cursor: pointer;
  margin-right: 10px;
`

const BottomArea = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const FromConv = ({
  assets,
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
  onSelect,
}) => {
  const router = useRouter()
  const { pathname } = router
  const { walletAddress } = useSigningClient()
  const { toggle } = useContext(ToggleContext)
  const [isMax, setIsMax] = useState(false)

  return (
    <div className="gFotCurrencyt-selection" style={{ maxWidth: maxW }}>
      <span style={{ fontSize: 18, fontWeight: 700 }}>From</span>
      <WalletTitle slot={pathname} defaultChecked={fromImage}>
        <AssetSelector assets={assets} onSelect={onSelect}>
          {fromImage &&
            (typeof fromImage === 'string' ? (
              <img src={fromImage} style={{ background: 'transparent', color: 'transparent' }} />
            ) : (
              fromImage(toggle)
            ))}{' '}
          {from}
        </AssetSelector>
      </WalletTitle>
      <InputWithIncDec
        handleBurnMinus={handleBurnMinus}
        burnAmount={burnAmount}
        onBurnChange={onBurnChange}
        handleBurnPlus={handleBurnPlus}
      />
      {isMax && <div style={{ padding: '5px' }}>Please do not forget to allocate funds for the gass fee!</div>}
      <BottomArea>
        <div>
          <MaxButton
            onClick={() => {
              setIsMax(true)
              handleChange(balance)
            }}
            className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
          >
            Max
          </MaxButton>
          <MaxButton
            onClick={() => handleChange(balance / 2)}
            className={`default-btn  ${!toggle && 'secondary-btn outlined mr-2'}`}
          >
            Half
          </MaxButton>
        </div>
        {showBalance && walletAddress.length != 0 && (
          <div
            className="banner-wrapper-content"
            style={{ height: 'fit-content', width: 'fit-content', textAlign: 'right' }}
          >
            <span className="sub-title ms-2" style={{ background: '#83B8DD' }}>
              Balance {convertToNoExponents(balance)}
            </span>
          </div>
        )}
      </BottomArea>
    </div>
  )
}

export default FromConv
