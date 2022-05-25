import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { convertTimeToHMS } from '../../util/conversion'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  gap: 10px;
  font-size: 1em;
  padding: 10px;
  padding-bottom: 20px;
  min-width: 250px;
`

const TimePanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #030f49;
`

const StyledDiv = styled.div`
  font-size: 1em;
  border-radius: 5px;
  font-weight: 700;
  background: #0000001c;
  padding: 5px;
  margin: 5px;
  min-width: 35px;
  text-align: center;
`
const Countdown = ({ targetHour }: { targetHour: number | undefined }) => {
  const [time, setTime] = useState<number | undefined>()

  useEffect(() => {
    if (targetHour !== undefined) {
      const _targetDate = new Date()
      const offset = _targetDate.getTimezoneOffset()
      let hour = _targetDate.getHours()
      let offsetHour = Math.floor(offset / 60)
      let offsetMin = offset - offsetHour * 60
      if (hour + offsetHour >= targetHour) {
        _targetDate.setDate(_targetDate.getDate() + 1)
      } else {
        _targetDate.setDate(_targetDate.getDate())
      }
      _targetDate.setHours(targetHour - offsetHour)
      _targetDate.setMinutes(offsetMin)
      _targetDate.setSeconds(0)
      _targetDate.setMilliseconds(0)
      const now = new Date()
      let time = Math.floor((_targetDate.getTime() - now.getTime()) / 1000)
      if (time > 0) {
        const intervalHandler = setInterval(() => {
          time -= 1
          if (time > 0) {
            setTime(time)
          } else {
            setTime(24 * 60 * 60)
          }
        }, 1000)
        return () => {
          clearInterval(intervalHandler)
        }
      }
    }
  }, [targetHour])

  const timeObj = useMemo(() => convertTimeToHMS(time), [time])
  if (!timeObj) return null
  return (
    <Wrapper>
      {' '}
      {timeObj?.day ? (
        <TimePanel>
          {timeObj?.day}
          <StyledDiv>D</StyledDiv>
        </TimePanel>
      ) : null}
      {timeObj?.hour ? (
        <TimePanel>
          {timeObj?.hour}
          <StyledDiv>H</StyledDiv>
        </TimePanel>
      ) : null}
      {timeObj?.min || timeObj?.hour ? (
        <TimePanel>
          {timeObj?.min}
          <StyledDiv>M</StyledDiv>
        </TimePanel>
      ) : null}
      <TimePanel>
        {' '}
        {timeObj?.sec} <StyledDiv>S</StyledDiv>
      </TimePanel>
    </Wrapper>
  )
}

export default Countdown
