import { useEffect, useState } from "react";

const timer = () => {
  const [launch, setLaunch] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const target = new Date("03/08/2022 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m: number = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setLaunch(true)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="timer-container">
      {launch ? (<h1>Launching now</h1>) : (
        <>
          <div className="timer-wrapper">
            <div className="timer-inner">
              <div className="timer-segment">
                <span className="time">{days}</span>
                <span className="label">   Days</span>
              </div>
              <div className="timer-segment">
                <span className="time">{hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="timer-segment">
                <span className="time">{minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <div className="timer-segment">
                <span className="time">{seconds}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </div>
        </>)}
    </div>
  );
};

export default timer;
