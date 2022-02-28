import React from 'react';

const Funfact = ({ pt100 }: { pt100?: string }) => {
  return (
    <>
      <div className={`funfacts-area ${pt100}`}>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon8.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Secured by Escrow</h3>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon9.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>2.7 Million Happy Users</h3>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon10.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Thousands of Trusted Offers</h3>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6 col-6'>
              <div className='single-funfacts-box'>
                <div className='icon'>
                  <img src='/images/icon-bg.png' alt='image' />
                  <img
                    src='/images/icon/icon11.png'
                    className='main-icon'
                    alt='image'
                  />
                </div>
                <h3>Billions in Global Volume</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funfact;
