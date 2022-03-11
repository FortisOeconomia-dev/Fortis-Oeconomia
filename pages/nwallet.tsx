import { useSigningClient } from "../contexts/cosmwasm";

const nwallet = () => {
  const {
    bfotBalance,
    fotBalance,
    fotBalanceStr,
    nativeBalance,
    atomBalance,
    osmoBalance,
    walletAddress,
  } = useSigningClient();
  return (
    <div style={{ width: "100%" }}>
      <div className="container">
        <div
          className="currencyt-box"
          style={{
            height: "790px",
            width: "650px",
            top: "20px",
            bottom: "20px"
          }}
        >
          <div className="currencyt-selection">
            <span className="wallet-title"
              style={{
                alignItems: "center",
                fontWeight: "600",
                fontSize: "32px",
                lineHeight: "48px"
              }}
            >
              My Assets
            </span>
            <div className="wallet-text">
              <label className="wallet-label" style={{
                width: "418px", marginLeft: "40px",
                textAlign: "left",
                fontSize: "27px",
                color: "#030f49",
                borderBottom: "none",
                display: "block",
                marginBottom: "40px"
              }}>
                FOT
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right"
                  }}> {fotBalance}
                    <img src="../images/FOT120.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
              <label className="wallet-label" style={{
                width: "418px", marginLeft: "40px",
                textAlign: "left",
                fontSize: "27px",
                color: "#030f49",
                borderBottom: "none",
                marginBottom: "40px"
              }} >
                bFOT
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right"
                  }}>
                    {bfotBalance}
                    <img src="../images/bFOT120.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>

                }
              </label>
              <label className="wallet-label" style={{
                width: "418px",
                marginLeft: "40px",
                textAlign: "left",
                fontSize: "27px",
                color: "#030f49",
                borderBottom: "none",
                marginBottom: "40px"
              }} >
                gFOT
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right"
                  }}>
                    0
                    <img src="../images/gFOT120.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
              <label className="wallet-label" style={{
                width: "418px",
                marginLeft: "40px",
                textAlign: "left",
                fontSize: "27px",
                color: "#030f49",
                borderBottom: "none",
                marginBottom: "40px"
              }} >
                ATOM
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right"
                  }}>
                    {atomBalance}
                    <img src="../images/atom.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
              <label className="wallet-label" style={{
                width: "418px",
                marginLeft: "40px",
                textAlign: "left",
                fontSize: "27px",
                color: "#030f49",
                borderBottom: "none",
                marginBottom: "40px"
              }}  >
                JUNO
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right"
                  }} >
                    {nativeBalance}
                    <img src="../images/juno.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
              <label className="wallet-label" style={{
                width: "418px",
                marginLeft: "40px",
                textAlign: "left",
                fontSize: "27px",
                color: "#030f49",
                borderBottom: "none",
                marginBottom: "78px"
              }} >
                OSMO
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right"
                  }} >
                    {osmoBalance}
                    <img src="../images/osmo.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default nwallet;
