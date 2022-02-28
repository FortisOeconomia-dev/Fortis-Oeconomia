
const AccountCreate = ({title}:{title:string}) => {
  return (
    <>
      <div className='account-create-process-area ptb-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xl-8 col-lg-9 col-md-12'>
              <div className='account-create-process-content'>
                <div className='section-title'>
                  <h2>{title}</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.
                  </p>
                </div>
                <div className='row justify-content-center'>
                  <div className='col-lg-4 col-sm-6 col-md-6'>
                    <div className='single-process-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon1.png' alt='image' />
                      </div>
                      <h3>Create Account</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-6 col-md-6'>
                    <div className='single-process-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon2.png' alt='image' />
                      </div>
                      <h3>Link Your Bank Account</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                  <div className='col-lg-4 col-sm-6 col-md-6'>
                    <div className='single-process-box'>
                      <div className='icon'>
                        <img src='/images/icon/icon3.png' alt='image' />
                      </div>
                      <h3>Start Buying & Selling</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-lg-3 col-md-12'>
              <div className='account-create-process-image text-center'>
                <img src='/images/convert-currency.png' alt='image' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCreate;
