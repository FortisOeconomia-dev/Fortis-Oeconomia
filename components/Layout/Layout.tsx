import Head from 'next/head';
import React, { useState, createContext, useContext, useEffect } from 'react';
import styled from 'styled-components'
import { useRouter } from 'next/router';
import RateShow from "../../components/RateShow";
import { useSigningClient } from "../../contexts/cosmwasm";

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';

//styled components
// background: ${props => props.slot==='/gFOTmodule' ? 'white' : `linear-gradient(180deg, ${props.defaultChecked ? '#1e2e71' : '#8394DD'} 0%, ${props.defaultChecked ? '#181a1b' : '#FFFFFF'} 100%)`};
const Wrapper = styled.div`
  background: ${props => !props.defaultChecked && props.slot==='/gFOTmodule' ? 'white' : `linear-gradient(180deg, #8394DD 0%, #FFFFFF 100%)`};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: ${props => !props.defaultChecked && props.slot==='/sFOTmodule' && 'hue-rotate(240deg)'};
`

export const ToggleContext = createContext(false)

const Layout = ({ children }) => {
  const {
    bFot2Juno,
    getBalances,
    Juno2bFot,
    poolDpr
  } = useSigningClient();
  const [seconds, setSeconds] = useState(0)
  const [rateShow, setRateShow] = useState([])
  useEffect(() => {
    let interval = null;
    if (seconds === 0) {
      getBalances()
    }
    interval = setInterval(() => {
      setSeconds(seconds => (seconds + 1) % 10);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds])
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    let temp = localStorage.getItem('toggle')
    if (temp) {
      setToggle(JSON.parse(temp))
    }
  }, [])
  const router = useRouter();
  const { pathname } = router;
  
  useEffect(() => {
    if(pathname === '/gFOTmodule') {
      const values = [
        {
          fromAmount: '',
          toAmount: poolDpr,
          fromPer: 'DPR',
          toPer: '%'
        },
        {
          fromAmount: '1',
          toAmount: bFot2Juno,
          fromPer: 'bFOT',
          toPer: 'Juno'
        },
        {
          fromAmount: '1',
          toAmount: Juno2bFot,
          fromPer: 'Juno',
          toPer: 'bFot'
        }
      ]
      setRateShow([...values])
    }
  }, [pathname,bFot2Juno, Juno2bFot, poolDpr])
  return (
    <ToggleContext.Provider value={toggle}>
      {rateShow.length > 0 ? <RateShow values={rateShow} action={() => {
        window.location.href = "https://www.junoswap.com/pools";
      }} /> : <></>}
      <Wrapper defaultChecked={toggle} slot={pathname} style={{filter: toggle && 'drop-shadow(16px 16px 20px) invert(90) hue-rotate(170deg) saturate(200%) contrast(100%) brightness(90%)'}}>
        {/* {pathname === '/' && <Background slot={`../images/HomePageBackground/${index%4 + 1}.png`}></Background>} */}
        <Head>
          <title>Fortis Oeconomia</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <meta
            name='description'
            content='Innovative Financial Toolkit'
          />
          <meta
            name='og:title'
            property='og:title'
            content='Innovative Financial Toolkit'
          ></meta>
          <meta
            name='twitter:card'
            content='Innovative Financial Toolkit'
          ></meta>
          {/* <link rel='canonical' href='https://novis-react.envytheme.com'></link> */}
        </Head>

        {/* {pathname === '/' ? <TopHeader /> : ''} */}
        {<Navbar toggle={toggle} setToggle={(toggle) => {
            localStorage.setItem('toggle', toggle.toString())
            setToggle(toggle)
          }} 
        />}
        
        {/* <button className={`default-btn wallet-btn ${pathname==='/gFOTmodule'?'secondary-btn':''}`}>
          <img src="../images/wallet.png" />
        </button> */}
        {children}

        {/* <Footer /> */}
      </Wrapper>
    </ToggleContext.Provider>
  );
};

export default Layout;
