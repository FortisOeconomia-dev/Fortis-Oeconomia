
const AppDownload = () => {
  return (
    <>
      <div className='app-download-area bg-f9f9f9'>
        <div className='container'>
          <div className='row align-items-center m-0'>
            <div className='col-lg-6 col-md-12 p-0'>
              <div className='app-download-image'>
                <img src='/images/app.png' alt='image' />
              </div>
            </div>
            <div className='col-lg-6 col-md-12 p-0'>
              <div className='app-download-content'>
                <h2>Trade On The Mobile App</h2>
                <p>
                  Mobile Keplr is also available
                </p>
                <div className='btn-box'>
                  <a href="https://play.google.com/store/apps/details?id=com.chainapsis.keplr" className='playstore-btn' target='_blank'>
                    <img src='/images/play-store.png' alt='image' />
                    Get It On
                    <span>Google Play</span>
                  </a>
                  <a href="https://apps.apple.com/us/app/keplr-wallet/id1567851089" className='applestore-btn' target='_blank'>
                    <img src='/images/apple-store.png' alt='image' />
                    Download on the
                    <span>Apple Store</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDownload;
