import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import styled from 'styled-components'

import Link from '../../util/ActiveLink'
import { useSigningClient } from '../../contexts/cosmwasm'
import ToggleSwitch from '../ToggleSwitch'
import Dropdown from './Dropdown'

const NavLink = styled.a`
  white-space: nowrap;
  color: ${props => (!props.defaultChecked && props.slot === '/gFOTmodule' ? '#4B365B' : 'white')} !important;
  cursor: pointer;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 19px !important;
  line-height: 28px !important;
  padding-left: unset !important;
  padding-right: unset !important;
  &.active {
    color: ${props => (props.slot === 'gFOTmodule' ? 'red' : 'black')} !important;
  }
  padding-left: unset !important;
  padding-right: unset !important;
`

const Governance = styled.a`
  white-space: nowrap;
  color: ${props => (!props.defaultChecked && props.slot === '/gFOTmodule' ? '#4B365B' : 'white')} !important;
  cursor: pointer;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 19px !important;
  line-height: 28px !important;
  padding-left: unset !important;
  padding-right: unset !important;
  &.active {
    color: ${props => (props.slot === 'gFOTmodule' ? 'red' : 'black')} !important;
  }
  padding-left: unset !important;
  padding-right: unset !important;
`

const SubLink = styled.a`
  font-size: 14px !important;
  line-height: 21px !important;
  color: #080451 !important;
  padding: 11px 32px !important;
  cursor: pointer;
`

const Navbar = ({ toggle, setToggle }) => {
  const { walletAddress, connectWallet, signingClient, disconnect, loading, getBalances, nativeBalance } =
    useSigningClient()
  const router = useRouter()
  const { pathname } = router

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false)
    } else {
      disconnect()
    }
  }

  useEffect(() => {
    let account = localStorage.getItem('address')
    if (account != null) {
      connectWallet(true)
    }
  }, [])

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) return
    getBalances()
  }, [walletAddress, signingClient])

  const [dropsMenu, setDropsMenu] = useState(false)
  const [modulesMenu, setModulesMenu] = useState(false)
  const [showMenu, setshowMenu] = useState(false)
  const onMouseEnterdrops = () => {
    setDropsMenu(true)
  }
  const onMouseLeavedrops = () => {
    setDropsMenu(false)
  }
  const onMouseEntermodules = () => {
    setModulesMenu(true)
  }
  const onMouseLeavemodules = () => {
    setModulesMenu(false)
  }
  const toggleMenu = () => {
    setshowMenu(!showMenu)
  }
  // useEffect(() => {
  //   let elementId = document.getElementById("navbar");
  //   document.addEventListener("scroll", () => {
  //     if (window.scrollY > 80) {
  //       elementId.classList.add("is-sticky");
  //     } else {
  //       elementId.classList.remove("is-sticky");
  //     }
  //   });
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <NotificationContainer />
      <div id="navbar" className="navbar-area w-full">
        {/* <div className="raimo-responsive-nav">
          <div className="container">
            <div className="raimo-responsive-menu">
              <Link className="flex" href="https://www.fortisoeconomia.com/">
                <img src="/images/mobileapp.png"
                  style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "100%", height: "100%", marginBottom: "1000px", cursor:"pointer" }} />
              </Link>
              <div className="responsive-others-option">
                <div className="option-item">
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <nav
          className={
            showMenu ? 'show navbar navbar-expand-md navbar-light' : 'navbar navbar-expand-md navbar-light hide-menu'
          }
        >
          <div className="container" style={{ padding: '20px 32px', maxWidth: 'unset', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex">
              <div className="d-flex flex-row align-items-center">
                <a
                  className="justify-content-center w-full"
                  href="https://www.fortisoeconomia.com/"
                  target="_SEJ"
                  rel="noreferrer"
                >
                  <img
                    src={`/images/castle${pathname === '/gFOTmodule' ? '-dark' : 'new'}.png`}
                    alt="logo"
                    className="justify-right"
                    style={{ marginRight: '20px', cursor: 'pointer' }}
                  />
                </a>
              </div>
            </div>

            <ul
              className="navbar-nav"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <li className="nav-item custom-tooltip">
                <Link href="#" activeClassName="active">
                  <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>
                    AirDrop
                  </NavLink>
                </Link>
                <span className='tooltiptext'>Stay Tuned!</span>
              </li>
              <li className="nav-item custom-tooltip" style={{ marginLeft: 64 }}>
                <Link href="#" activeClassName="active">
                  <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>
                    Burn Module
                  </NavLink>
                </Link>
                <span className='tooltiptext'>Stay Tuned!</span>
              </li>
              <li className="nav-item custom-tooltip" style={{ marginLeft: 64 }}>
                <Link href="#" activeClassName="active">
                  <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>
                    Grand Module
                  </NavLink>
                </Link>
                <span className='tooltiptext'>Stay Tuned!</span>
              </li>
              <li className="nav-item custom-tooltip" style={{ marginLeft: 64 }}>
                <Link href="#" activeClassName="active">
                  <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>
                    Wallet
                  </NavLink>
                </Link>
                <span className='tooltiptext'>Stay Tuned!</span>
              </li>
            </ul>
            <button
              className={`default-btn ${!toggle && pathname === '/gFOTmodule' ? 'secondary-btn' : ''}`}
              onClick={handleConnect}
            >
              {walletAddress
                ? walletAddress.substring(0, 12) +
                '...' +
                walletAddress.substring(walletAddress.length - 6, walletAddress.length)
                : 'Connect Wallet'}
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
