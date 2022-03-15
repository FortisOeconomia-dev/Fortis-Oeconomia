const InputWithIncDec = () => {
    return (
        <label
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
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
                <input type="number" style={{
                    color: "#080451",
                    width: '100%',
                    background: "transparent",
                    border: "none",
                    textAlign: "center"
                  }}
                    step="1"
                    min="1"
                  />
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
    )
}

export default InputWithIncDec