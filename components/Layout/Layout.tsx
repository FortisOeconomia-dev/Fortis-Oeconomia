import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components'

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';

//styled components
const Wrapper = styled.div`
  background: ${props => props.slot==='/gFOTmodule' ? 'white' : 'linear-gradient(180deg, #8394DD 0%, #FFFFFF 100%)'};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Wrapper slot={pathname}>
      {/* {pathname === '/' && <Background slot={`../images/HomePageBackground/${index%4 + 1}.png`}></Background>} */}
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
      {<Navbar />}
      
      {/* <button className={`default-btn wallet-btn ${pathname==='/gFOTmodule'?'secondary-btn':''}`}>
        <img src="../images/wallet.png" />
      </button> */}
      {children}

      {/* <Footer /> */}
    </Wrapper>
  );
};

export default Layout;
