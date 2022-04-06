import { useEffect, useState } from 'react'
import InformativeDialog from '../components/InformativeDialog'

const Index = () => {
  const [shouldShowInformativeDialog, setShouldShowInformativeDialog] = useState(null)

  useEffect(() => {
    setShouldShowInformativeDialog(typeof window !== 'undefined' && localStorage.getItem('shouldShowInformativeDialog'))
  }, [])

  const handleAcceptInformativeDialog = () => {
    localStorage.setItem('shouldShowInformativeDialog', 'false')
    setShouldShowInformativeDialog('false')
  }

  return (
    <>
      {shouldShowInformativeDialog == 'false' ? (
        <img src="./images/fortisoeconomia.png" style={{ display: 'block', width: '95%', height: '95%' }} />
      ) : (
        <InformativeDialog onAcceptInformativeDialog={handleAcceptInformativeDialog} />
      )}
      {/* <a href="https://pupmos.github.io/whitepuppers/WhitepupperGenesis.pdf" target="_SEJ" rel="noreferrer">
        <img src="./images/pupmos.png" style={{width:"150px", height:"150px", cursor:"pointer",marginLeft:"auto",marginRight:"auto", filter: toggle && 'drop-shadow(16px 16px 20px) invert(1) hue-rotate(-170deg)'}}/>
      </a> */}
    </>
  )
}

export default Index
