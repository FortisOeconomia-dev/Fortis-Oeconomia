import Link from 'next/link';
import PageBanner from '../components/Common/PageBanner';
import RegisterArea from '../components/Common/RegisterArea';
import AppDownload from '../components/Common/AppDownload';
import RegisterAreaTwo from '../components/Common/RegisterAreaTwo';


const Wallet = () => {
  return (
    <>
      <PageBanner
        pageTitle='Cryptocurrency Wallet'
        pageSubTitle='Keplr is the wallet for Juno'
      />
      <AppDownload />
      <RegisterArea ctaImage='/images/man.png' />
    </>
  );
};

export default Wallet;
