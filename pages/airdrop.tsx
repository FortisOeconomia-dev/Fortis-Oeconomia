import { useEffect, useState, MouseEvent, ChangeEvent, useContext } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import styled from 'styled-components'

import { useSigningClient } from '../contexts/cosmwasm'
import { ToggleContext } from '../components/Layout/Layout'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  margin: 0 !important;
  align-items: center;
  padding: 0 !important;
`

const CurrencySelection = styled.div`
  display: flex;
  flex-direction: column;
`

const Ellipse2 = styled.div`
  position: absolute;
  border-radius: 100%;
  width: 275px;
  height: 250px;
  left: 520px;
  top: 180px;
  background: #ffb049;
  filter: blur(110px);
`
const Ellipse3 = styled.div`
  position: absolute;
  width: 289px;
  height: 286px;
  border-radius: 100%;
  left: -93px;
  bottom: 85px;
  background: #83b8dd;
  filter: blur(75px);
`

const AssetImageWrapper = styled.div`
  background: ${props => props.slot};
  border: 1.4694px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100%;
  min-width: 54px;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OutWrapper = styled.div`
  filter: ${props => props.defaultChecked && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg) '};
  background: linear-gradient(105deg, #98acff 0%, #6774ad 81.65%);
  box-shadow: ${props => props.slot};
  border-radius: 100%;
  min-width: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.span`
  font-weight: 600;
  font-size: 36px;
  line-height: 54px;
  color: #fbfcfd;
`
const SubTitle1 = styled.span`
  font-weight: 600;
  font-size: 26px;
  line-height: 54px;
  color: #171e0e;
  align-self: center;
`
const SubTitle2 = styled.span`
  font-weight: 600;
  font-size: 26px;
  line-height: 54px;
  color: #171e0e;
  align-self: center;
`

const MainLabel = styled.span`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #171e0e;
`

const SecondaryLabel = styled.span`
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #171e0e;
`

const ClaimButton = styled.button`
  background: ${props =>
    props.defaultChecked && 'linear-gradient(274.96deg, #83B8DD -35.34%, #728CD5 37.88%, #5F5BCD 119.14%) !important'};
  border: double 4.5px transparent;
  border-radius: 22px !important;
  background-image: ${props =>
    !props.defaultChecked &&
    'linear-gradient(rgba(251,252,253,0.25), white), linear-gradient(275.74deg, #5F5BCD 0%, #83B8DD 100%)'};
  background-origin: border-box;
  background-clip: content-box, border-box;
  padding: 14px !important;
`

const NonEligible = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  min-height: 465px;
  width: 704px;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 15.1194px 15.1194px 60.4777px rgba(8, 4, 81, 0.18);
  border-radius: 52.162px;
  margin: 100px 10px 10px 10px;
  ${SubTitle1} {
    max-width: 498px;
    color: #080451;
    font-size: 24px;
    line-height: 36px;
    margin-top: 72px;
  }
`

const CreateWork = () => {
  const { toggle } = useContext(ToggleContext)
  const {
    walletAddress,
    eligible,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,

    getBalances,
    nativeBalanceStr,
    nativeBalance,
    fotBalance,
    fotBalanceStr,

    alreadyAirdropped,
    airdropAmount,
    airdropAmountDenom,
    merkleProof,
    getAirdropBalances,
    getMyAirdropAmount,
    GetAlreadyAirdropped,
    executeAirdrop,
    executeMonetaAirdrop,
    monetaAirdropList,
    monetaLatestStage,
  } = useSigningClient()

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    getMyAirdropAmount()
    GetAlreadyAirdropped()
    getAirdropBalances()
  }, [signingClient, walletAddress])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
  }, [airdropAmount])

  const handleSubmit = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')
      return
    }

    // if (alreadyAirdropped) {
    //   NotificationManager.warning("Already airdropped");
    //   return;
    // }

    event.preventDefault()

    executeMonetaAirdrop()
  }

  const defaultValues = [
    {
      title: 'Week1',
      percent: 5,
      claimed: monetaAirdropList[0],
      id: 1,
    },
    {
      title: 'Week2',
      percent: 5,
      claimed: monetaAirdropList[1],
      id: 2,
    },
    {
      title: 'Week3',
      percent: 5,
      claimed: monetaAirdropList[2],
      id: 3,
    },
    {
      title: 'Week4',
      percent: 5,
      claimed: monetaAirdropList[3],
      id: 4,
    },
    {
      title: 'Week5',
      percent: 5,
      claimed: monetaAirdropList[4],
      id: 5,
    },
    {
      title: 'Week6',
      percent: 5,
      claimed: monetaAirdropList[5],
      id: 6,
    },
    {
      title: 'Week7',
      percent: 5,
      claimed: monetaAirdropList[6],
      id: 7,
    },
    {
      title: 'Week8',
      percent: 5,
      claimed: monetaAirdropList[7],
      id: 8,
    },
    {
      title: 'Week9',
      percent: 5,
      claimed: monetaAirdropList[8],
      id: 9,
    },
    {
      title: 'Week10',
      percent: 5,
      claimed: monetaAirdropList[9],
      id: 10,
    },
    {
      title: 'Week11',
      percent: 5,
      claimed: monetaAirdropList[10],
      id: 11,
    },
    {
      title: 'Week12',
      percent: 5,
      claimed: monetaAirdropList[11],
      id: 12,
    },
    {
      title: 'Week13',
      percent: 5,
      claimed: monetaAirdropList[12],
      id: 13,
    },
    {
      title: 'Week14',
      percent: 5,
      claimed: monetaAirdropList[13],
      id: 14,
    },
    {
      title: 'Week15',
      percent: 5,
      claimed: monetaAirdropList[14],
      id: 15,
    },
    {
      title: 'Week16',
      percent: 5,
      claimed: monetaAirdropList[15],
      id: 16,
    },
    {
      title: 'Week17',
      percent: 5,
      claimed: monetaAirdropList[16],
      id: 17,
    },
    {
      title: 'Week18',
      percent: 5,
      claimed: monetaAirdropList[17],
      id: 18,
    },
    {
      title: 'Week19',
      percent: 5,
      claimed: monetaAirdropList[18],
      id: 19,
    },
    {
      title: 'Week20',
      percent: 5,
      claimed: monetaAirdropList[19],
      id: 20,
    },
  ]

  return (
    <>
      {eligible ? (
        <Wrapper className="w-full">
          <div
            className="container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '30px',
              maxWidth: '1368px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
              <OutWrapper
                defaultChecked={toggle}
                slot="48.0696px 12.8802px 99.5307px rgba(26, 30, 44, 0.338), inset -17.946px -4.80861px 18.5791px #606CA1, inset 17.946px 4.80861px 18.5791px #9FB4FF"
              >
                <AssetImageWrapper slot="linear-gradient(180deg, #8394DD 0%, #FBFCFD 100%)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="20" viewBox="0 0 34 20" fill="none">
                    <path
                      d="M15.3539 0.360624C12.905 0.89715 10.9542 2.12497 9.51187 4.06471C7.18752 7.17037 6.84509 11.2768 8.60911 14.7643L8.89965 15.3421L7.58183 15.6619C5.75555 16.1056 5.04995 16.2191 4.03304 16.2294C3.09915 16.2397 2.73598 16.1262 2.63221 15.796C2.53882 15.4865 2.81899 15.0428 3.53497 14.3825C3.89815 14.0523 4.0538 13.8666 3.8774 13.9801C2.49731 14.8055 0.982337 16.1468 0.857819 16.6421C0.826689 16.8072 0.837066 17.0445 0.899325 17.1786C1.20025 17.8286 3.42083 17.5913 7.70635 16.4564L9.45998 15.9921L9.62601 16.2191C10.1448 16.9723 11.8673 18.4683 12.2201 18.4683C12.2824 18.4683 12.3343 18.5096 12.3343 18.5612C12.3343 18.7057 13.8908 19.366 14.7832 19.6033C15.8623 19.8922 17.4396 19.9747 18.5914 19.8097C19.0894 19.7478 19.463 19.6446 19.4319 19.593C19.4007 19.5414 19.546 19.5001 19.7535 19.5001C20.1893 19.5001 21.6109 18.943 21.9015 18.6541C22.0052 18.5509 22.1401 18.4683 22.2128 18.4683C22.5552 18.4683 24.2466 16.9104 24.9626 15.9302C25.4399 15.2698 26.27 13.5364 26.4775 12.742C26.7369 11.7721 26.8926 10.2451 26.82 9.32679L26.7473 8.49104L27.9199 7.85134C29.5801 6.93306 31.2923 5.77746 32.1535 4.983C33.1912 4.02344 33.4091 3.52819 32.9733 3.13611C32.7865 2.97103 32.5997 2.94007 31.7488 2.95039C30.8668 2.96071 28.5736 3.32183 28.4179 3.4766C28.3868 3.50755 28.7396 3.50755 29.1962 3.46628C31.0225 3.32183 31.4894 3.8274 30.5244 4.8695C30.2442 5.1584 29.7669 5.59174 29.4556 5.82905C28.6981 6.40685 26.6851 7.73785 26.5605 7.73785C26.5087 7.73785 26.4153 7.52117 26.3426 7.24259C25.9691 5.74651 24.8484 3.86867 23.6759 2.78531C22.3788 1.57812 20.7185 0.71143 19.0583 0.370941C18.0829 0.174904 16.267 0.164587 15.3539 0.360624ZM18.996 1.29954C22.2958 2.04242 24.9314 4.68378 25.6578 7.96484C25.72 8.22278 25.6578 8.27437 24.2881 9.00693C20.3242 11.153 16.4123 12.8245 11.4834 14.496L9.84392 15.0532L9.57413 14.5889C7.92425 11.8031 8.06952 7.85134 9.91655 5.08617C11.141 3.24961 13.0399 1.89798 15.1567 1.34081C16.1321 1.09319 17.9688 1.07255 18.996 1.29954ZM25.8653 9.39901C25.9795 9.96649 25.938 10.6887 25.7304 11.7411C25.3465 13.7222 24.4749 15.2801 22.9391 16.735C21.9845 17.6326 20.6148 18.4683 20.0856 18.4683C19.9403 18.4683 19.8054 18.5096 19.7847 18.5715C19.7224 18.7572 18.3319 18.9842 17.2632 18.9842C16.1944 18.9842 14.8039 18.7572 14.7416 18.5715C14.7209 18.5096 14.5756 18.4683 14.4304 18.4683C13.7559 18.4683 12.189 17.5191 11.058 16.4254C10.1345 15.5278 10.1033 15.6103 11.5042 15.1667C15.0218 14.0214 19.878 11.9991 23.8004 10.0284C24.8277 9.5125 25.6993 9.08948 25.7304 9.08948C25.7719 9.07916 25.8238 9.22361 25.8653 9.39901Z"
                      fill="#0741AD"
                    />
                  </svg>
                </AssetImageWrapper>
              </OutWrapper>
              <Title>Fortis Oeconomia FOT Airdrop</Title>
            </div>
            <SubTitle1>Snapshot date: 15 December 2021</SubTitle1>
            <SubTitle2>Minimum Staked Juno to any Validator: 0.1 Juno</SubTitle2>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', padding: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '36px',
                  flex: '1',
                  maxWidth: '881px',
                }}
              >
                {defaultValues.map(d => (
                  <div
                    key={d + 'fot'}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <MainLabel>{d.title}</MainLabel>
                    <SecondaryLabel>({d.percent}% FOT)</SecondaryLabel>
                    <ClaimButton
                      onClick={handleSubmit}
                      disabled={d.claimed == 1 || d.id != monetaLatestStage}
                      className={`default-btn secondary-btn outlined`}
                      defaultChecked={d.claimed == 1}
                    >
                      {d.claimed == 1 ? <img src="/images/check.png" /> : 'Claim'}
                    </ClaimButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      ) : (
        <NonEligible>
          <SubTitle1>Sorry, You are not eligible to this airdrop</SubTitle1>
          <SubTitle1 style={{ fontWeight: '500' }}>
            This reward will be available to those who staked Juno at the time of Juno Moneta upgrade (December 15)
          </SubTitle1>
        </NonEligible>
      )}
    </>
  )
}

export default CreateWork
