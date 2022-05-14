import { useCallback, useContext, useState } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../Layout/Layout'
import FromConv from './FromConv'
import ToConv from './ToConv'
import { useSigningClient } from '../../contexts/cosmwasm'
import AssetSelector from './AssetSelector'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => (props.defaultChecked ? '100%' : 'unset')};

  button {
    border-radius: 60px;
  }
`

const Converter = ({
  maxW = '453px',
  wfull = true,
  convImg,
  convImg2 = null,
  assets,
  handleChangeAsset,
  from,
  to,
  fromImage = null,
  toImage = null,
  handleBurnMinus,
  burnAmount,
  onBurnChange,
  handleBurnPlus,
  expectedAmount,
  handleSubmit,
  balance,
  handleChange,
  sbalance,
  submitTitle = 'Burn',
  showBalance = true,
  showSubmitButton = true,
}) => {
  const { setSwapToken1 } = useSigningClient()
  const { toggle } = useContext(ToggleContext)
  const [exchange, setExchange] = useState(false)

  const handleSelect = useCallback(
    (name, isFrom, isTo, exchange) => {
      if (isFrom && name !== to) {
        handleChangeAsset(name, isFrom, isTo, exchange)
      }
      if (isTo && name !== from) {
        handleChangeAsset(name, isFrom, isTo, exchange)
      }
    },
    [to],
  )

  return (
    <Wrapper defaultChecked={wfull}>
      <FromConv
        assets={assets}
        from={!exchange ? from : to}
        fromImage={!exchange ? fromImage : toImage}
        handleBurnMinus={handleBurnMinus}
        burnAmount={burnAmount}
        onBurnChange={onBurnChange}
        handleBurnPlus={handleBurnPlus}
        balance={!exchange ? sbalance : balance}
        handleChange={handleChange}
        maxW={maxW}
        showBalance={showBalance}
        onSelect={name => handleSelect(name, true, false, exchange)}
      />
      <div style={{ marginBottom: '58px', display: 'flex', gap: '16px' }}>
        {typeof convImg === 'string' ? <img src={convImg} /> : convImg()}
        {convImg2 &&
          convImg2(() => {
            setSwapToken1(exchange)
            setExchange(!exchange)
          })}
      </div>
      <ToConv
        assets={assets}
        to={!exchange ? to : from}
        toImage={!exchange ? toImage : fromImage}
        expectedAmount={expectedAmount}
        sbalance={!exchange ? balance : sbalance}
        maxW={maxW}
        showBalance={showBalance}
        onSelect={name => handleSelect(name, false, true, exchange)}
      />
      {showSubmitButton && (
        <button className={`default-btn`} onClick={handleSubmit}>
          {submitTitle}
        </button>
      )}
    </Wrapper>
  )
}

export default Converter
