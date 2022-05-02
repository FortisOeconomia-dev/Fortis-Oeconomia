import { useRouter } from 'next/router'
import styled from 'styled-components'
import React, { useContext } from 'react'
import { ToggleContext } from '../Layout/Layout'
import { convertToFixedDecimals, convertToNoExponents } from '../../util/conversion'

const Wrapper = styled('div')<{ slot: string; page: number }>`
  background: ${props => (props.slot === '/gFOTmodule' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(251, 252, 253, 0.3)')};
  box-shadow: ${props =>
    props.slot === '/gFOTmodule'
      ? '2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25)'
      : '4px 8px 83px rgba(34, 40, 95, 0.25)'};
  border-radius: ${props =>
    props.slot === '/gFOTmodule' ? '15.1165px' : props.slot === '/sFOTVault' && props.page === 0 ? '27px' : '70px'};
  width: 100%;
  max-width: 610px;
  display: flex;
  padding: ${props =>
    (props.slot === '/sFOTVault' && props.page === 0) || props.slot === '/communitySale' ? '0 30px' : '30px'};
  align-self: flex-start;
  margin: auto;
  margin-left: ${props =>
    props.slot === '/sFOTVault' && props.page === 0 ? '-45px' : props.slot === '/communitySale' ? 'auto' : '22px'};
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

const StatisticLabel = styled('span')<{ slot: string; page: number; toggle: boolean }>`
  font-weight: 600;
  font-size: ${props =>
    props.slot === '/gFOTmodule' || (props.slot === '/sFOTVault' && props.page === 0) ? '16.4907px' : '24px'};
  line-height: ${props =>
    props.slot === '/gFOTmodule' || (props.slot === '/sFOTVault' && props.page === 0) ? '25px' : '36px'};
  color: ${props => {
    switch (props.slot) {
      case '/gFOTmodule':
        return '#080451'
      case '/sFOTVault':
        return '#171E0E'
      case '/communitySale':
        return props.toggle ? '#233A54' : '#FBFCFD'
      default:
        return '#22053D'
    }
  }};
`

const StatisticValue = styled('span')<{ slot: string; page: number }>`
  font-weight: 600;
  font-size: ${props =>
    props.slot === '/gFOTmodule' || (props.slot === '/sFOTVault' && props.page === 0) ? '20.6134px' : '30px'};
  line-height: ${props =>
    props.slot === '/gFOTmodule' || (props.slot === '/sFOTVault' && props.page === 0) ? '31px' : '45px'};
  color: ${props =>
    props.slot === '/sFOTVault' ? '#171E0E' : props.slot === '/communitySale' ? '#233A54' : '#22053d'};
`

const StatisticItem = styled('label')<{ datatype: string; page: number }>`
  width: 100%;
  max-width: 470px;
  padding: ${props =>
      props.datatype === '/gFOTmodule' || (props.datatype === '/sFOTVault' && props.page === 0) ? '36px' : '72px'}
    0;
  transform: rotate(0.01deg);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Ellipse3 = styled.div`
  position: absolute;
  width: 294px;
  height: 290px;
  border-radius: 100%;
  right: 1px;
  top: 10px;
  background: #83b8dd;
  filter: blur(75px);
`

const Ellipse4 = styled.div`
  position: absolute;
  width: 297px;
  height: 231px;
  border-radius: 100%;
  right: 3px;
  bottom: 29px;
  background: #8394dd;
  filter: blur(90px);
`

const Ellipse5 = styled.div`
  position: absolute;
  width: 261px;
  height: 157px;
  border-radius: 100%;
  left: 676px;
  top: 630px;
  background: #89b9a0;
  filter: blur(141.846px);
`

const Ellipse6 = styled.div`
  position: absolute;
  width: 427px;
  height: 268px;
  border-radius: 100%;
  left: 1053px;
  top: 340px;
  background: #c4ddd0;
  filter: blur(207.22px);
`

const Ellipse7 = styled.div`
  position: absolute;
  width: 431px;
  height: 214px;
  border-radius: 100%;
  left: 1046px;
  top: 634px;
  background: #a7cbb8;
  filter: blur(202.166px);
`

const Ellipse8 = styled.div`
  position: absolute;
  width: 420px;
  height: 265px;
  border-radius: 100%;
  left: 715px;
  top: 378px;
  background: #ddece5;
  filter: blur(202.166px);
`

const Ellipse9 = styled.div`
  position: absolute;
  width: 190px;
  height: 113px;
  left: 828px;
  top: 571px;
  border-radius: 100%;
  background: #89b9a0;
  filter: blur(118.129px);
`

const Ellipse10 = styled.div`
  position: absolute;
  width: 312px;
  height: 193px;
  left: 1103px;
  top: 363px;

  background: #c4ddd0;
  filter: blur(172.573px);
`

const Ellipse11 = styled.div`
  position: absolute;
  width: 315px;
  height: 153px;
  left: 1098px;
  top: 575px;

  background: #a7cbb8;
  filter: blur(168.364px);
`

const Ellipse12 = styled.div`
  position: absolute;
  width: 306px;
  height: 189px;
  left: 856px;
  top: 390px;

  background: #ddece5;
  filter: blur(168.364px);
`

const ShapeWrapper = styled.div`
  z-index: -1;
`

const Divider = styled.div`
  background: ${props =>
    props.slot === '/gFOTmodule'
      ? '#2E0752'
      : props.slot === '/communitySale'
      ? 'linear-gradient(270deg, #76C893 0%, #34A0A4 100%)'
      : 'linear-gradient(270deg, #5F5BCD 0%, #83B8DD 100%)'};
  height: ${props => (props.slot === '/gFOTmodule' ? '1.71779px' : '2.5px')};
  width: 100%;
  transform: rotate(0.01deg);
  margin: ${props => props.slot === '/communitySale' && '20px 0'};
`

const VirticalDivider = styled.div`
  background: ${props =>
    props.slot === '/gFOTmodule' ? '#2E0752' : 'linear-gradient(270deg, #5F5BCD 0%, #83B8DD 100%)'};
  width: ${props => (props.slot === '/gFOTmodule' ? '1.71779px' : '2.5px')};
  transform: rotate(0.01deg);
  margin-left: 20px;
  margin-right: 20px;
`

const VaulteButton = styled.button`
  flex: 1 1 0%;
  min-width: calc(50% - 10px);
  border-radius: 50px !important;
  max-width: calc(50% - 10px);
  border: #734242 solid !important;
  color: #734242 !important;
  &:hover {
    border-color: white !important;
    color: white !important;
  }
`

const StatisticBox = ({
  values = [],
  leftValues = [],
  page = 0,
  setPage = null,
  maxWidth = '661px',
  children = null,
}) => {
  const router = useRouter()
  const { pathname } = router
  const { toggle } = useContext(ToggleContext)
  const renderShadowShapes = () => {
    switch (pathname) {
      case '/gFOTmodule':
      case '/communitySale':
        return null
      case '/sFOTVault':
        return (
          <ShapeWrapper>
            {page === 0 ? (
              <>
                <Ellipse5 />
                <Ellipse6 />
                <Ellipse7 />
                <Ellipse8 />
              </>
            ) : (
              <>
                <Ellipse9 />
                <Ellipse10 />
                <Ellipse11 />
                <Ellipse12 />
              </>
            )}
          </ShapeWrapper>
        )
      default:
        return (
          <>
            <Ellipse3 />
            <Ellipse4 />
          </>
        )
    }
  }

  return (
    <div style={{ paddingLeft: '27px', maxWidth, width: '100%' }}>
      {page < 2 && pathname === '/sFOTVault' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '50px',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <button
            className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
            style={{ flex: '1', minWidth: 'calc(50% - 10px)', borderRadius: '50px', maxWidth: 'calc(50% - 10px)' }}
            onClick={() => setPage(page => (page === 0 ? 1 : 0))}
          >
            {page === 0 ? 'Clearance Sale' : 'Stable Module (sFOT)'}
          </button>
          <button
            className={`default-btn  ${!toggle && 'secondary-btn outlined'}`}
            style={{ flex: '1', minWidth: 'calc(50% - 10px)', borderRadius: '50px', maxWidth: 'calc(50% - 10px)' }}
            onClick={() => setPage(4)}
          >
            Stable Pools and Swaps
          </button>
          {/* <VaulteButton className={`default-btn  ${!toggle && 'secondary-btn outlined'}`} onClick={() => setPage(2)}>
            Vault
          </VaulteButton> */}
        </div>
      )}
      {children}
      {page < 2 && (
        <Wrapper slot={pathname} page={page} defaultChecked={leftValues.length > 0}>
          {renderShadowShapes()}
          <ContentWrapper slot={pathname}>
            {values.map((v, idx) => {
              return (
                <React.Fragment key={idx}>
                  <StatisticItem htmlFor={`${idx}`} slot={`${values.length}`} datatype={pathname} page={page}>
                    <StatisticLabel slot={pathname} page={page} toggle={toggle}>
                      {v.key.split('(').map((value, idx, self) =>
                        self.length === 1 ? (
                          v.key
                        ) : idx === self.length - 1 ? (
                          <React.Fragment key={idx}>
                            <br />
                            <span>{value}</span>
                          </React.Fragment>
                        ) : (
                          value
                        ),
                      )}
                    </StatisticLabel>
                    <StatisticValue slot={pathname} page={page}>
                      {convertToFixedDecimals(convertToNoExponents(v.value))}
                    </StatisticValue>
                  </StatisticItem>
                  {idx < values.length - 1 && <Divider slot={pathname} />}
                </React.Fragment>
              )
            })}
          </ContentWrapper>
          {leftValues.length > 0 ? <VirticalDivider slot={pathname} /> : <></>}
        </Wrapper>
      )}
    </div>
  )
}

export default StatisticBox
