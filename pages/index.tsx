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
  flex-direction: ${props => parseInt(props.slot) > 15 ? 'column-reverse': 'row'};
  font-family: 'Shadows Into Light', cursive;
  font-size: 42px;
`

const Title = styled.div`
  color: #FBFCFD;
  min-width: 1050px;
  display: flex;
  gap: 16px;
`

const EnterText = styled.p`
  font-weight: 500;
  font-size: 50px;
  line-height: 54px;
  color: #FBFCFD;
`

const Description = styled.p`
  font-weight: 200;
  font-size: 42px;
  line-height: 48px;
  color: #FBFCFD;
  font-family: 'Shadows Into Light', cursive;
`

const Index = () => {
  const [index, setIndex] = useState(1)
  useEffect(() => {
    let interval = null;
    if (index < 16) {
      interval = setInterval(() => {
        setIndex(index => index + 1);
      }, 100);
    }
    return () => clearInterval(interval);
  })

  return (
    <Home slot={`${index}`}>
      {index > 15 && <EnterText>Enter the Castle</EnterText>}
      <Link href="/airdrop" activeClassName="active">
        <HomeImage style={{ cursor: 'pointer'}} src="./images/home.png"/>
      </Link>
      {index > 15 && <Description>Trip to DeFi</Description>}
      <Title>
        {Array.from(Array(index).keys()).map(idx => 
          idx === 6 ? 
            <div style={{width: '36px',}} key={idx}></div> :
            <img key={idx} src={`./images/FortisOeconomia/${idx+1}.png`} />
        )}
      </Title>
    </Home>
  );
};

export default Index;