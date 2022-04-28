import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const DropdownWrapper = styled.div`
  position: relative;
`
const NavLink = styled.a`
  white-space: nowrap;
  color: ${props => (!props.defaultChecked && props.slot === '/gFOTmodule' ? '#4B365B' : 'white')} !important;
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: unset;
  padding-right: unset;
  font-size: 19px;
  font-weight: 600;
  font-family: var(--fontFamily2);
  line-height: 28px;
  &.active {
    color: ${props => (props.slot === 'gFOTmodule' ? 'red' : 'black')} !important;
  }
  transition: var(--transition);
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
