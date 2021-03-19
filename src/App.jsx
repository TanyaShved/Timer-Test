import { useEffect, useState } from "react";
import { interval } from "rxjs";
import Buttons from './components/Buttons/Buttons'
import Timer from './components/Timer/Timer'
import s from './App.module.css'

function App() {
  const [isActive, setIsActive] = useState(false);
  const [mSeconds, setMseconds] = useState(0)

  const time$ = interval(1000);

  useEffect(() => {
    if (isActive) {
      const sub = time$.subscribe(() => setMseconds(mSeconds + 1000));
      return () => sub.unsubscribe();
    }
  }, [isActive, mSeconds, time$]);

  const startTimer = () => time$.subscribe(setIsActive(true));

  const pauseTimer = () => time$.subscribe(setIsActive(false));

  const resetTimer = () => time$.subscribe(setMseconds(0));

  return (
    <>
      <div className={s.container}>
      <Timer mSeconds={mSeconds}/>
      <Buttons
        isActive={isActive}
        start={startTimer}
        pause={pauseTimer}
        reset={resetTimer}
        />
        </div>
      </>
  );
}

export default App;
