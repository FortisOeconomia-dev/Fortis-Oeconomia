import styled from 'styled-components'
import { useContext } from 'react'
import { ToggleContext } from "../../components/Layout/Layout";

const Wrapper = styled.div`
    background: rgba(255, 255, 255, 0.44);
    box-shadow: 0px 8px 24px rgba(71, 94, 82, 0.25);
    border-radius: 200px 0px 0px 200px;
    padding: 21px 21px 21px 60px;
    display: flex;
    justify-content: center;
    position: fixed;
    z-index: 999;
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
    const {toggle} = useContext(ToggleContext)
    return (
        <Wrapper onClick={action} style={{filter: toggle && 'invert(1) hue-rotate(170deg) saturate(200%) contrast(100%) brightness(90%)'}}>
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