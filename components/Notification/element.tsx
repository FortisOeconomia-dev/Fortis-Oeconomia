import styled from 'styled-components'
import { useEffect } from 'react'

const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 8px 24px rgba(71, 94, 82, 0.25);
  border-radius: 200px 0px 0px 200px;
  padding: ${props => (!props.defaultChecked ? '5px 10px 5px 21px' : '5px 21px 5px 10px')};
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 9999;
  right: ${props => !props.defaultChecked && '0px'};
  top: 30px;
  left: ${props => props.defaultChecked && '0px'};

  border: 1px solid;
  border-color: ${props => (props.type ? 'green' : 'red')};
  min-width: 324px;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 20px;
  line-height: 32px;
  font-weight: 800;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => (props.type ? 'green;' : 'red')};
  & > i {
    margin-right: 10px;
  }
  & > svg {
    fill: ${props => (props.type ? 'green;' : 'red')};
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  & > span {
    vertical-align: middle;
  }
`

const Text = styled.span`
  font-size: 15px;
  font-weight: 500;
  text-decoration-line: underline;
  color: ${props => (props.type ? 'green;' : 'red')};
  cursor: pointer;
`

const Notification = ({ id, action, title = 'Title', txHash = 'tx', left = false, type = false, remove }) => {
  // type is success or error. true is success, false is error

  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        remove(id)
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [id])

  const onClickText = () => {
    window.open(`https://atomscan.com/${txHash}`, '_blank')
  }

  return (
    <Wrapper
      style={{
        borderRadius: left && '0 200px 200px 0',
        right: left && 'unset',
        left: left && '0',
        filter: 'none',
      }}
      type={type}
      onClick={action}
    >
      <ContentWrapper>
        <i
          className="fas fa-times"
          style={{ position: 'absolute', right: 10, cursor: 'pointer' }}
          onClick={() => remove(id)}
        ></i>
        <Title type={type}>
          {type ? (
            <i className="fas fa-check"></i>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
            </svg>
          )}
          <span>{title}</span>
        </Title>
        <Text type={type} onClick={onClickText}>
          Click here for corresponding tx
        </Text>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Notification
