import { useMemo, useState } from 'react'
import styled from 'styled-components'

import { convertToNoExponents } from '../../util/conversion'

const Wrapper = styled.label`
  background: rgba(255, 255, 255, 0.6);
  height: 79px;
  border-radius: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  max-width: ${props => (props.slot ? props.slot : 'unset')};
`

const DecButton = styled.button`
  width: fit-content !important;
  height: 48px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #080451 !important;
  margin-right: 0px !important;
  margin-left: 16px !important;
  margin-top: 16px !important;
  margin-bottom: 15px !important;
`

const IncButton = styled.button`
  width: fit-content !important;
  height: 48px !important;
  background: transparent !important;
  box-shadow: none !important;
  color: #080451 !important;
  margin-left: 0px !important;
  margin-right: 16px !important;
  margin-top: 16px !important;
  margin-bottom: 15px !important;
`

const IncDecInput = styled.input`
  color: #080451;
  width: 100%;
  background: transparent;
  border: none;
  text-align: center;
  flex: 1;
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
`

const InputWithIncDec = ({ handleBurnMinus, burnAmount, onBurnChange, handleBurnPlus, maxW = null }) => {
  const [value, setValue] = useState('0')

  const realValue = useMemo(() => {
    let result = ''
    if (Number(value) === Number(burnAmount)) {
      result = value
    } else {
      result = burnAmount
    }
    if (result && Number(result) > 0 && String(result)?.includes('e')) return convertToNoExponents(result)
    else return result
  }, [value, burnAmount])

  return (
    <Wrapper slot={maxW}>
      <DecButton className="fa fa-minus" onClick={handleBurnMinus} />
      <IncDecInput
        type="text"
        value={realValue}
        onKeyPress={event => {
          if (!/[0-9 .]/.test(event.key)) {
            event.preventDefault()
          }
        }}
        onChange={e => {
          setValue(e.target.value)
          onBurnChange(e)
        }}
      />
      <IncButton className="fa fa-plus" onClick={handleBurnPlus} />
    </Wrapper>
  )
}

export default InputWithIncDec
