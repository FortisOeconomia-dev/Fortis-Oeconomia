import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import * as NumericInput from "react-numeric-input";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface ApiData {
  image: string;
  name: string;
}
const Banner = () => {

  const [workTitle, setWorkTitle] = useState('')
  const [workDesc, setWorkDesc] = useState('')
  const [workUrl, setWorkUrl] = useState('')
  const [workAmount, setWorkAmount] = useState(0)


  const [clicked, setClicked] = useState<boolean | null | number>(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggleStateTwo, setToggleStateTwo] = useState(false);


  const toggleTabOne = () => {
    setToggleState(!toggleState);
  };

  const toggleTabTwo = () => {
    setToggleStateTwo(!toggleStateTwo);
  };

  const toggleSelected = (cat, index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleSelectedTwo = (cat, index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };


  return (
    <>
      <div className='trade-cryptocurrency-area ptb-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-12'>
              <div className='trade-cryptocurrency-content'>
                <h1>
                  <span>Create Work</span>
                </h1>
                <p>
                  Create any work you want on this site. Url is private until enough staked by accounts.
                </p>
                
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='trade-cryptocurrency-box'>
                <div className='currency-selection'>
                  <TextField fullWidth id="standard-basic" label="Work Title" variant="standard" 
                  value={workTitle}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  />
                </div>

                <div className='currency-selection'>
                  <TextField fullWidth id="standard-basic" label="Work Description" variant="standard" 
                  value={workDesc}
                  onChange={(e) => setWorkDesc(e.target.value)}
                  />
                </div>

                <div className='currency-selection'>
                  <TextField fullWidth id="standard-basic" label="Work Url" variant="standard" 
                  value={workUrl}
                  onChange={(e) => setWorkUrl(e.target.value)}
                  />
                </div>

                
                <div className='currency-selection'>
                  <span>Client Stake Amount</span>
                  <TextField fullWidth type="number" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                  value={workAmount}
                  onChange={(e) => setWorkAmount(Number(e.target.value))}
                  />
                </div>
                
                <div className='currency-selection'>
                  <span>Client Stake Amount: {workAmount / 10}</span>
                </div>

                

                <Link href='https://www.coinbase.com/accounts'>
                  <button type='submit'>
                    <i className='bx bxs-hand-right'></i> Create Work
                  </button>
                </Link>
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

export default Banner;
