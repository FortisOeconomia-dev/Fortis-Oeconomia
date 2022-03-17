import { borderBottom } from "@mui/system";
import { useSigningClient } from "../contexts/cosmwasm";

const nwallet = () => {
  const {
    bfotBalance,
    fotBalance,
    fotBalanceStr,
    nativeBalance,
    walletAddress,
    atomBalance,
    osmoBalance,
    gfotBalance,
  } = useSigningClient();
  return (
    <div style={{ width: "100%" }}>
      <div className="container">
        <div
          className="currencyt-box"
          style={{
            height: "fit-content",
            width: "fit-content",
            top: "20px",
            bottom: "20px"
          }}
        >
        
          <div className="currencyt-selection">
            <span className="wallet-title"
              style={{
                alignItems: "center",
                fontWeight: "600",
                fontSize:"26px",
                lineHeight: "48px",
                marginBottom:"48px"
              }}
            >
              My Assets
            </span>
            <div className="wallet-text">
              <label className="wallet-label" style={{
                width: "418px",
                textAlign: "left",
                fontSize:"26px",
                color: "#030f49",
                display: "block",
                marginBottom: "40px",
                borderBottom:"none"
              }}>
                FOT
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize:"26px",
                    display: "block",
                    float: "right"
                  }}> {fotBalance}
                    <img src="../images/FOT120.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
              <label className="wallet-label" style={{
                width: "418px",
                textAlign: "left",
                fontSize:"26px",
                color: "#030f49",
                marginBottom: "40px",
                borderBottom:"none"
              }} >
                bFOT
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize:"26px",
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
                textAlign: "left",
                fontSize:"26px",
                color: "#030f49",
                marginBottom: "40px",
                borderBottom:"none"
              }} >
                gFOT
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize:"26px",
                    display: "block",
                    float: "right"
                  }}>
                    
                    {gfotBalance}
                    <img src="../images/gFOT120.png" style={{ width: "37.5px", height: "37.5px", borderRadius: "39px", marginLeft: "20px" }} />
                  </span>
                }
              </label>
              <label className="wallet-label" style={{
                width: "418px",
                textAlign: "left",
                fontSize:"26px",
                color: "#030f49",
                marginBottom: "40px",
                borderBottom:"none"
              }} >
                ATOM
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize:"26px",
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
                textAlign: "left",
                fontSize:"26px",
                color: "#030f49",
                marginBottom: "40px",
                borderBottom:"none"
              }}  >
                JUNO
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize:"26px",
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
                textAlign: "left",
                fontSize:"26px",
                color: "#030f49",
                borderBottom: "none",
              }} >
                OSMO
                {walletAddress.length == 0 ? <></> :
                  <span style={{
                    fontSize:"26px",
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

