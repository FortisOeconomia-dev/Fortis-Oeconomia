const Features = () => {
  return (
    <>
      <div className='features-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>The Global Leader of Social Workshop</h2>
            <p>
              This is workshop for scheduling various works by staking.
            </p>
          </div>
          <div className='row align-items-center justify-content-center'>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='features-box'>
                <div className='icon'>
                  <img src='/images/icon/icon3.png' alt='image' />
                </div>
                <h3>Easy to Create</h3>
                <p>
                  The client who wants to creat job can stake his token for creating.
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='features-box'>
                <div className='icon bg-ffefc7'>
                  <img src='/images/icon/icon11.png' alt='image' />
                </div>
                <h3>Easy to Stake</h3>
                <p>
                  Users can stake his favorite works very easily.
                </p>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-6'>
              <div className='features-box'>
                <div className='icon bg-ffc9c2'>
                  <img src='/images/icon/icon8.png' alt='image' />
                </div>
                <h3>Secure and Regulated</h3>
                <p>
                  Creating work and staking is truely secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
