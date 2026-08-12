import { useEffect, useState } from "react";


function useCountdown(endsAt) {
  const target = endsAt ? new Date(endsAt).getTime() : Date.now() + 24 * 60 * 60 * 1000;

  const [timeLeft, setTimeLeft] = useState(target - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(target - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const clamped = Math.max(timeLeft, 0);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function Countdown({ endsAt }) {
  const { days, hours, minutes, seconds } = useCountdown(endsAt);

  return (
    <div className="d-flex gap-3 hp-countdown">
      <div className="text-center">
        <div className="fw-bold">{pad(days)}</div>
        <small className="text-muted">Days</small>
      </div>
      <div className="fw-bold">:</div>
      <div className="text-center">
        <div className="fw-bold">{pad(hours)}</div>
        <small className="text-muted">Hours</small>
      </div>
      <div className="fw-bold">:</div>
      <div className="text-center">
        <div className="fw-bold">{pad(minutes)}</div>
        <small className="text-muted">Minutes</small>
      </div>
      <div className="fw-bold">:</div>
      <div className="text-center">
        <div className="fw-bold">{pad(seconds)}</div>
        <small className="text-muted">Seconds</small>
      </div>
    </div>
  );
}

export default Countdown;
