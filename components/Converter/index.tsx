import { useContext, useState } from 'react'
import styled from 'styled-components'

import { ToggleContext } from '../Layout/Layout'
import FromConv from './FromConv'
import ToConv from './ToConv'
import { useSigningClient } from '../../contexts/cosmwasm'
import { useRouter } from 'next/router'

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

const SubmitButton = styled.button<{ slot?: string }>`
  background: ${props => props.slot === '/burnmodule' && 'linear-gradient(97.62deg, #5F5BCD 0%, #A8A4F7 100%);'}
`

const ButtonBlur = styled.span<{ slot: string, active: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: ${props => props.slot === '/burnmodule' && 'linear-gradient(97.62deg, #5F5BCD 0%, #A8A4F7 100%);'}
  filter: ${props => props.slot === '/burnmodule' && props.active && 'blur(50px);'}
`

const Converter = ({
  maxW = '453px',
  wfull = true,
  convImg,
  convImg2 = null,
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
  const { pathname } = useRouter();
  const { swapToken1, setSwapToken1 } = useSigningClient()
  const { toggle } = useContext(ToggleContext)
  const [exchange, setExchange] = useState(false)

  return (
    <Wrapper defaultChecked={wfull}>
      <FromConv
        from={!exchange ? from : to}
        fromImage={!exchange ? fromImage : toImage}
        handleBurnMinus={handleBurnMinus}
        burnAmount={burnAmount}
        onBurnChange={onBurnChange}
        handleBurnPlus={handleBurnPlus}
        balance={!exchange ? balance : sbalance}
        handleChange={handleChange}
        maxW={maxW}
        showBalance={showBalance}
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
        to={!exchange ? to : from}
        toImage={!exchange ? toImage : fromImage}
        expectedAmount={expectedAmount}
        sbalance={!exchange ? sbalance : balance}
        maxW={maxW}
        showBalance={showBalance}
      />
      <div style={{ position: 'relative' }}>
        <ButtonBlur className={`default-btn ${!toggle && 'secondary-btn'}`} slot={pathname} active={showSubmitButton} />
        {showSubmitButton && (
          <SubmitButton className={`default-btn ${!toggle && 'secondary-btn'}`} onClick={handleSubmit} slot={pathname}>
            {submitTitle}
          </SubmitButton>
        )}
      </div>
    </Wrapper>
  )
}

export default Converter
