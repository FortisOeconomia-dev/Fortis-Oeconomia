import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownLabel = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
  color: white !important;
  font-weight: 600;
  font-size: 19px !important;
  line-height: 28px !important;
  padding-left: unset !important;
  padding-right: unset !important;
  padding-left: unset !important;
  padding-right: unset !important;
  & > div {
    transform: rotate(90deg);
    fontFamily: cursive;
  }
`

const NavLink = styled.a`
  white-space: nowrap;
  color: ${props => (!props.defaultChecked && props.slot === '/gFOTmodule' ? '#4B365B' : 'white')} !important;
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 19px !important;
  line-height: 28px !important;
  padding-left: unset !important;
  padding-right: unset !important;
  &.active {
    color: ${props => (props.slot === 'gFOTmodule' ? 'red' : 'black')} !important;
  }
  padding-left: unset !important;
  padding-right: unset !important;
  transition: var(--transition);
  font-weight: 600;
  font-size: var(--fontSize);
  font-family: var(--fontFamily2);
  & > div {
    transform: rotate(90deg);
    fontFamily: cursive;
  }
`

const DropdownMenu = styled.div`
  min-width: 180px;
  border: 1px solid #080451;
  border-radius: 13px;
`

const MenuWrapper = styled.div`
  position: absolute;
  padding-top: 10px;
`

const Dropdown = ({ title, slot, defaultChecked, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <NavLink slot={slot} defaultChecked={defaultChecked} className="nav-link">
        {title}
        <div>{`>`}</div>
      </NavLink>
      { open && 
      <MenuWrapper>
        <DropdownMenu>
          {children}
        </DropdownMenu>
      </MenuWrapper>
      }
    </DropdownWrapper>
  )
}

export default Dropdown
