import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ToggleContext } from '../Layout/Layout'

const MainContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  & > .arrow {
    transform: rotate(90deg);
    font-family: cursive;
    margin-left: 10px;
  }
`

const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
`

const DropdownItems = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 7px;
  background: #f5f5f5;
  z-index: 100;
  & > div {
    border-bottom: 1px solid black;
    color: black;
  }
  & > div:last-child {
    border-bottom: none;
  }
`

const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 35px;
  width: 90%;
  margin-left: 5%;
  & > img {
    width: 30px;
    height: 30px;
  }
`

const AssetSubtitle = styled.div`
  font-size: 10px;
  margin-top: 2px;
`

const AssetTitle = styled.div`
  font-size: 15px;
`

const AssetSelector = ({
  assets,
  children,
  onSelect,
}: {
  assets: Array<any>
  children: any
  onSelect: (string) => void
}) => {
  const ref = useRef<HTMLDivElement>()
  const [open, setOpen] = useState(false)
  const { toggle } = useContext(ToggleContext)

  useEffect(() => {
    let _defined = false
    // Bind the event listener
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      _defined = true
    }
    return () => {
      // Unbind the event listener on clean up
      if (_defined) document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, open])

  return (
    <div ref={ref}>
      <MainContent onClick={() => setOpen(!open)}>
        {children}
        <div className="arrow">{`>`}</div>
      </MainContent>
      <DropdownWrapper>
        {open && (
          <DropdownItems>
            {assets.map((asset, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  setOpen(false)
                  onSelect(asset.name)
                }}
              >
                {asset.name === 'UST' ? (
                  <div style={{ display: 'flex' }}>
                    <AssetTitle> {asset.name}</AssetTitle>
                    <AssetSubtitle style={{ fontSize: '10px !important', marginTop: '2px' }}>(Classic)</AssetSubtitle>
                  </div>
                ) : (
                  <AssetTitle>{asset.name} </AssetTitle>
                )}
                {asset.image &&
                  (typeof asset.image === 'string' ? (
                    <img src={asset.image} style={{ background: 'transparent', color: 'transparent' }} />
                  ) : (
                    asset.image(toggle, true)
                  ))}{' '}
              </DropdownItem>
            ))}
          </DropdownItems>
        )}
      </DropdownWrapper>
    </div>
  )
}

export default AssetSelector
