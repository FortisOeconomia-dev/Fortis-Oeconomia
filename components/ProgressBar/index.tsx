import styled from 'styled-components'
import { useContext } from 'react'

import { ToggleContext } from '../../components/Layout/Layout'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: ${props => !props.defaultChecked && '0px'};
  right: ${props => !props.defaultChecked && '10%'};
  top: ${props => props.defaultChecked && '26%'};
  left: ${props => props.defaultChecked && '0px'};
  z-index: 1;
`

const Description = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: ${props => (props.defaultChecked ? 'white' : '#171E0E')};
`

const BarWrapper = styled.div`
  background: rgba(251, 252, 253, 0.25);
  box-shadow: 4px 4px 24px rgba(50, 70, 84, 0.25);
  border-radius: 15px;
  width: 70px;
  height: 620px;
  position: relative;
  border: double 3px transparent;
  border-radius: 15px;
  background-image: linear-gradient(rgba(251, 252, 253, 0.25), white),
    linear-gradient(178.72deg, rgba(131, 184, 221, 0.8) 0%, rgba(95, 91, 205, 0.8) 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`

const Done = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(179.94deg, #83b8dd 0.06%, #728bd5 48.44%, #5f5bcd 99.94%);
  border-radius: 15px 15px 12px 12px;
  width: 64px;
  height: ${props => (parseInt(props.slot) * 620) / 100}px;
`

const ProgressBar = ({ claimedPercent }) => {
  const { toggle } = useContext(ToggleContext)
  return (
    <Wrapper>
      <Description defaultChecked={toggle}>My Progress</Description>
      <BarWrapper>
        <Done slot={`${claimedPercent}`} />
      </BarWrapper>
      <Description defaultChecked={toggle}>Claimed</Description>
      <Description defaultChecked={toggle}>{`${claimedPercent}`}% FOT</Description>
    </Wrapper>
  )
}

export default ProgressBar
