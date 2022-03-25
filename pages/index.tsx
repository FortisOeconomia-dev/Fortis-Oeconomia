import { useContext } from 'react'
import { ToggleContext } from "../components/Layout/Layout";
import Link from "../util/ActiveLink";
const Index = () => {
  const toggle = useContext(ToggleContext)
  return (
    <>
    <img src="./images/fortisoeconomia.png" style={{ display: "block",width: "95%", height:"95%" }}/>
      {/* <a href="https://pupmos.github.io/whitepuppers/WhitepupperGenesis.pdf" target="_SEJ" rel="noreferrer">
        <img src="./images/pupmos.png" style={{width:"150px", height:"150px", cursor:"pointer",marginLeft:"auto",marginRight:"auto", filter: toggle && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg)'}}/>
      </a> */}
    </>
  );
};

export default Index;
