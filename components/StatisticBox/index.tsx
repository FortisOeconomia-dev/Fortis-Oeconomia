import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 50px 32px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
    border-radius: 15.1165px;
    max-width: 100%;
`

const StakedValue = styled.span`
    font-size: 20px;
    display: block;
    float: right;
`

const StatisticBox = () => {
    return (
        <Wrapper>
            <div className="wallet-text w-full">
                <label className="wallet-label" style={{marginLeft: '0px', maxWidth: '100%'}}>
                    bFOT Supply
                    <StakedValue>
                        {" "}
                        100.000.000
                    </StakedValue>
                </label>
                <label className="wallet-label" style={{marginLeft: '0px', maxWidth: '100%'}}>
                    Burned bFOT
                    <StakedValue>
                        {" "}
                        0
                    </StakedValue>
                </label>
                <label className="wallet-label" style={{marginBottom: '20px', marginLeft: '0px', maxWidth: '100%'}}>
                    gFOT Supply
                    <StakedValue>
                        {" "}
                        0
                    </StakedValue>
                </label>
            </div>
        </Wrapper>
    )
}

export default StatisticBox