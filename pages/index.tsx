import styled from 'styled-components'
import {useEffect, useState} from 'react'
import Link from "../util/ActiveLink";

const HomeImage = styled.img`

`

const Home = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  gap: 80px;
  flex-direction: ${props => parseInt(props.slot) > 20 ? 'column-reverse': 'row'}
`

const Title = styled.div`
  color: #FBFCFD;
  min-width: 1050px;
  display: flex;
  gap: 16px;
`

const EnterText = styled.p`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #FBFCFD;
`

const Description = styled.p`
  font-weight: 400;
  font-size: 32px;
  line-height: 48px;
  color: #FBFCFD;
`

const Index = () => {
  const [index, setIndex] = useState(1)
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setIndex(index => index + 1);
    }, 300);
    return () => clearInterval(interval);
  })

  return (
    <Home slot={`${index}`} className={`${index > 20 && 'my-animate'}`}>
      {index > 20 && <EnterText>Enter the Castle</EnterText>}
      <Link href="/airdrop" activeClassName="active">
        <HomeImage src="./images/home.png"/>
      </Link>
      {index > 20 && <Description>Innovative Financial Toolkit</Description>}
      <Title>
        {Array.from(Array(index).keys()).map(idx => 
          idx < 16 && (idx === 6 ? 
            <div style={{width: '36px'}} key={idx}></div> :
            <img key={idx} src={`./images/FortisOeconomia/${idx+1}.png`} />)
        )}
      </Title>
    </Home>
  );
};

export default Index;