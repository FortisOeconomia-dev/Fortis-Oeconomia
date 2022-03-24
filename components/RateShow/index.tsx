import styled from 'styled-components'

const Wrapper = styled.div`
    background: rgba(255, 255, 255, 0.44);
    box-shadow: 0px 8px 24px rgba(71, 94, 82, 0.25);
    border-radius: 59px 0px 0px 59px;
    padding: 21px;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 15px;
    right: 0px;
    cursor: pointer;
    min-width: 324px;
`

const ContentWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
`

const Equal = styled.span`
    font-weight: 500;
    font-size: 20px;
    line-height: 12px;
    color: #171E0E;
`

const RateShow = ({values, action}) => {
    return (
        <Wrapper onClick={action}>
            <ContentWrapper>
                Junoswap Pool Data
                {values.map((d, idx) => 
                    <Equal key={idx}>{d.fromAmount}{" "}{d.fromPer}{" "}={" "}{d.toAmount}{" "}{d.toPer}</Equal>
                )}
            </ContentWrapper>
        </Wrapper>
    )
}

export default RateShow