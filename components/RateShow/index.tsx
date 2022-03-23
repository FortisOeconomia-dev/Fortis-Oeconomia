import styled from 'styled-components'

const Wrapper = styled.div`
    background: rgba(255, 255, 255, 0.44);
    box-shadow: 0px 8px 24px rgba(71, 94, 82, 0.25);
    border-radius: 59px 0px 0px 59px;
    padding: 21px 85px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: fixed;
    bottom: 15px;
    right: 0px;
    cursor: pointer;
`

const Equal = styled.p`
    font-weight: 500;
    font-size: 21px;
    line-height: 32px;
    color: #171E0E;
`

const RateShow = ({values, action}) => {
    return (
        <Wrapper onClick={action}>
            {values.map((d, idx) => 
                <Equal key={idx}>{d.fromAmount}{d.fromPer}={d.toAmount}{d.toPer}</Equal>
            )}
        </Wrapper>
    )
}

export default RateShow