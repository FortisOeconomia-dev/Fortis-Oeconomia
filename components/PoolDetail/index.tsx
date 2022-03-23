import styled from 'styled-components'

const Title = styled.p`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #FBFCFD;
  text-align: center;
`
const PoolDetail = ({
    from,
    to,
    fromImage,
    toImage
}) => {
    return (
        // <Wrapper>
            <Title style={{display: 'flex', gap: '24px'}}>
                <div style={{display: 'flex', gap: '10px'}}>
                {fromImage()} <span>-</span> {typeof toImage === 'string' ? <img src={`${toImage}`} /> : toImage()}
                </div>
                <Title>{from}-{to} Pool</Title>
            </Title>
        // </Wrapper>
    )
}

export default PoolDetail