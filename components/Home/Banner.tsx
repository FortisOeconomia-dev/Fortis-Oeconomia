const Banner = () => {
  return (
    <>
      <div className='banner-wrapper-area'>
        <div className='container'>
          <div className='row align-items-center m-0'>
            <div className='col-xl-5 col-lg-6 col-md-12 p-0'>
              <div className='banner-wrapper-content'>
                <span className='sub-title'>
                  Doodle workshop subtitle
                </span>
                <h1>A Trusted and Secure Cryptocurrency Staking for Work scheduling</h1>
                <p>
                  This is the workshop anyone can connect and stake for their favorite works. 
                </p>
              </div>
            </div>
            <div className='col-xl-7 col-lg-6 col-md-12 p-0'>
              <div className='banner-wrapper-image'>
                <img src='/images/confirm-order.jpg' alt='image' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
