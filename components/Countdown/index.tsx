import { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { convertTimeToHMS } from "../../util/conversion"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  gap: 10px;
  font-size: 1.2em;
`

const TimePanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledDiv = styled.div`
  font-size: 1.3em;
  border-radius: 5px;
  font-weight: 700;
  background: #0000001c;
  padding: 5px;
  margin: 5px;
  min-width: 35px;
  text-align: center;
`
const Countdown = ({ initialTime = 100000000 }) => {
  const [time, setTime] = useState<number>(initialTime / 1000)

  useEffect(() => {
    let time = initialTime / 10000
    const intervalHandler = setInterval(() => {
      time -= 1
      setTime(time)
    }, 1000)
    return () => {
      clearInterval(intervalHandler)
    }
  }, [initialTime])

  const timeObj = useMemo(() => convertTimeToHMS(time), [time])

  return (
    <Wrapper>
    {timeObj?.hour ? <TimePanel>{timeObj?.hour}<StyledDiv>H</StyledDiv></TimePanel> : null}
    {(timeObj?.min || timeObj?.hour) && <TimePanel>{timeObj?.min}<StyledDiv>M</StyledDiv></TimePanel>}
    {<TimePanel>{timeObj?.sec}<StyledDiv>S</StyledDiv></TimePanel>}
    </Wrapper>
  )
}

export default Countdown
