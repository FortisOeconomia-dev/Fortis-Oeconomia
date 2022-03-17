import { borderBottom } from "@mui/system";
import { useSigningClient } from "../contexts/cosmwasm";
import styled from 'styled-components'

const Wallet = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 807px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 15.1194px 15.1194px 60.4777px rgba(8, 4, 81, 0.18);
  border-radius: 52.162px;
  padding: 40px;
`

const Asset = styled.label`
  width: 100%;
  max-width: 516px;
  text-align: left;
  font-size: 20px;
  color: #030f49;
  display: block;
  margin: auto;
  display: flex;
  align-items: center;
  gap: 32px;
`

const AssetImage = styled.img`
  width: 37.5px;
  height: 37.5px;
  borderRadius: 39px;
`

const Divider = styled.div`
  background: linear-gradient(270deg, #5F5BCD 0%, #83B8DD 100%);
  height: 2.5px;
  width: 100%;
`

const AssetContent = styled.div`
  padding: 16px 0;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #FBFCFD;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const AssetValue = styled.span`
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #080451;
`

const Title = styled.span`
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: #FBFCFD;
`

const nwallet = () => {
  const {
    bfotBalance,
    fotBalance,
    fotBalanceStr,
    nativeBalance,
    walletAddress,
    atomBalance,
    osmoBalance,
    gfotBalance,
  } = useSigningClient();
  
  const assetData = [
    {
      label: 'FOT',
      amount: fotBalance,
      image: '../images/FOT120.png'
    },
    {
      label: 'bFOT',
      amount: bfotBalance,
      image: '../images/bFOT120.png'
    },
    {
      label: 'gFOT',
      amount: gfotBalance,
      image: '../images/gFOT120.png'
    },
    {
      label: 'ATOM',
      amount: atomBalance,
      image: '../images/atom.png'
    },
    {
      label: 'JUNO',
      amount: nativeBalance,
      image: '../images/juno.png'
    },
    {
      label: 'OSMO',
      amount: osmoBalance,
      image: '../images/osmo.png'
    },
  ]
  return (
    <Wallet>
      <Wrapper>
        <div className="currencyt-selection">
          <Title>
            My Assets
          </Title>
          <div className="wallet-text" style={{marginTop: '32px'}}>
            {assetData.map(d => 
              <Asset>
                <div className="w-full">
                  <Divider />
                  <AssetContent>
                    {d.label}
                    <AssetValue> {walletAddress.length == 0 ? 0 : d.amount}</AssetValue>
                  </AssetContent>
                </div>
                <AssetImage src={`${d.image}`} />
              </Asset>
            )}
          </div>
        </div>
      </Wrapper>
    </Wallet>
  );
};

export default nwallet;

