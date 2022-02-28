import React,{useState, useEffect} from 'react';
import Link from '../../util/ActiveLink';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { useSigningClient } from '../../contexts/cosmwasm'

const Navbar = () => {

  const { 
    walletAddress, 
    connectWallet, 
    signingClient, 
    disconnect, 
    loading,
    getIsAdmin,
    isAdmin,
    getBalances,
    nativeBalance,
    cw20Balance
  } = useSigningClient()

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false)
    } else {
      disconnect()
    }
  }

  useEffect(() => {
    let account = localStorage.getItem("address")
    if (account != null) {
      connectWallet(true)
    }
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0)
      return
    getIsAdmin()
    getBalances()
  }, [walletAddress, signingClient, ])
  
  const [showMenu, setshowMenu] = useState(false);
  const toggleMenu = () => {
    setshowMenu(!showMenu)
  };
  useEffect(() => {
    let elementId = document.getElementById('navbar');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky');
      } else {
        elementId.classList.remove('is-sticky');
      }
    });
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <NotificationContainer/>
      <div  id='navbar' className='navbar-area'>
        <div className='raimo-responsive-nav'>
          <div className='container'>
            <div className='raimo-responsive-menu'>
              <div onClick={() => toggleMenu()} className='hamburger-menu'>
                {showMenu ? (
                  <i className='bx bx-x'></i>
                ) : (
                  <i className='bx bx-menu'></i>
                )}
              </div>
              <div className='logo'>
                <Link href='/'>
                  <a>
                    <img src='/images/juno.png' alt='logo' />
                  </a>
                </Link>
              </div>


              <div className='responsive-others-option'>
                <div className='d-flex align-items-center'>
                  <div className='option-item'>
                    <Link href='/authentication' activeClassName='active'>
                      <a className='login-btn'>
                        <i className='bx bx-log-in'></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className={showMenu? 'show navbar navbar-expand-md navbar-light':'navbar navbar-expand-md navbar-light hide-menu'}>
          <div className='container'>
            <Link className="flex" href='/'>
              <div className="d-flex flex-row align-items-center" >
                <a className="justify-content-center" style= {{ width:"40px"}}>
                  <img src='/images/juno.png' alt='logo' className="justify-right"/>
                </a>
                <h3 className="text-3xl font-bold justify-center mt-2 ms-2">
                  DOODLE WORKSHOP
                </h3>
              </div>
            </Link>

            <div className='collapse navbar-collapse mean-menu'>
              
              <ul className='navbar-nav'>
                {!isAdmin ? <></>:
                  <li className='nav-item megamenu support'>
                    <Link href='#' activeClassName='active'>
                      <a className='dropdown-toggle nav-link'>Admin</a>
                    </Link>
                    <ul className='dropdown-menu'>
                      <li className='nav-item'>
                        <Link href='/adminconstants'>
                          <a className='nav-link'>
                            <i className='bx bx-info-circle'></i>
                            Constant
                          </a>
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link href='/adminrewards'>
                          <a className='nav-link'>
                            <i className='bx bx-wallet'></i>
                            Reward
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                }
                
                <li className='nav-item megamenu support'>
                  <Link href='#' activeClassName='active'>
                    <a className='dropdown-toggle nav-link'>My Works</a>
                  </Link>
                  <ul className='dropdown-menu'>
                    <li className='nav-item'>
                      <Link href='/creatework'>
                        <a className='nav-link'>
                          <i className='bx bx-info-circle'></i>
                          Create
                        </a>
                      </Link>
                      
                    </li>
                    <li className='nav-item'>
                      <Link href='/clientrewards'>
                        <a className='nav-link'>
                          <i className='bx bx-wallet'></i>
                          Reward
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className='nav-item'>
                  <Link href='/stakework' activeClassName='active'>
                    <a className='nav-link'>Stake Work</a>
                  </Link>
                </li>
              
                <li className='nav-item megamenu support'>
                  <Link href='/faq' activeClassName='active'>
                    <a className='dropdown-toggle nav-link'>Support</a>
                  </Link>
                  <ul className='dropdown-menu'>
                    <li className='nav-item'>
                      <Link href='/faq' activeClassName='active'>
                        <a className='nav-link'>
                          <i className='bx bx-info-circle'></i>
                          FAQ
                        </a>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link href='/guides' activeClassName='active'>
                        <a className='nav-link'>
                          <i className='bx bx-book'></i>
                          Guides
                        </a>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link href='/wallet' activeClassName='active'>
                        <a className='nav-link'>
                          <i className='bx bx-wallet'></i>
                          Wallets
                        </a>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link href='/about' activeClassName='active'>
                        <a className='nav-link'>
                          <i className='bx bx-group'></i>
                          About Us
                        </a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className='others-option'>
                <div className='d-flex align-items-center'>
                  {walletAddress.length == 0 ?<></>:
                      <div className='banner-wrapper-content'>
                          <span className="sub-title ms-2" style={{"marginBottom":"0px", "fontSize":"16px"}}>
                          {nativeBalance} JUNO 
                          </span>
                          <span className="sub-title ms-2" style={{"marginBottom":"0px", "fontSize":"16px", "backgroundColor": "var(--bs-pink)" }}>
                          {cw20Balance} CREW
                          </span>
                      </div>
                  }
                  <i className= { loading ? 'bx bx-loader bx-spin bx-md' : '' }></i> 
                  <div className="flex flex-grow lg:flex-grow-0 max-w-full ms-2">
                      <button
                      className="block default-btn w-full max-w-full truncate"
                      onClick={handleConnect}
                      >
                          <i className= 'bx bxs-contact'></i> 
                          {walletAddress ? walletAddress.substring(0,12) + "..." + walletAddress.substring(walletAddress.length - 6, walletAddress.length) :'Connect Wallet'}
                      </button>
                  </div>
                  <div className='option-item'>
                    {walletAddress.length == 0 ? 
                    <Link href='https://keplr.app/' activeClassName='active'>
                      <a className='login-btn'>
                        <i className='bx bxs-error'></i> no Keplr?
                      </a>
                    </Link>:<></>
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
