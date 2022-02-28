
const OurFeature = ({title}:{title?:string}) => {
  return (
    <>
      <div className='features-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>{title}</h2>
            <p>
            The Global Leader of Social Workshop
            </p>
          </div>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='single-features-box'>
                <img src='/images/features/features-img1.png' alt='image' />
                <h3>Security First</h3>
                <p>
                Creating work and staking is truely secure.
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='single-features-box'>
                <img src='/images/features/features-img2.png' alt='image' />
                <h3>Fast Withdrawals</h3>
                <p>
                  Everyone can refund their staked tokens quickly if the works are not ready.
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='single-features-box'>
                <img src='/images/features/features-img3.png' alt='image' />
                <h3>24/7 Support</h3>
                <p>
                  Works and staking is opened all day long.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurFeature;
