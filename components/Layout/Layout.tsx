import Head from 'next/head';
import { useRouter } from 'next/router';

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div style={{
      background: pathname==='/gFOTmodule' ? 'white' : 'linear-gradient(97.62deg, #5F5BCD 0%, #A8A4F7 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
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
      <Navbar />
      <button className={`default-btn connect-btn ${pathname==='/gFOTmodule'?'secondary-btn':''}`}>
        Connect Wallet
      </button>
      <button className={`default-btn wallet-btn ${pathname==='/gFOTmodule'?'secondary-btn':''}`}>
        <img src="../images/wallet.png" />
      </button>
      {children}

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
