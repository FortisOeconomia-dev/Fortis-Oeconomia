const burnmodule = () => {

  return (
    <>
      <div style={{ position: "relative", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <div className="container">
            <div className="currencyt-box" style={{ height: "681px", width: "600px", background: "transparent", boxShadow: "none" }}>
              <div className="currencyt-selection" style={{ width: "453px" }}>
                <label className="wallet-title"
                  style={{
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: "32px",
                    lineHeight: "48px",
                    marginBottom: "32px",
                  }}
                >
                  FOT
                </label>
                <label className="wallet-label" style={{ background: "rgba(255, 255, 255, 0.6)", width: "453px", height: "79px", borderRadius: "20px", marginBottom: "58px", display: "flex", flexDirection: "row" }}>
                  <button className="fa fa-minus" style={{ width: "fit-content", height: "48px", border: "2px solid #00000", background: "transparent", boxShadow: "none", color: "#080451;", marginLeft: "16px", marginTop: "16px", marginBottom: "15px" }} />
                  <span style={{ color: "#080451", marginLeft: "auto", marginRight: "auto" }}>0</span>
                  <button className="fa fa-plus" style={{ width: "fit-content", height: "48px", border: "2px solid #00000", background: "transparent", boxShadow: "none", color: "#080451;", marginRight: "16px", marginTop: "16px", marginBottom: "15px" }} />
                </label>
                <div><img src="../images/fire.png" style={{ marginBottom: "57.79" }}></img></div>
                <label className="wallet-title"
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
                <label className="wallet-label" style={{ background: "rgba(255, 255, 255, 0.6)", width: "453px", height: "79px", borderRadius: "20px", marginBottom: "72px", display:"flex" }}>
                  <span style={{ color: "#080451", marginLeft: "auto", marginRight: "auto"}}>0</span>
                </label>
                <button>Burn</button>
              </div>


            </div>
          </div>


        </div>
        <div style={{ width: "50%" }}>
          <div className="currencyt-box" style={{ height: "631px", marginTop: "50px", marginLeft: "100px", width: "621px" }}>
            <div className="currencyt-selection" style={{}}>
              <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{ fontSize: "27px", marginLeft: "20px", marginBottom: "178px", width: "486px",color:"#030f49" }}>
                  FOT Supply
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> 0
                  </span>
                </label>
              </div>
              <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{ fontSize: "27px", marginLeft: "20px", marginBottom: "178px", width: "486px",color:"#030f49" }}>
                  Burned FOT
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> 0
                  </span>
                </label>
              </div>
              <div className="wallet-text" style={{ textAlign: "left" }}>
                <label className="wallet-label" style={{ fontSize: "27px", marginLeft: "20px", width: "486px",color:"#030f49" }}>
                  bFOT Supply
                  <span style={{
                    fontSize: "27px",
                    display: "block",
                    float: "right",
                  }}> 0
                  </span>
                </label>
              </div>
            </div>

          </div>


        </div>
      </div>
    </>
  )
}

export default burnmodule