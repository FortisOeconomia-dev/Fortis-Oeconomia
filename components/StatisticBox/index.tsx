import { useRouter } from 'next/router';
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 20px 32px;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 2.74846px 5.49692px 57.0305px rgba(161, 164, 176, 0.25);
    border-radius: 52.162px;
    max-width: 100%;
`

const StakedValue = styled.span`
    font-size: 20px;
    display: block;
    float: right;
`

const StatisticBox = ({values=[]}) => {
    const router = useRouter();
    const { pathname } = router;
    return (
        <Wrapper>
            <div className="wallet-text w-full">
                {values.map((v, idx) => {
                    return (
                        <label key={`${v}-${idx}`} className="wallet-label" style={{marginLeft: '0px', maxWidth: '100%', marginBottom: `${idx === values.length - 1 && '20px'}`}}>
                            <span style={{color: pathname === '/gFOTmodule' ? '#080451' : 'white'}}>{v.key}</span>
                            <StakedValue>
                                {" "}
                                {v.value}
                            </StakedValue>
                        </label>
                    )
                })}
            </div>
        </Wrapper>
    )
}

export default StatisticBox