import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import styled from "styled-components"

import { useSigningClient } from "../contexts/cosmwasm";
import { fromBase64, toBase64 } from "@cosmjs/encoding";
import {
  convertMicroDenomToDenom,
  convertDenomToMicroDenom,
  convertMicroDenomToDenom2,
  convertDenomToMicroDenom2,
  convertFromMicroDenom
} from '../util/conversion'

import Converter from '../components/Converter'
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
  flex: 1;
  max-width: 100%;
`

const defaultValues = [
  {
    key: 'FOT Supply',
    value: '100.000.000'
  },
  {
    key: 'Burned FOT',
    value: '0'
  },
  {
    key: 'bFOT Supply',
    value: '0'
  }
]

const burnmodule = () => {
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
    fotBurnContractInfo,
    fotBurnAmount,
    expectedBfotAmount,

    handleFotChange,
    executeFotBurn
  } = useSigningClient();

  

  const handleSubmit = async (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error("Please connect wallet first");
      return;
    }

    if (Number(fotBurnAmount) == 0) {
      NotificationManager.error("Please input the FOT amount first");
      return;
    }
    if (Number(fotBurnAmount) > Number(fotBalance)) {
      NotificationManager.error("Please input correct FOT amount");
      return;
    }

    event.preventDefault();
    executeFotBurn();
  };

  const onFotBurnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event
    handleFotChange(Number(value))
  }

  const handleFotBurnPlus = () => {
    if (Number(fotBurnAmount) >= Number(fotBalance))
      return

    handleFotChange((Number(fotBurnAmount) + 1))
  }
  const handleFotBurnMinus = () => {
    if (Number(fotBurnAmount) == 1)
      return
    handleFotChange((Number(fotBurnAmount) - 1))
  }

  return (
    <>
      {/* <div style={{
        position: "relative",
        display: "flex",
        flexDirection: "row"
      }}>
        <div style={{ width: "50%" }}>
          <div className="container">
            <div className="currencyt-box" style={{
              height: "700px",
              width: "600px",
              background: "transparent",
              boxShadow: "none"
            }}>
              <div className="currencyt-selection" style={{ width: "453px" }}>
                <label className="wallet-title"
                  style={{
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "32px",
                    lineHeight: "48px",
                    marginBottom: "32px",
                    marginTop:"30px"
                  }}
                >
                  FOT
                </label>
                <label className="wallet-label" style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  width: "453px", height: "79px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "row"
                }}>
                  <button className="fa fa-minus" style={{
                    width: "fit-content",
                    height: "48px", border: "2px solid #00000",
                    background: "transparent",
                    boxShadow: "none",
                    color: "#080451",
                    marginLeft: "16px",
                    marginTop: "16px",
                    marginBottom: "15px"
                  }}
                    onClick={handleFotBurnMinus}
                  />
                  <input type="number" style={{
                    color: "#080451",
                    marginLeft: "auto",
                    marginRight: "auto",
                    background: "transparent",
                    border: "none",
                    textAlign: "center"
                  }}
                    value={fotBurnAmount}
                    onChange={onFotBurnChange}
                    step="1"
                    min="1"
                  />

                  <button className="fa fa-plus" style={{
                    width: "fit-content",
                    height: "48px",
                    border: "2px solid #00000",
                    background: "transparent",
                    boxShadow: "none",
                    color: "#080451",
                    marginRight: "16px",
                    marginTop: "16px",
                    marginBottom: "15px"
                  }}
                    onClick={handleFotBurnPlus}
                  />
                </label>
                {walletAddress.length == 0 ? <></> :
                  <div className='banner-wrapper-content' style={{height:"fit-content",textAlign:"right"}}>
                    <span className="sub-title ms-2" style={{ background: "#83B8DD",marginTop:"10px" }}>
                     Balance {fotBalance}
                    </span>
                  </div>
                }
                <div><img src="../images/fire.png" style={{ marginBottom: "57.79" }}></img></div>
                <label className="wallet-title"
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
                <label className="wallet-label" style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  width: "453px", height: "79px",
                  borderRadius: "20px",
                  display: "flex"
                }}>
                  <span style={{
                    color: "#080451",
                    marginLeft: "auto",
                    marginRight: "auto"
                  }}>{expectedBfotAmount}</span>
                </label>
                {walletAddress.length == 0 ? <></> :
                  <div className='banner-wrapper-content' style={{height:"fit-content",textAlign:"right"}}>
                    <span className="sub-title ms-2" style={{ background: "#A8A4F7",marginTop:"10px"}}>
                      Balance { bfotBalance}
                    </span>
                  </div>
                }
                <button onClick={handleSubmit}
                >Burn</button>
              </div>


            </div>
          </div>


        </div>
        <div style={{ width: "50%" }}>
          <div className="currencyt-box" style={{
            height: "631px",
            marginTop: "50px",
            marginLeft: "100px",
            width: "621px"
          }}>
            <div className="currencyt-selection" style={{}}>
              {/* <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{display:"block", fontSize: "27px", marginLeft: "20px", width: "486px",color:"black",paddingBottom:"89px" }}>
                  My FOT Amount
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> {fotBalanceStr}
                  </span>
                </label>
              </div> */}
              {/* <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{
                  display: "block",
                  fontSize: "27px",
                  marginLeft: "20px",
                  width: "486px",
                  color: "black",
                  paddingBottom: "89px"
                }}>
                  Current FOT Supply
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> {convertMicroDenomToDenom2(fotTokenInfo.total_supply, fotTokenInfo.decimals)}
                  </span>
                </label>
              </div>
              <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{
                  marginTop: "89px",
                  display: "block",
                  fontSize: "27px",
                  marginLeft: "20px",
                  width: "486px",
                  color: "black",
                  paddingBottom: "89px"
                }}>
                  Total Burned FOT
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> {convertMicroDenomToDenom2(fotBurnContractInfo.fot_burn_amount, bfotTokenInfo.decimals)}
                  </span>
                </label>
              </div>
              <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{
                  marginTop: "89px",
                  fontSize: "27px",
                  marginLeft: "20px",
                  width: "486px",
                  color: "black",
                  borderBottom: "none"
                }}>
                  Current bFOT Supply
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> {convertMicroDenomToDenom2(fotBurnContractInfo.bfot_sent_amount, bfotTokenInfo.decimals)}
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
            handleBurnMinus={handleFotBurnMinus} 
            burnAmount={fotBurnAmount}
            onBurnChange={onFotBurnChange}
            handleBurnPlus={handleFotBurnPlus}
            convImg='/images/fire.png' 
            from='FOT' 
            to='bFOT' 
            expectedAmount={expectedBfotAmount}
            handleSubmit={handleSubmit}
          />
        </LeftPart>
        <RightPart>
          <StatisticBox values={defaultValues} />
        </RightPart>
      </Wrapper>
    </>
  )
}

export default burnmodule