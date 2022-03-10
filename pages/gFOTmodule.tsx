import Navbar from "../components/Layout/Navbar";
import Timer from "../components/Shared/timergfot";

const gfotmodule = () => {
  return (



    <>
        <Timer/>
    {/*<div
      style={{ position: "relative", display: "flex", flexDirection: "row" }}
    >
      <div style={{ width: "50%" }}>
        <div className="container">
          <div
            className="currencyt-box"
            style={{
              height: "681px",
              width: "600px",
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <div className="currencyt-selection" style={{ width: "453px" }}>
              <label
                className="wallet-title"
                style={{
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "32px",
                  lineHeight: "48px",
                  marginBottom: "32px",
                }}
              >
                bFOT
              </label>
              <label
                className="wallet-label"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  width: "453px",
                  height: "79px",
                  borderRadius: "20px",
                  marginBottom: "58px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  className="fa fa-minus"
                  style={{
                    width: "fit-content",
                    height: "48px",
                    border: "2px solid #00000",
                    background: "transparent",
                    boxShadow: "none",
                    color: "#080451",
                    marginLeft: "16px",
                    marginTop: "16px",
                    marginBottom: "15px",
                  }}
                />
                <span
                  style={{
                    color: "#080451",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  0
                </span>
                <button
                  className="fa fa-plus"
                  style={{
                    width: "fit-content",
                    height: "48px",
                    border: "2px solid #00000",
                    background: "transparent",
                    boxShadow: "none",
                    color: "#080451",
                    marginRight: "16px",
                    marginTop: "16px",
                    marginBottom: "15px",
                  }}
                />
              </label>
              <div>
                <img
                  src="../images/gfotarrow.png"
                  style={{ marginBottom: "57.79" }}
                ></img>
              </div>
              <label
                className="wallet-title"
                style={{
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "32px",
                  lineHeight: "48px",
                  marginBottom: "32px",
                  marginTop:"50px"
                }}
              >
                gFOT
              </label>
              <label
                className="wallet-label"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  width: "453px",
                  height: "79px",
                  borderRadius: "20px",
                  marginBottom: "72px",
                  display: "flex",
                }}
              >
                <span className="wallet-span">0</span>
              </label>
              <button>Burn</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "50%" }}>
        <div
          className="currencyt-box"
          style={{
            height: "390px",
            width: "80%",
            marginTop: "15px",
            marginRight: "300px",
          }}
        >
          <div className="wallet-text" style={{ textAlign: "left" }}>
            <label
              className="wallet-label"
              style={{
                fontSize: "20px",
                marginLeft: "5px",
                marginBottom: "15px",
                width: "45%",
                borderBottom: "none",
                color: "#030f49",
                marginTop: "3px",
              }}
            >
              Total Staked gFOT
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                }}
              >
                {" "}
                0
              </span>
            </label>
            <label
              className="wallet-label"
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                marginLeft: "6px",
                marginBottom: "15px",
                width: "45%",
                borderBottom: "none",
                color: "#030f49",
              }}
            >
              APY
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                }}
              >
                {" "}
                0 %
              </span>
            </label>
          </div>
          <label
            className="wallet-label"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              width: "30%",
              opacity: "0,2",
              height: "50px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
            }}
          >
            <button
              className="fa fa-minus"
              style={{
                width: "fit-content",
                height: "48px",
                border: "2px solid #00000",
                background: "transparent",
                boxShadow: "none",
                color: "#080451",
                marginLeft: "16px",
                marginTop: "16px",
                marginBottom: "15px",
              }}
            />
            <span
              style={{
                color: "#080451",
                marginLeft: "auto",
                marginTop: "15px",
                marginRight: "auto",
              }}
            >
              0
            </span>
            <button
              className="fa fa-plus"
              style={{
                width: "fit-content",
                height: "48px",
                border: "2px solid #00000",
                background: "transparent",
                boxShadow: "none",
                color: "#080451",
                marginRight: "16px",
                marginTop: "16px",
                marginBottom: "15px",
              }}
            />
          </label>
          <button
            style={{
              width: "30%",
              height: "5px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
              marginLeft: "10%",
            }}
          >
            Stake
          </button>

          <div
            style={{
              borderLeft: "2px solid #030f49",
              height: "330px",
              width: "2px",
              position: "absolute",
              left: "390px",
              top: "30px"
            }}
          ></div>

          <div
            className="wallet-text"
            style={{
              textAlign: "left",
              position: "absolute",
              left: "430px",
              top: "25px",
            }}
          >
            <label
              className="wallet-label"
              style={{
                fontSize: "20px",
                marginLeft: "4px",
                marginBottom: "15px",
                width: "100%",
                borderBottom: "none",
                color: "#030f49",
                marginTop: "3px",
              }}
            >
              My Staked gFOT
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                  marginLeft: "100px",
                }}
              >
                {" "}
                0
              </span>
            </label>
          </div>

          <button
            style={{
              position: "absolute",
              left: "460px",
              top: "50px",
              width: "30%",
              height: "5px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            Unstake
          </button>

          <div
            className="wallet-text"
            style={{
              textAlign: "left",
              position: "absolute",
              left: "430px",
              top: "225px",
            }}
          >
            <label
              className="wallet-label"
              style={{
                fontSize: "20px",
                marginLeft: "4px",
                marginBottom: "15px",
                width: "100%",
                borderBottom: "none",
                color: "#030f49",
                marginTop: "3px",
              }}
            >
              My Rewards
              <span
                style={{
                  fontSize: "20px",
                  display: "block",
                  float: "right",
                  marginLeft: "100px",
                }}
              >
                {" "}
                0
              </span>
            </label>
          </div>

          <button
            style={{
              position: "absolute",
              left: "460px",
              top: "250px",
              width: "30%",
              height: "5px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            Claim
          </button>
        </div>

        <div
          className="currencyt-box"
          style={{
            height: "370px",
            width: "80%",
            marginTop: "50px",
            marginRight: "300px",
          }}
        >
          <div className="currencyt-selection" style={{}}>
            <div className="wallet-text" style={{ textAlign: "left" }}>
              <label className="wallet-label">
                Current bFOT Supply
                <span className="wallet-span">0</span>
              </label>
            </div>
            <div className="wallet-text" style={{ textAlign: "left" }}>
              <label className="wallet-label">
                Total Burned bFOT
                <span className="wallet-span">0</span>
              </label>
            </div>
            <div className="wallet-text" style={{ textAlign: "left" }}>
              <label className="wallet-label">
               gFOT Supply
                <span className="wallet-span">0</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>*/ }
    </>
  );
};

export default gfotmodule;
