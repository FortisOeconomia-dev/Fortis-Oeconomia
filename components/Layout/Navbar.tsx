import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from '../../util/ActiveLink'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import styled from 'styled-components'

import { useSigningClient } from '../../contexts/cosmwasm'
import ToggleSwitch from '../ToggleSwitch'

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
  const onMouseEnterdrops = () => { setDropsMenu(true)}
  const onMouseLeavedrops = () => { setDropsMenu(false)}
  const onMouseEntermodules = () => { setModulesMenu(true)}
  const onMouseLeavemodules = () => { setModulesMenu(false)}
  const toggleMenu = () => {setshowMenu(!showMenu)}
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
          <div className="container" style={{ padding: '20px 32px', maxWidth: 'unset' }}>
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

            <div className="collapse navbar-collapse mean-menu">
              <ul
                className="navbar-nav"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
              >
                <li className="dropdown" onMouseEnter={onMouseEnterdrops}>
                  <Link href="#" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      style={{ display: 'flex', gap: '10px', fontWeight: '600' }}
                      onClick={e => {
                        e.preventDefault()
                        setDropsMenu(!dropsMenu)
                      }}
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      Drops
                      <div style={{ transform: 'rotate(90deg)', fontFamily: 'cursive' }}>{`>`}</div>
                    </NavLink>
                  </Link>
                  {dropsMenu && (
                    <ul
                      style={{
                        position: 'absolute',
                        minWidth: '180px',
                        marginTop: '10px',
                        border: '1px solid #080451',
                        borderRadius: '13px',
                      }}
                      onMouseLeave={onMouseLeavedrops}
                    >
                      <li
                        style={{
                          background: '#FBFCFD',
                          borderRadius: '13px 13px 0px 0px',
                        }}
                      >
                        <Link href="/airdrop" activeClassName="active">
                          <SubLink
                            className="nav-link"
                            slot={pathname}
                            defaultChecked={toggle}
                            onClick={() => setDropsMenu(!dropsMenu)}
                          >
                            Airdrop
                          </SubLink>
                        </Link>
                      </li>
                      <li
                        style={{
                          background: '#FBFCFD',
                          borderBottom: '1px solid',
                          borderTop: '1px solid',
                          borderColor: '#080451',
                        }}
                      >
                        <Link href="/votedrops" activeClassName="active">
                          <SubLink
                            onClick={() => setDropsMenu(!dropsMenu)}
                            className="nav-link"
                            slot={pathname}
                            defaultChecked={toggle}
                          >
                            Votedrops
                          </SubLink>
                        </Link>
                      </li>
                      <li
                        style={{
                          background: '#FBFCFD',
                          borderRadius: '0px 0px 13px 13px',
                        }}
                      >
                        <Link href="/junoswap" activeClassName="active">
                          <SubLink
                            onClick={() => setDropsMenu(!dropsMenu)}
                            className="nav-link"
                            slot={pathname}
                            defaultChecked={toggle}
                          >
                            Junoswap LP'ers
                          </SubLink>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="dropdown" onMouseEnter={onMouseEntermodules}>
                  <Link href="#" activeClassName="active">
                    <NavLink
                      className="nav-link"
                      style={{ display: 'flex', gap: '10px', fontWeight: '600' }}
                      onClick={e => {
                        e.preventDefault()
                        setModulesMenu(!modulesMenu)
                      }}
                      slot={pathname}
                      defaultChecked={toggle}
                    >
                      Modules
                      <div style={{ transform: 'rotate(90deg)', fontFamily: 'cursive' }}>{`>`}</div>
                    </NavLink>
                  </Link>
                  {modulesMenu && (
                    <ul
                      style={{
                        position: 'absolute',
                        minWidth: '180px',
                        marginTop: '10px',
                        border: '1px solid #080451',
                        borderRadius: '13px',
                      }}
                      onMouseLeave={onMouseLeavemodules}
                    >
                      <li
                        style={{
                          background: '#FBFCFD',
                          borderRadius: '13px 13px 0px 0px',
                        }}
                      >
                        <Link href="/burnmodule" activeClassName="active">
                          <SubLink
                            className="nav-link"
                            slot={pathname}
                            defaultChecked={toggle}
                            onClick={() => setModulesMenu(!modulesMenu)}
                          >
                            Burn Module (bFOT)
                          </SubLink>
                        </Link>
                      </li>
                      <li
                        style={{
                          background: '#FBFCFD',
                          borderBottom: '1px solid',
                          borderTop: '1px solid',
                          borderColor: '#080451',
                        }}
                      >
                        <Link href="/gFOTmodule" activeClassName="active">
                          <SubLink
                            onClick={() => setModulesMenu(!modulesMenu)}
                            className="nav-link"
                            slot={pathname}
                            defaultChecked={toggle}
                          >
                            Grand Module (gFOT)
                          </SubLink>
                        </Link>
                      </li>
                      <li
                        style={{
                          background: '#FBFCFD',
                          borderRadius: '0px 0px 13px 13px',
                        }}
                      >
                        <Link href="/sFOTVault" activeClassName="active">
                          <SubLink
                            onClick={() => setModulesMenu(!modulesMenu)}
                            className="nav-link"
                            slot={pathname}
                            defaultChecked={toggle}
                          >
                            sFOT Vault/Module
                          </SubLink>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                {/*<li className="nav-item">
                  <Link href="/publicsale" activeClassName="active">
                    <a className="nav-link">Public Sale</a>
                  </Link>
                  </li>*/}
                {/*<li className="nav-item">
                  <Link href="/burntostake" activeClassName="active">
                    <a className="nav-link" style={{whiteSpace:"nowrap"}}>Burn to Stake</a>
                  </Link>
                </li>*/}
                {/*<li className="nav-item">
                  <Link href="/legionnairecoins" activeClassName="active">
                    <a className="nav-link" style={{whiteSpace:"nowrap"}}>Legionnaire Coins</a>
                  </Link>
                </li>*/}
                {/* <li className="nav-item">
                  <Link href="/info" activeClassName="active">
                    <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>Info</NavLink>
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link href="/fortisDungeon" activeClassName="active">
                    <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>
                      Fortis Dungeon
                    </NavLink>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/nwallet" activeClassName="active">
                    <NavLink className="nav-link" slot={pathname} defaultChecked={toggle}>
                      Wallet
                    </NavLink>
                  </Link>
                </li>
                <Governance className="nav-item">
                <Governance
                  style={{fontSize:'19px', fontWeight: '600'}}
                  href="https://daodao.zone/dao/juno1anz3mg3n0pdj6d4pulk94sqz52j3duld6cclauzxhtv7de5hahssgc3r9n"
                  target="_SEJ"
                  rel="noreferrer"
                  slot={pathname}
                  defaultChecked={toggle}>
                    Governance
                </Governance>
                </Governance>
                {pathname !== '/fortisDungeon' && <ToggleSwitch toggle={toggle} setToggle={setToggle} /> }
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
              </ul>
              {/* <div className="others-option">
                <div className="d-flex align-items-center">
                  {walletAddress.length == 0 ? (
                    <></>
                  ) : (
                    <div
                      className="banner-wrapper-content"
                      style={{ marginLeft: "30px" }}
                    >
                    </div>
                  )}
                  <div className="flex flex-grow lg:flex-grow-0 max-w-full ms-2">
                    <button
                      className="block default-btn w-full max-w-full truncate"
                      onClick={handleConnect}
                    >
                      <i className="bx bxs-contact"></i>
                      {walletAddress
                        ? walletAddress.substring(0, 12) +
                        "..." +
                        walletAddress.substring(
                          walletAddress.length - 6,
                          walletAddress.length
                        )
                        : "Connect Wallet"}
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
