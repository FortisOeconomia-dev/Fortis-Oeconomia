import { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import ThemeContext from '../contexts/ThemeContext';

const translateYAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(0px);
  }

  75% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0px);
  }
`;


const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(5deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-5deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;

const shineAnimation = keyframes`
  0% {
    opacity: .3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .3;
  }
`

const LeftShadow = styled.div`
  position: fixed;
  width: 460px;
  height: 448px;
  left: 0px;
  top: 0px;

  background: linear-gradient(#A1559D, #4533A2, #A1559D);
  filter: blur(206.268px);
  transform: rotate(-21.85deg) translate(-50%, -50%);
`;

const RightShadow = styled.div`
  position: fixed;
  width: 460px;
  height: 448px;
  right: 0px;
  bottom: 0px;

  background: linear-gradient(46.26deg, rgba(79, 254, 229, 0.325) 21.95%, rgba(197, 188, 252, 0.65) 69.14%, rgba(197, 188, 252, 0.65) 72.09%);
  filter: blur(206.268px);
  transform: rotate(-21.85deg) translate(20%, 20%);
`;

const DogImage = styled.img`
  position: fixed;
  left: 0px;
  bottom: 0px;
`;

const Cube = styled.img`
  position: fixed;
  right: 0px;
  bottom: 0px;
  animation: ${rotateAnimation} 2.5s linear infinite;
`

const Saturn = styled.img`
  position: fixed;
  left: 126px;
  top: 237px;
  animation: ${translateYAnimation} 2.5s linear infinite;
`

const Stars = styled.img<{ rotate?: number }>`
  position: absolute;
  animation: ${shineAnimation} 2s linear infinite;
  transform: rotate(${props => props.rotate ?? 0}deg)
`

const Index = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme('theme11');
  }, [])

  return (
    <>
      <div style={{ position: 'relative', display: 'block', margin: 'auto 0' }}>
        <img src="./images/fortis-lite.png" />
        <Stars src='./images/stars.png' alt='stars' rotate={90} style={{ top: '-25%', right: '-75px' }} />
      </div>
      <LeftShadow />
      <RightShadow />
      <DogImage src='./images/dog.png' alt='dog' />
      <Cube src='./images/cube.png' alt='cube' style={{ right: '11%', bottom: '15%' }} />
      <Cube src='./images/cube.png' alt='cube' style={{ width: 215, bottom: '10%', right: '-5%', transform: 'translateX(5%)', animationDuration: '3500ms' }} />
      <Cube src='./images/cube.png' alt='cube' style={{ width: 265, bottom: '-13%', right: '7%', animationDuration: '4500ms' }} />
      <Saturn src='./images/saturn.png' alt='saturn' />
      <Stars src='./images/stars.png' alt='stars' style={{ top: 176, left: 83 }} />
      {/* <a href="https://pupmos.github.io/whitepuppers/WhitepupperGenesis.pdf" target="_SEJ" rel="noreferrer">
        <img src="./images/pupmos.png" style={{width:"150px", height:"150px", cursor:"pointer",marginLeft:"auto",marginRight:"auto", filter: toggle && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg)'}}/>
      </a> */}
    </>
  )
}

export default Index
