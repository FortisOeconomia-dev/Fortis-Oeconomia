import PageBanner from '../components/Common/PageBanner';

const Guides = () => {
  return (
    <>
      <PageBanner
        pageTitle='How to Buy Cryptocurrency'
        pageSubTitle='Novis is the easiest place to buy and sell cryptocurrency'
      />
      <div className='guides-area ptb-100'>
        <div className='container'>
          <div className='guides-content'>
            <div className='number'>1</div>
            <div className='row m-0'>
              <div className='col-lg-3 col-md-12 p-0'>
                <div className='box'>
                  <h3>Step 1</h3>
                  <span>Create a Novis Account</span>
                </div>
              </div>
              <div className='col-lg-9 col-md-12 p-0'>
                <div className='content'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco consectetur adipiscing.
                  </p>
                  <img src='/images/create-account.jpg' alt='image' />
                </div>
              </div>
            </div>
          </div>
          <div className='guides-content'>
            <div className='number'>2</div>
            <div className='row m-0'>
              <div className='col-lg-3 col-md-12 p-0'>
                <div className='box'>
                  <h3>Step 2</h3>
                  <span>Select a coin. Novis</span>
                </div>
              </div>
              <div className='col-lg-9 col-md-12 p-0'>
                <div className='content'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.
                  </p>
                  <img src='/images/select-coin.jpg' alt='image' />
                </div>
              </div>
            </div>
          </div>
          <div className='guides-content'>
            <div className='number'>3</div>
            <div className='row m-0'>
              <div className='col-lg-3 col-md-12 p-0'>
                <div className='box'>
                  <h3>Step 3</h3>
                  <span>Select Your Bank Account or Credit Card</span>
                </div>
              </div>
              <div className='col-lg-9 col-md-12 p-0'>
                <div className='content'>
                  <p>
                    <strong>Novis</strong> accepts the following payment
                    methods:
                  </p>
                  <ul>
                    <li>
                      Credit Card: <strong>Visa</strong>,{' '}
                      <strong>MasterCard</strong>, <strong>Discover</strong>,{' '}
                      <strong>American Express</strong>, <strong>JCB</strong>,{' '}
                      <strong>Visa Electron</strong>. The total will be charged
                      to your card when the order is shipped.
                    </li>
                    <li>
                      <strong>Novis</strong> features a Fast Checkout option,
                      allowing you to securely save your credit card details so
                      that you don't have to re-enter them for future purchases.
                    </li>
                    <li>
                      PayPal: Shop easily online without having to enter your
                      credit card details on the website.Your account will be
                      charged once the order is completed. To register for a
                      PayPal account, visit the website{' '}
                      <a href='#' target='_blank'>
                        paypal.com.
                      </a>
                    </li>
                  </ul>
                  <img src='/images/select-payment.jpg' alt='image' />
                </div>
              </div>
            </div>
          </div>
          <div className='guides-content'>
            <div className='number'>4</div>
            <div className='row m-0'>
              <div className='col-lg-3 col-md-12 p-0'>
                <div className='box'>
                  <h3>Step 4</h3>
                  <span>Select Your Preferred Payment Method</span>
                </div>
              </div>
              <div className='col-lg-9 col-md-12 p-0'>
                <div className='content'>
                  <p>
                    Items returned within 14 days of their original shipment
                    date in same as new condition will be eligible for a full
                    refund or store credit. Refunds will be charged back form of
                    payment used for purchase. Customer is responsible for
                    shipping charges when making returns and shipping/handling
                    fees of original purchase is non-refundable.
                  </p>
                  <img src='/images/payment-method.jpg' alt='image' />
                </div>
              </div>
            </div>
          </div>
          <div className='guides-content'>
            <div className='number'>5</div>
            <div className='row m-0'>
              <div className='col-lg-3 col-md-12 p-0'>
                <div className='box'>
                  <h3>Step 5</h3>
                  <span>Confirm and Check Your Order</span>
                </div>
              </div>
              <div className='col-lg-9 col-md-12 p-0'>
                <div className='content'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.
                  </p>
                  <img src='/images/confirm-order.jpg' alt='image' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guides;
