import Banner from '../components/Home/Banner';
import OurFeature from '../components/Common/OurFeature';
import RegisterArea from '../components/Common/RegisterArea';

const Index = () => {
  return (
    <>
      <Banner />
      <OurFeature title="The Global Leader of Social Workshop"/>
     
      <RegisterArea
        bgGradient='bg-gradient-image'
        blackText='black-text'
        ctaImage='/images/wallet.png'
      />
    </>
  );
};

export default Index;
