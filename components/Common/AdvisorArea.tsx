
const AdvisorArea = ({ bgColor }: { bgColor?: string }) => {
  return (
    <>
      <div className={`advisor-area pt-100 pb-70 ${bgColor}`}>
        <div className='container'>
          <div className='section-title'>
            <h2>Our Advisors</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
          <div className='row justify-content-center'>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-advisor-box'>
                <div className='image'>
                  <img src='/images/advisor/advisor-img1.jpg' alt='image' />
                </div>
                <div className='content'>
                  <h3>Alika Maya</h3>
                  <span>CEO Capital Limited</span>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-advisor-box'>
                <div className='image'>
                  <img src='/images/advisor/advisor-img2.jpg' alt='image' />
                </div>
                <div className='content'>
                  <h3>Jason Smith</h3>
                  <span>Cryptonet Team Lead</span>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-advisor-box'>
                <div className='image'>
                  <img src='/images/advisor/advisor-img3.jpg' alt='image' />
                </div>
                <div className='content'>
                  <h3>Ruby Taylor</h3>
                  <span>Trade Management</span>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-sm-6 col-md-6'>
              <div className='single-advisor-box'>
                <div className='image'>
                  <img src='/images/advisor/advisor-img4.jpg' alt='image' />
                </div>
                <div className='content'>
                  <h3>Eva Anderson</h3>
                  <span>Market Analysis Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvisorArea;
