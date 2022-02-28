import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useSigningClient } from '../contexts/cosmwasm'

const Admin = () => {

  const { 
    walletAddress, 
    connectWallet, 
    signingClient, 
    disconnect, 
    loading,
    getIsAdmin,
    isAdmin,
    getManagerConstants,
    setManagerConstants,
    setManagerAddr,
    setMinStake,
    setRateClient,
    setRateManager,
    managerAddr,
    minStake,
    rateClient,
    rateManager
  } = useSigningClient()


  useEffect(() => {
    if (!signingClient || walletAddress.length === 0 || !isAdmin) return
    getManagerConstants()
  }, [signingClient, walletAddress, isAdmin, ])



  const handleSubmit = (event: MouseEvent<HTMLElement>) => {
    if (!signingClient || walletAddress.length === 0) {
      NotificationManager.error('Please connect wallet first')  
      return
    }
    
    if (!isAdmin) {
      NotificationManager.error('You are not manager')  
      return
    }
    
    if (managerAddr == '') {
      NotificationManager.error('Please input the manager address')  
      return
    }
    event.preventDefault()

    setManagerConstants()
  }

  return (
    <>
      <div className='trade-cryptocurrency-area ptb-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-4 col-md-12'>
              <div className='trade-cryptocurrency-content'>
                <h1>
                  <span>Administration</span>
                </h1>
                <p>
                  Set manager parameters
                </p>
                
              </div>
            </div>
            <div className='col-lg-8 col-md-12'>
              <div className='trade-cryptocurrency-box'>
                <div className='currency-selection'>
                <span>Manager address to Chanage</span>
                  <TextField fullWidth id="standard-basic"  variant="standard" 
                  value={managerAddr}
                  error={managerAddr==''}
                  onChange={(e) => setManagerAddr(e.target.value)}
                  />
                </div>

                <div className='currency-selection'>
                  <span>Minimum Stake Amount for One Work(CREW)</span>
                  <TextField fullWidth type="number" 
                    variant="standard" 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:10, max:1000 }} 
                  value={minStake}
                  onChange={(e) => setMinStake(Number(e.target.value))}
                  />
                </div>
                
                <div className='currency-selection'>
                  <span>Client Stake Rate for One Work(%)</span>
                  <TextField fullWidth type="number" 
                    variant="standard" 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:1, max:30 }} 
                  value={rateClient}
                  onChange={(e) => setRateClient(Number(e.target.value))}
                  />
                </div>

                <div className='currency-selection'>
                  <span>Manager Earn Rate for Work(%)</span>
                  <TextField fullWidth type="number" 
                    variant="standard" 
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min:1, max:30 }} 
                  value={rateManager}
                  onChange={(e) => setRateManager(Number(e.target.value))}
                  />
                </div>

                <button type='submit'
                onClick={handleSubmit}
                >
                  <i className='bx bxs-hand-right'></i> Set Manager Params
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='lines'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </>
  );
};

export default Admin;
