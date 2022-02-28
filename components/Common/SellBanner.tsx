import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface ApiData {
  image: string;
  name: string;
}

const SellBanner = () => {
  const [name, setName] = useState('Bitcoin');
  const [nameTwo, setNameTwo] = useState('USD');

  //api data
  const [newData, setnewData] = useState<ApiData[]>([]);

  //converter hook
  const [conversionValue, setConversionValue] = useState('');
  const [coinSymbol, setcoinSymbol] = useState('BTC');
  const [cryptoQuantity, setcryptoQuantity] = useState<string | number>(1);

  const [image, setImage] = useState(
    '/images/cryptocurrency/cryptocurrency2.png'
  );
  const [imageTwo, setImageTwo] = useState(
    '/images/cryptocurrency/cryptocurrency1.png'
  );

  const [clicked, setClicked] = useState<boolean | null | number>(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggleStateTwo, setToggleStateTwo] = useState(false);

  const toggleTabOne = () => {
    setToggleState(!toggleState);
  };

  const toggleSelected = (cat, index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
    setName(cat.name);
    setImage(cat.image);
    setcoinSymbol(cat.symbol.toUpperCase());
  };

  useEffect(() => {
    const getCoins = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );
      setnewData(data);
    };
    getCoins();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${coinSymbol}&tsyms=USD`
      );

      setConversionValue(data.USD);
    };
    getData();
  }, [coinSymbol]);

  return (
    <>
      <div className='sell-cryptocurrency-area ptb-100'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-12'>
              <div className='sell-cryptocurrency-content'>
                <h1>
                  <span>Sell Bitcoin</span>
                  <span>BTC ($55,531.70)</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis egnostrud exercitation ullamco.
                </p>
                <a href='#' className='link-btn'>
                  <i className='fas fa-caret-right'></i> Read More About Bitcoin
                </a>
              </div>
            </div>
            <div className='col-lg-6 col-md-12'>
              <div className='sell-cryptocurrency-box'>
                <div className='currency-selection'>
                  <label>YOU SELL</label>
                  <input
                    type='text'
                    value={cryptoQuantity}
                    onChange={(e) => setcryptoQuantity(e.target.value)}
                  />
                  <div
                    className={toggleState ? 'dropdown show' : 'dropdown'}
                    onClick={() => toggleTabOne()}
                  >
                    <button
                      className='dropdown-toggle'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img src={image} alt='image' /> {name}
                      <span>
                        {toggleState ? (
                          <i className='bx bx-chevron-up'></i>
                        ) : (
                          <i className='bx bx-chevron-down'></i>
                        )}
                      </span>
                    </button>
                    <ul
                      className={
                        toggleState ? 'dropdown-menu show' : 'dropdown-menu'
                      }
                    >
                      {newData.length > 0 &&
                        newData.map((data, index) => (
                          <li
                            key={index}
                            onClick={(e) => toggleSelected(data, index)}
                            value='watch'
                            className={
                              clicked === index
                                ? 'option selected focus'
                                : 'option'
                            }
                          >
                            <div className='coin-wrapper'>
                              <img src={data.image} alt='image' />
                              {data.name}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <ul className='features-list'>
                  <li>
                    <div className='d-flex align-items-center'>
                      <span className='first-span'>
                        <i className='fas fa-minus'></i>
                        2.00 USD
                      </span>
                      <span className='second-span'>TOTAL CARD FEES</span>
                    </div>
                  </li>
                  <li>
                    <div className='d-flex align-items-center'>
                      <span className='first-span'>
                        <i className='fas fa-divide'></i>
                        47202
                      </span>
                      <span className='second-span'>CONVERSION RATE</span>
                    </div>
                  </li>
                </ul>
                <div className='currency-selection'>
                  <label>YOU RECEIVE</label>
                  <input
                    type='text'
                    value={Number(conversionValue) * Number(cryptoQuantity)}
                    onChange={(e) => e}
                  />
                  <div className='dropdown'>
                    <button
                      className='dropdown-toggle'
                      type='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img src={imageTwo} alt='image' /> {nameTwo}
                    </button>
                    <ul className='dropdown-menu'></ul>
                  </div>
                </div>
                <Link href='https://www.coinbase.com/accounts'>
                  <button type='submit'>
                    <i className='bx bxs-hand-right'></i> Sell Bitcoin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellBanner;
