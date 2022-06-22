import { useCallback, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import FromConv from './FromConv'
import ToConv from './ToConv'
import { useSigningClient } from '../../contexts/cosmwasm'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => (props.defaultChecked ? '100%' : 'unset')};

  button {
    border-radius: 60px;
    z-index: -1;
  }
`

const Converter = ({
  maxW = '453px',
  wfull = true,
  convImg,
  convImg2 = null,
  assets,
  handleChangeAsset,
  handleExchange,
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
  disableSwap,
  fromCastleDex,
}) => {
  const { setSwapToken1 } = useSigningClient()
  const [exchange, setExchange] = useState(false)

  const handleExchangeClick = useCallback(() => {
    if (!fromCastleDex) {
      setSwapToken1(exchange)
    }
    setExchange(!exchange)
    handleExchange(to, from)
  }, [to, from, exchange])

  const handleSelect = useCallback(
    (name, isFrom, isTo) => {
      if (isFrom && name !== to) {
        handleChangeAsset(name, isFrom, isTo)
      }
      if (isTo && name !== from) {
        handleChangeAsset(name, isFrom, isTo)
      }
    },
    [from, to, handleChangeAsset],
  )

  return (
    <Wrapper defaultChecked={wfull}>
      <FromConv
        assets={assets}
        from={from}
        fromImage={fromImage}
        handleBurnMinus={handleBurnMinus}
        burnAmount={burnAmount}
        onBurnChange={onBurnChange}
        handleBurnPlus={handleBurnPlus}
        balance={sbalance}
        handleChange={handleChange}
        maxW={maxW}
        showBalance={showBalance}
        onSelect={name => handleSelect(name, true, false)}
      />
      <div style={{ marginBottom: '58px', display: 'flex', gap: '16px' }}>
        {typeof convImg === 'string' ? <img src={convImg} /> : convImg()}
        {convImg2 && convImg2(handleExchangeClick)}
      </div>
      <ToConv
        assets={assets}
        to={to}
        toImage={toImage}
        expectedAmount={expectedAmount}
        sbalance={balance}
        maxW={maxW}
        showBalance={showBalance}
        onSelect={name => handleSelect(name, false, true)}
      />
      {showSubmitButton && (
        <button
          onClick={handleSubmit}
          disabled={disableSwap}
          className={classnames('default-btn', disableSwap && 'disabled-btn')}
        >
          {submitTitle}
        </button>
      )}
    </Wrapper>
  )
}

export default Converter
