import React, { useState, useEffect } from "react";
import Link from "../../util/ActiveLink";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { useSigningClient } from "../../contexts/cosmwasm";

const Navbar = () => {
  const {
    walletAddress,
    connectWallet,
    signingClient,
    disconnect,
    loading,
    getBalances,
    nativeBalance,
  } = useSigningClient();

  const handleConnect = () => {
    if (walletAddress.length === 0) {
      connectWallet(false);
    } else {
      disconnect();
    }
  };

  useEffect(() => {
    let account = localStorage.getItem("address");
    if (account != null) {
      connectWallet(true);
    }
  }, []);

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) return;
    getBalances();
  }, [walletAddress, signingClient]);

  const [showMenu, setshowMenu] = useState(false);
  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };
  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NotificationContainer />
      <div id="navbar" className="navbar-area">
        <div className="raimo-responsive-nav">
          <div className="container">
            <div className="raimo-responsive-menu">
              <Link className="flex" href="https://www.fortisoeconomia.com/">
                <img src="/images/construction.png"
                  style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: "100%", height: "100%", marginBottom: "1000px", cursor:"pointer" }} />
              </Link>
              <div className="responsive-others-option">
                <div className="option-item">
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          className={
            showMenu
              ? "show navbar navbar-expand-md navbar-light"
              : "navbar navbar-expand-md navbar-light hide-menu"
          }
        >
          <div className="container">
            <Link className="flex" href="https://www.fortisoeconomia.com/">
              <div className="d-flex flex-row align-items-center">
                <a className="justify-content-center" style={{ width: "100px", marginTop: "20px" }}>
                  <img
                    src="/images/castlenew.png"
                    alt="logo"
                    className="justify-right"
                    style={{ marginRight: "20px", cursor: "pointer" }}

                  />
                </a>
              </div>
            </Link>

            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/airdrop" activeClassName="active">
                    <a className="nav-link">Airdrop</a>
                  </Link>
                </li>
                {/*<li className="nav-item">
                  <Link href="/publicsale" activeClassName="active">
                    <a className="nav-link">Public Sale</a>
                  </Link>
                  </li>*/}
                <li className="nav-item">
                  <Link href="/burnmodule" activeClassName="active">
                    <a className="nav-link">Burn Module</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/gFOTmodule" activeClassName="active">
                    <a className="nav-link">gFOT Module</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/sFOTmodule" activeClassName="active">
                    <a className="nav-link">sFOT Module</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/burntostake" activeClassName="active">
                    <a className="nav-link">Burn to Stake</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/legionnairecoins" activeClassName="active">
                    <a className="nav-link">Legionnaire Coins</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/nwallet" activeClassName="active">
                    <a className="nav-link">Wallet</a>
                  </Link>
                </li>
              </ul>
              <div className="others-option">
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
                  <i
                    className={loading ? "bx bx-loader bx-spin bx-md" : ""}
                  ></i>
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
                  <div className="option-item">
                    {walletAddress.length == 0 ? (
                      <Link href="https://keplr.app/" activeClassName="active">
                        <a className="login-btn">
                          <i className="bx bxs-error"></i> no Keplr?
                        </a>
                      </Link>
                    ) : (
                      <></>
                    )}
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
