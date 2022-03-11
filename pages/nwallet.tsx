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
