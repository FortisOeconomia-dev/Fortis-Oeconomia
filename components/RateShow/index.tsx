import styled from 'styled-components'
import { useContext } from 'react'

import { ToggleContext } from '../../components/Layout/Layout'

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.44);
  box-shadow: 0px 8px 24px rgba(71, 94, 82, 0.25);
  border-radius: ${props => (!props.defaultChecked ? '200px 0px 0px 200px' : '0px 200px 200px 0px')};
  padding: ${props => (!props.defaultChecked ? '21px' : '21px 60px 21px 21px')};
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
  bottom: ${props => !props.defaultChecked && '15px'};
  right: ${props => !props.defaultChecked && '0px'};
  top: ${props => props.defaultChecked && '16%'};
  left: ${props => props.defaultChecked && '0px'};
  cursor: pointer;
  min-width: 324px;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 15px;
`

const Equal = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 12px;
  color: #171e0e;
`

const Text = styled.span`
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
  color: ${props => (props.defaultChecked ? '#171E0E;' : 'rgba(23, 30, 14, 0.6)')};
`

const RateShow = ({ values = [], action, text, top = false, left = false }) => {
  const { toggle } = useContext(ToggleContext)
  return (
    <Wrapper
      defaultChecked={top}
      style={{
        borderRadius: left && '0 200px 200px 0',
        right: left && 'unset',
        left: left && '0',
        filter: toggle && 'invert(1) hue-rotate(170deg) saturate(200%) contrast(100%) brightness(90%)',
      }}
      onClick={action}
    >
      <ContentWrapper>
        <Text defaultChecked={values.length > 0}>{text}</Text>
        {values.map((d, idx) => (
          <Equal key={idx}>
            {d.fromAmount} {d.fromPer} = {d.toAmount} {d.toPer}
          </Equal>
        ))}
      </ContentWrapper>
    </Wrapper>
  )
}

export default RateShow
