import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components'
import { useSigningClient } from "../../contexts/cosmwasm";
import { useEffect, useState } from 'react'

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';

//styled components
const Wrapper = styled.div`
  background: ${props => props.slot==='/gFOTmodule' ? 'white' : props.slot==='/'? 'unset' : 'linear-gradient(180deg, #8394DD 0%, #FFFFFF 100%)'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Background = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${props => props.slot});
  background-size: cover;
  background-repeat: no-repeat;
`

const Layout = ({ children }) => {
  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    loading,
    getBalances,
    nativeBalance,
  } = useSigningClient();
  const router = useRouter();
  const { pathname } = router;
  const [index, setIndex] = useState(0)
  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false);
    } else {
      disconnect();
    }
  };

  useEffect(() => {
    let account = localStorage.getItem("address");
    if (account != null) {
      connectWallet(true);
    }
    let interval = null;
    interval = setInterval(() => {
      setIndex(index => index + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) return;
    getBalances();
  }, [walletAddress, signingClient]);
  return (
    <Wrapper slot={pathname}>
      {pathname === '/' && <Background slot={`../images/HomePageBackground/${index%4 + 1}.png`}></Background>}
      <Head>
        <title>Fortis Oeconomia</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta
          name='description'
          content='Ribnic - Muli-Niche eCommerce React Template'
        />
        <meta
          name='og:title'
          property='og:title'
          content='Ribnic - Muli-Niche eCommerce React Template'
        ></meta>
        <meta
          name='twitter:card'
          content='Ribnic - Muli-Niche eCommerce React Template'
        ></meta>
        <link rel='canonical' href='https://novis-react.envytheme.com'></link>
      </Head>

      {/* {pathname === '/' ? <TopHeader /> : ''} */}
      {pathname !== '/' && <Navbar />}
      
      {/* <button className={`default-btn wallet-btn ${pathname==='/gFOTmodule'?'secondary-btn':''}`}>
        <img src="../images/wallet.png" />
      </button> */}
      {children}

      {/* <Footer /> */}
    </Wrapper>
  );
};

export default Layout;
