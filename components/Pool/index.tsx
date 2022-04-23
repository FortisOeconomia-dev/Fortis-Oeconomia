import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from '../Layout/Layout'
import { useRouter } from 'next/router'

const OutWrapper = styled.div`
  border: double ${props => (props.defaultChecked ? '2px' : '0px')};
  border-radius: 9.95992px;
  background-origin: border-box;
  background-clip: content-box, border-box;
  cursor: pointer;
`

const Wrapper = styled.div`
  padding: 12px;
  box-shadow: 0px 7.28px 18.11px rgba(41, 54, 24, 0.25);
  border-radius: 9.95992px;
`

const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #171e0e;
`

const Images = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
`

const Pool = ({ from, to, fromImage, toImage, onClick, isActive, imagesPosition = 'bottom', level = null }) => {
  const { toggle } = useContext(ToggleContext)
  const router = useRouter()
  const { pathname } = router

  const isFortisDungeon = pathname === '/fortisDungeon'

  const renderImages = () => (
    <Images defaultChecked={toggle}>
      {typeof fromImage === 'string' ? (
        <img src={fromImage} style={{ color: 'transparent', filter: isFortisDungeon ? 'none' : null }} />
      ) : (
        fromImage(toggle)
      )}
      {typeof toImage === 'string' ? (
        <img src={toImage} style={{ color: 'transparent', filter: isFortisDungeon ? 'none' : null }} />
      ) : (
        toImage(toggle)
      )}
    </Images>
  )

  return (
    <OutWrapper defaultChecked={isActive}>
      <Wrapper onClick={onClick}>
        {imagesPosition === 'top' && renderImages()}
        <Title>
          {from} - {to}
          {!!level && ` (Level ${level})`}
        </Title>
        {imagesPosition === 'bottom' && renderImages()}
      </Wrapper>
    </OutWrapper>
  )
}

export default Pool
