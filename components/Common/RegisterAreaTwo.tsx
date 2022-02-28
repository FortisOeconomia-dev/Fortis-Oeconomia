import Link from 'next/link';

const RegisterAreaTwo = ({ title }: { title: string }) => {
  return (
    <>
      <div className='account-register-area ptb-100'>
        <div className='container'>
          <div className='account-register-content'>
            <h2>{title}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <Link href='https://www.coinbase.com/signup'>
              <a className='default-btn'>
                <i className='bx bxs-user'></i> Register Now
              </a>
            </Link>
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
        <div className='shape10'>
          <img src='/images/shape/shape10.png' alt='image' />
        </div>
      </div>
    </>
  );
};

export default RegisterAreaTwo;
