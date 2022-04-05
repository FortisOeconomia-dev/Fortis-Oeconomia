import { useContext } from "react";
import "react-notifications/lib/notifications.css";
import styled from "styled-components";

import { ToggleContext } from "../Layout/Layout";

const AcceptButton = styled.button`
  background: 
    "linear-gradient(rgba(251,252,253,0.25), white), linear-gradient(275.74deg, #5F5BCD 0%, #83B8DD 100%)"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  padding: 14px !important;
`;

const Information = styled.span`
  font-weight: 600;
  font-size: 26px;
  line-height: 54px;
  color: #171e0e;
  align-self: center;
`;

const Dialog = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  min-height: 465px;
  width: 704px;
  max-width: 90%;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 15.1194px 15.1194px 60.4777px rgba(8, 4, 81, 0.18);
  border-radius: 52.162px;
  margin: 100px 10px 200px 10px;

  ${Information} {
    max-width: 498px;
    margin-top: 72px;
    color: #080451;
    font-size: 24px;
    line-height: 36px;

    &:last-child {
      margin: 20px 0 72px;
    }
  }
`;

const InformativeDialog = ({ onAcceptInformativeDialog }) => {
  const handleSubmit = () => {
    onAcceptInformativeDialog();
  };
  const { toggle } = useContext(ToggleContext);

  return (
    <>
      <Dialog>
        <Information>Welcome to Fortis Oeconomia</Information>
        <Information style={{ fontWeight: "500" }}>
          Fortis Oeconomia is an experimental decentralized financial instrument
          protocol that allows people to use Cosmos-SDK-based tokens and coins
          unprecedentedly. Fortis Oeconomia protocol is made up of free, public,
          and decentralized. Users should review the relevant documentation to
          understand how the Fortis Oeconomia protocol works and the sub-systems
          they use in the Fortis Oeconomia protocol. You are responsible for
          doing your own diligence on those interfaces to understand the fees
          and risks they present.
        </Information>
        <Information style={{ fontWeight: "500" }}>
          THE FORTIS OECONOMIA PROTOCOL IS PROVIDED “AS IS " AT YOUR OWN RISK
          AND WITHOUT WARRANTIES OF ANY KIND. Fortis Oeconomia protocol
          development teams do not provide, own, or control the Fortis Oeconomia
          protocol. No developer or entity involved in creating the Fortis
          Oeconomia protocol will be liable for any claims or damages whatsoever
          associated with your use, inability to use, or your interaction with
          other users of the Fortis Oeconomia protocol, including any direct,
          indirect, incidental, special, exemplary, punitive or consequential
          damages, or loss of profits, cryptocurrencies, tokens, or anything
          else of value.
        </Information>
        <AcceptButton
          onClick={handleSubmit}
          className={`default-btn ${!toggle && "secondary-btn outlined"}`}
        >
          Accept
        </AcceptButton>
        <Information style={{ fontWeight: "500" }}>
          Clicking the 'Accept' button means that you have read and accepted all
          the information written above.
        </Information>
      </Dialog>
    </>
  );
};

export default InformativeDialog;
