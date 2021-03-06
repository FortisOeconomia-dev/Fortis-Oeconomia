import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from '../Layout/Layout'

const OutWrapper = styled.div`
  border: double ${props => (props.defaultChecked ? '2px' : '0px')};
  border-radius: 9.95992px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  cursor: pointer;
`

const Wrapper = styled.div`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 7.28px 18.11px rgba(41, 54, 24, 0.25);
  border-radius: 9.95992px;
  text-align: center;
`

const UstWrapper = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 7.28px 18.11px rgba(41, 54, 24, 0.25);
  border-radius: 9.95992px;
  text-align: center;
`

const Title = styled.span`
  font-weight: bold;
  font-size: 22px;
  line-height: 40px;
  color: #171e0e;
  display: flex;
`

const Subtitle = styled.span`
  font-size: 12px;
  margin-top: 3px;
`

const Images = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;
  gap: 1rem;
`

const Pool = ({ from, to, fromImage, toImage, onClick, isActive, imagesPosition = 'bottom', level = null }) => {
  const { toggle } = useContext(ToggleContext)

  const renderImages = () => (
    <Images defaultChecked={toggle}>
      {typeof fromImage === 'string' ? <img src={fromImage} /> : fromImage(toggle)}
      {typeof toImage === 'string' ? <img src={toImage} /> : toImage(toggle)}
    </Images>
  )

  return (
    <OutWrapper defaultChecked={isActive}>
      {to === 'UST' ? (
        <UstWrapper onClick={onClick}>
          {imagesPosition === 'top' && renderImages()}
          <Title>
            {from} - {to}
            <Subtitle>(Classic)</Subtitle>
            {!!level && ` (Level ${level})`}
          </Title>
          {imagesPosition === 'bottom' && renderImages()}
        </UstWrapper>
      ) : (
        <Wrapper onClick={onClick}>
          {imagesPosition === 'top' && renderImages()}
          <Title>
            {from} - {to}
            {!!level && ` (Level ${level})`}
          </Title>
          {imagesPosition === 'bottom' && renderImages()}
        </Wrapper>
      )}
    </OutWrapper>
  )
}

export default Pool
