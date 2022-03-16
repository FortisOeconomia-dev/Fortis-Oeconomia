import Navbar from "../components/Layout/Navbar";
import Timer from "../components/Shared/timergfot";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useSigningClient } from "../contexts/cosmwasm";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertMicroDenomToDenom2,
  convertDenomToMicroDenom2,
  convertFromMicroDenom
} from '../util/conversion'

import styled from 'styled-components'
//components
import Converter from '../components/Converter'
import StakeNClaim from '../components/StakeNClaim'
import StatisticBox from '../components/StatisticBox'

//styled components
const Wrapper = styled.div`
  max-width: 1312px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  width: 100%;
  margin: 44px;
  padding: 0 20px;
  gap: 50px;
`
const LeftPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 2;
  max-width: 100%;
`

const defaultValues = [
  {
    key: 'bFOT Supply',
    value: '100.000.000'
  },
  {
    key: 'Burned bFOT',
    value: '0'
  },
  {
    key: 'gFOT Supply',
    value: '0'
  }
]

const gfotmodule = () => {
  const {
    walletAddress,
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
    fotTokenInfo,
    bfotBalance,
    bfotBalanceStr,
    bfotTokenInfo,
    gfotBalance,
    gfotBalanceStr,
    gfotTokenInfo,

    bfotBurnContractInfo,
    bfotBurnAmount,
    expectedGfotAmount,

    handlebFotChange,
    executebFotBurn,

    gfotStakingContractInfo,
    gfotStakingAmount,
    setgFotStakingAmount,
    gfotStakingApy,
    gfotStakingMyStaked,
    gfotStakingMyReward,
    handlegFotStakingChange,
    executegFotStaking,
    executegFotClaimReward,
    executegFotUnstake
  } = useSigningClient();

  const handlebFotBurn = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    if (Number(bfotBurnAmount) == 0) {
      NotificationManager.error("Please input the BFOT amount first");
      return;
    }
    if (Number(bfotBurnAmount) > Number(bfotBalance)) {
      NotificationManager.error("Please input correct FOT amount");
      return;
    }

    event.preventDefault();
    executebFotBurn();
  };

  const onbFotBurnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event
    handlebFotChange(Number(value))
  }

  const handlebFotBurnPlus = () => {
    if (Number(bfotBurnAmount) >= Number(bfotBalance))
      return

    handlebFotChange((Number(bfotBurnAmount) + 1))
  }
  const handlebFotBurnMinus = () => {
    if (Number(bfotBurnAmount) <= 1)
      return
    handlebFotChange((Number(bfotBurnAmount) - 1))
  }

  const handlegFotStaking = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    if (Number(gfotStakingAmount) == 0) {
      NotificationManager.error("Please input the GFOT amount first");
      return;
    }
    if (Number(gfotStakingAmount) > Number(gfotBalance)) {
      NotificationManager.error("Please input correct GFOT amount");
      return;
    }

    event.preventDefault();
    executegFotStaking();
  };

  const handlegFotStakingUnstake = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    event.preventDefault();
    executegFotUnstake();
  };

  const handlegFotStakingClaimReward = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    event.preventDefault();
    executegFotClaimReward();
  };

  const ongFotStakingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event
    handlegFotStakingChange(Number(value))
  }

  const handlegFotStakingPlus = () => {
    if (Number(gfotStakingAmount) >= Number(gfotBalance))
      return

    handlegFotStakingChange((Number(gfotStakingAmount) + 1))
  }
  const handlegFotStakingMinus = () => {
    if (Number(gfotStakingAmount) <= 1)
      return
    handlegFotStakingChange((Number(gfotStakingAmount) - 1))
  }
 
  return (

    <>
        {/* <Timer/> */}
    {/* <div
      style={{ position: "relative", display: "flex", flexDirection: "row" }}
    >
      <div style={{ width: "50%" }}>
        <div className="container">
          <div
            className="currencyt-box"
            style={{
              height: "881px",
              width: "600px",
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <div className="currencyt-selection" style={{ width: "453px" }}>
              <label
                className="wallet-title"
                style={{
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "32px",
                  lineHeight: "48px",
                  marginBottom: "32px",
                }}
              >
                bFOT
              </label>
              <label
                className="wallet-label"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  width: "453px",
                  height: "79px",
                  borderRadius: "20px",
                  marginBottom: "58px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  className="fa fa-minus"
                  style={{
                    width: "fit-content",
                    height: "48px",
                    border: "2px solid #00000",
                    background: "transparent",
                    boxShadow: "none",
                    color: "#080451",
                    marginLeft: "16px",
                    marginTop: "16px",
                    marginBottom: "15px",
                  }}
                  onClick={handlebFotBurnMinus}
                />
                <input type="number" style={{
                    color: "#080451",
                    marginLeft: "auto",
                    marginRight: "auto",
                    background: "transparent",
                    border: "none",
                    textAlign: "center"
                  }}
                    value={bfotBurnAmount}
                    onChange={onbFotBurnChange}
                    step="1"
                    min="1"
                  />
                <button
                  className="fa fa-plus"
                  style={{
                    width: "fit-content",
                    height: "48px",
                    border: "2px solid #00000",
                    background: "transparent",
                    boxShadow: "none",
                    color: "#080451",
                    marginRight: "16px",
                    marginTop: "16px",
                    marginBottom: "15px",
                  }}
                  onClick={handlebFotBurnPlus}
                />
              </label>
              {walletAddress.length == 0 ? <></> :
                <div className='banner-wrapper-content' style={{height:"fit-content",textAlign:"right"}}>
                  <span className="sub-title ms-2" style={{ background: "#83B8DD",marginTop:"10px" }}>
                    Balance {bfotBalance}
                  </span>
                </div>
              }
              <div>
                <img
                  src="../images/gfotarrow.png"
                  style={{ marginBottom: "57.79" }}
                ></img>
              </div>
              <label
                className="wallet-title"
                style={{
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "32px",
                  lineHeight: "48px",
                  marginBottom: "32px",
                  marginTop:"50px"
                }}
              >
                gFOT
              </label>
              <label
                className="wallet-label"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  width: "453px",
                  height: "79px",
                  borderRadius: "20px",
                  marginBottom: "72px",
                  display: "flex",
                }}
                
              >
                <span style={{
                    color: "#080451",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}>{expectedGfotAmount}</span>
                
              </label>
              {walletAddress.length == 0 ? <></> :
                <div className='banner-wrapper-content' style={{height:"fit-content",textAlign:"right"}}>
                  <span className="sub-title ms-2" style={{ background: "#83B8DD",marginTop:"10px" }}>
                    Balance {gfotBalance}
                  </span>
                </div>
              }
              <button onClick={handlebFotBurn}>Burn</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "50%" }}>
        <div
          className="currencyt-box"
          style={{
            height: "390px",
            width: "80%",
            marginTop: "15px",
            marginRight: "300px",
          }}
        >
          <div className="wallet-text" style={{ textAlign: "left" }}>
            <label
              className="wallet-label"
              style={{
                fontSize: "20px",
                marginLeft: "5px",
                marginBottom: "15px",
                width: "45%",
                borderBottom: "none",
                color: "#030f49",
                marginTop: "3px",
              }}
            >
              Total Staked gFOT
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                }}
              >
                {" "}
                {convertMicroDenomToDenom2(gfotStakingContractInfo.gfot_amount, gfotTokenInfo.decimals)}
              </span>
            </label>
            <label
              className="wallet-label"
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginLeft: "6px",
                marginBottom: "15px",
                width: "45%",
                borderBottom: "none",
                color: "#030f49",
              }}
            >
              APY
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                }}
              >
                {" "}
                {(gfotStakingApy / 10000000000.0).toFixed(10)} %
              </span>
            </label>
          </div>
          <label
            className="wallet-label"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              width: "30%",
              opacity: "0,2",
              height: "50px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
            }}
          >
            <button
              className="fa fa-minus"
              style={{
                width: "fit-content",
                height: "48px",
                border: "2px solid #00000",
                background: "transparent",
                boxShadow: "none",
                color: "#080451",
                marginLeft: "16px",
                marginTop: "16px",
                marginBottom: "15px",
              }}
              onClick={handlegFotStakingMinus}
            />
            <span
              style={{
                color: "#080451",
                marginLeft: "auto",
                marginTop: "15px",
                marginRight: "auto",
              }}
            >
              <input type="number" style={{
                  color: "#080451",
                  marginLeft: "auto",
                  marginRight: "auto",
                  background: "transparent",
                  border: "none",
                  textAlign: "center"
                }}
                value={gfotStakingAmount}
                onChange={ongFotStakingChange}
                step="1"
                min="1"
              />
            </span>
            <button
              className="fa fa-plus"
              style={{
                width: "fit-content",
                height: "48px",
                border: "2px solid #00000",
                background: "transparent",
                boxShadow: "none",
                color: "#080451",
                marginRight: "16px",
                marginTop: "16px",
                marginBottom: "15px",
              }}
              onClick={handlegFotStakingPlus}
            />
          </label>
          <button
            style={{
              width: "30%",
              height: "5px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
            }}
            onClick={handlegFotStaking}
          >
            Stake
          </button>

          <div
            style={{
              borderLeft: "2px solid #030f49",
              height: "330px",
              width: "2px",
              position: "absolute",
              left: "390px",
              top: "30px"
            }}
          ></div>

          <div
            className="wallet-text"
            style={{
              textAlign: "left",
              position: "absolute",
              left: "430px",
              top: "25px",
            }}
          >
            <label
              className="wallet-label"
              style={{
                fontSize: "20px",
                marginLeft: "4px",
                marginBottom: "15px",
                width: "100%",
                borderBottom: "none",
                color: "#030f49",
                marginTop: "3px",
              }}
            >
              My Staked gFOT
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                  marginLeft: "100px",
                }}
              >
                {" "}
                {convertMicroDenomToDenom2(gfotStakingMyStaked, gfotTokenInfo.decimals)}
              </span>
            </label>
          </div>

          <button
            style={{
              position: "absolute",
              left: "460px",
              top: "50px",
              width: "30%",
              height: "5px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
            }}
            onClick={handlegFotStakingUnstake}
          >
            Unstake
          </button>

          <div
            className="wallet-text"
            style={{
              textAlign: "left",
              position: "absolute",
              left: "430px",
              top: "225px",
            }}
          >
            <label
              className="wallet-label"
              style={{
                fontSize: "20px",
                marginLeft: "4px",
                marginBottom: "15px",
                width: "100%",
                borderBottom: "none",
                color: "#030f49",
                marginTop: "3px",
              }}
            >
              My Rewards
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                  marginLeft: "100px",
                }}
              >
                {" "}
                {convertMicroDenomToDenom2(gfotStakingMyReward, fotTokenInfo.decimals)}
              </span>
            </label>
          </div>

          <button
            style={{
              position: "absolute",
              left: "460px",
              top: "250px",
              width: "30%",
              height: "5px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
            }}
            onClick={handlegFotStakingClaimReward}
          >
            Claim
          </button>
        </div>

        <div
          className="currencyt-box"
          style={{
            height: "370px",
            width: "80%",
            marginTop: "50px",
            marginRight: "300px",
          }}
        >
          <div className="currencyt-selection" style={{}}>
            <div className="wallet-text" style={{ textAlign: "left" }}>
              <label className="wallet-label">
                Current bFOT Supply
                <span className="wallet-span">
                  {convertMicroDenomToDenom2(bfotTokenInfo.total_supply, bfotTokenInfo.decimals)}
                </span>
              </label>
            </div>
            <div className="wallet-text" style={{ textAlign: "left" }}>
              <label className="wallet-label">
                Total Burned bFOT
                <span className="wallet-span">
                  {convertMicroDenomToDenom2(bfotBurnContractInfo.bfot_burn_amount, bfotTokenInfo.decimals)}  
                </span>
              </label>
            </div>
            <div className="wallet-text" style={{ textAlign: "left" }}>
              <label className="wallet-label">
               gFOT Supply
                <span className="wallet-span">
                {convertMicroDenomToDenom2(gfotTokenInfo.total_supply, gfotTokenInfo.decimals)}  
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    <Wrapper>
      <LeftPart>
        <Converter 
          handleBurnMinus={handlebFotBurnMinus} 
          burnAmount={bfotBurnAmount}
          onBurnChange={onbFotBurnChange}
          handleBurnPlus={handlebFotBurnPlus}
          expectedAmount={expectedGfotAmount}
          convImg='/images/gfotarrow.png' 
          from='bFOT' 
          to='gFOT'
          handleSubmit={handlebFotBurn}
        />
      </LeftPart>
      <RightPart>
        <StakeNClaim
          handleBurnMinus={handlegFotStakingMinus} 
          onBurnChange={ongFotStakingChange}
          handleBurnPlus={handlegFotStakingPlus}
          handleFotStaking={handlegFotStaking}
          handleFotStakingUnstake={handlegFotStakingUnstake}
          handleFotStakingClaimReward={handlegFotStakingClaimReward}
        />
        <StatisticBox values={defaultValues} />
      </RightPart>
    </Wrapper>
    </>
  );
};

export default gfotmodule;
