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
  max-width: 1368px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  width: 100%;
  gap: 125px;
`

const LeftPart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;
  margin-top: -50px;
`

const RightPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 100%;
  margin-top: -50px;
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