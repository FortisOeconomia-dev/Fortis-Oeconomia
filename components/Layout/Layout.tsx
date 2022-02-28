import Head from 'next/head';
import { useRouter } from 'next/router';

//top header
import TopHeader from './TopHeader';

//navbar
import Navbar from './Navbar';

//footer
import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <Head>
        <title>Doodle Workshop</title>
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
  
      {children}

      <Footer />
    </>
  );
};

export default Layout;
