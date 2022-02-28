import Link from 'next/link';

interface RegisterProps {
  bgGradient?: string;
  blackText?: string;
  ctaImage?: string;
}

const RegisterArea: React.FC<RegisterProps> = ({
  bgGradient,
  blackText,
  ctaImage,
}) => {
  return (
    <>
      <div className={`cta-area pt-100 ${bgGradient}`}>
        <div className='container'>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-6 col-md-12'>
              <div className={`cta-content ${blackText}`}>
                <h2>Start Workshop on Juno</h2>
                <p>
                  Please use this site for doodle.
                  This requires CREW coins on Juno and Keplr wallet.
                </p>
                <Link href='https://keplr.app/'>
                  <a className='default-btn'>
                    <i className='bx bxs-error'></i> Install Keplr wallet
                  </a>
                </Link>
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='cta-image'>
                <img src={ctaImage} alt='image' />
              </div>
            </div>
          </div>
        </div>
        <div className='shape6'>
          <img src='/images/shape/shape6.png' alt='image' />
        </div>
        <div className='shape7'>
          <img src='/images/shape/shape7.png' alt='image' />
        </div>
        <div className='shape8'>
          <img src='/images/shape/shape8.png' alt='image' />
        </div>
        <div className='shape9'>
          <img src='/images/shape/shape9.png' alt='image' />
        </div>
        <div className='shape15'>
          <img src='/images/shape/shape15.png' alt='image' />
        </div>
      </div>
    </>
  );
};

export default RegisterArea;
