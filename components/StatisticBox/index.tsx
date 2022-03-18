import { useRouter } from 'next/router';
import styled from 'styled-components'

const Wrapper = styled.div`
    background: ${props => props.slot === '/gFOTmodule' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(251, 252, 253, 0.3)'};
    box-shadow: ${props => props.slot === '/gFOTmodule' ? '2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25)': '4px 8px 83px rgba(34, 40, 95, 0.25)'};
    border-radius: ${props => props.slot === '/gFOTmodule' ? '15.1165px': '70px'};
    width: 100%;
    max-width: 610px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StatisticLabel = styled.span`
    font-weight: 600;
    font-size: ${props => props.slot=== '/gFOTmodule' ? '16.4907px' : '24px'};
    line-height: ${props => props.slot=== '/gFOTmodule' ? '25px' : '36px'};
    color: ${props => props.slot=== '/gFOTmodule' ? '#080451' : 'white'};
    color: #22053D;
`

const StatisticValue = styled.span`
    font-weight: 600;
    font-size: ${props => props.slot=== '/gFOTmodule' ? '20.6134px' : '30px'};
    line-height: ${props => props.slot=== '/gFOTmodule' ? '31px' : '45px'};
    color: #22053D;
`

const StatisticItem = styled.label`
    width: 100%;
    max-width: 470px;
    padding: ${props => props.datatype === '/gFOTmodule' ? '36px':'72px'} 0;
    border-bottom: ${props => parseInt(props.htmlFor) !== parseInt(props.slot) - 1 && '1.71779px solid #2E0752'};
    transform: rotate(0.01deg);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StatisticBox = ({values=[]}) => {
    const router = useRouter();
    const { pathname } = router;
    return (
        <Wrapper slot={pathname}>
            {values.map((v, idx) => {
                return (
                    <StatisticItem key={idx} htmlFor={`${idx}`} slot={`${values.length}`} datatype={pathname}>
                        <StatisticLabel slot={pathname}>{v.key}</StatisticLabel>
                        <StatisticValue slot={pathname}>
                            {" "}
                            {v.value}
                        </StatisticValue>
                    </StatisticItem>
                )
            })}
        </Wrapper>
    )
}

export default StatisticBox