const nwallet = () => {
  return (
    <div style={{ width: "100%" }}>
      <div className="container">
        <div
          className="currencyt-box"
          style={{ height: "707px", width: "650px", top: "20px", bottom: "20px" }}
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
              <label className="wallet-label" style={{ fontSize: "27px" }}>
                FOT
                <span style={{
                  marginLeft: "35%",
                  fontSize: "27px"

                }}> 0
                </span>
              </label>
              <label className="wallet-label" style={{ fontSize: "27px" }} >
                bFOT
                <span style={{
                  marginLeft: "31.5%",
                  fontSize: "27px"
                }}>
                  0
                </span>
              </label>
              <label className="wallet-label" style={{ fontSize: "27px" }} >
                gFOT
                <span style={{
                  marginLeft: "31.5%",
                  fontSize: "27px"
                }}>
                  0
                </span>
              </label>
              <label className="wallet-label" style={{ fontSize: "27px" }} >
                ATOM
                <span style={{
                  marginLeft: "29%",
                  fontSize: "27px"
                }}>
                  0
                </span>
              </label>
              <label className="wallet-label" style={{ fontSize: "27px" }}  >
                JUNO
                <span style={{
                  marginLeft: "28.75%",
                  fontSize: "27px"
                }} >
                  0
                </span>
              </label>
              <label className="wallet-label" style={{ fontSize: "27px" }} >
                OSMO
                <span style={{
                  marginLeft: "27.5%",
                  fontSize: "27px"
                }} >
                  0
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default nwallet;
